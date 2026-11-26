import fs from 'fs';
import path from 'path';
import mongoose from 'mongoose';
import connectDB from './mongodb.js';

import Admin from '../models/Admin.js';
import WebsiteSettings from '../models/WebsiteSettings.js';
import Client from '../models/Client.js';
import PricingPackage from '../models/PricingPackage.js';
import Service from '../models/Service.js';
import Portfolio from '../models/Portfolio.js';
import Testimonial from '../models/Testimonial.js';
import BlogPost from '../models/BlogPost.js';
import Enquiry from '../models/Enquiry.js';

// Map collection string names to Mongoose models
const MODEL_MAP = {
  admin: Admin,
  settings: WebsiteSettings,
  clients: Client,
  pricing: PricingPackage,
  services: Service,
  portfolio: Portfolio,
  testimonials: Testimonial,
  blog: BlogPost,
  enquiries: Enquiry,
};

// Root directory for read-only bundled data
const BUNDLED_DATA_DIR = path.join(process.cwd(), '.data');

// Safe writable directory: serverless environments (Vercel / AWS Lambda) can ONLY write to /tmp
function getWritableDataDir() {
  const isServerless =
    Boolean(process.env.VERCEL) ||
    Boolean(process.env.AWS_LAMBDA_FUNCTION_NAME) ||
    process.cwd().startsWith('/var/task');

  if (isServerless) {
    const tmpDir = path.join('/tmp', '.data');
    if (!fs.existsSync(tmpDir)) {
      try {
        fs.mkdirSync(tmpDir, { recursive: true });
      } catch {
        // Ignore read-only or permission errors in serverless
      }
    }
    return tmpDir;
  }

  if (!fs.existsSync(BUNDLED_DATA_DIR)) {
    try {
      fs.mkdirSync(BUNDLED_DATA_DIR, { recursive: true });
    } catch {
      // Ignore
    }
  }
  return BUNDLED_DATA_DIR;
}

// In-memory cache for instant zero-latency reads
const localMemoryCache = new Map();

// Read data from disk fallback (with in-memory cache)
export function getLocalData(collectionName) {
  if (localMemoryCache.has(collectionName)) {
    return localMemoryCache.get(collectionName);
  }

  try {
    const writableDir = getWritableDataDir();
    const writableFile = path.join(writableDir, `${collectionName}.json`);

    // First check if an updated file exists in writable dir
    if (fs.existsSync(writableFile)) {
      try {
        const parsed = JSON.parse(fs.readFileSync(writableFile, 'utf-8'));
        localMemoryCache.set(collectionName, parsed);
        return parsed;
      } catch {
        // Fall through to bundled
      }
    }

    // Fallback to read-only bundled file
    const bundledFile = path.join(BUNDLED_DATA_DIR, `${collectionName}.json`);
    if (fs.existsSync(bundledFile)) {
      const parsed = JSON.parse(fs.readFileSync(bundledFile, 'utf-8'));
      localMemoryCache.set(collectionName, parsed);
      return parsed;
    }
  } catch (err) {
    console.warn(`[dbService] getLocalData(${collectionName}) read error:`, err.message);
  }

  return null;
}

// Write data to disk fallback (safe against EROFS) and invalidate memory cache
export function setLocalData(collectionName, data) {
  localMemoryCache.set(collectionName, data);
  try {
    const writableDir = getWritableDataDir();
    const file = path.join(writableDir, `${collectionName}.json`);
    fs.writeFileSync(file, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.warn(`[dbService] setLocalData(${collectionName}) failed safely: ${err.message}`);
  }
}

// Track collections already verified/seeded in this runtime instance
const seededCollections = new Set();

async function ensureCollectionSeeded(collectionName, Model) {
  if (seededCollections.has(collectionName)) return;

  try {
    const count = await Model.countDocuments();
    if (count === 0) {
      const initialData = getLocalData(collectionName);
      if (initialData && Array.isArray(initialData) && initialData.length > 0) {
        console.log(`[dbService] Seeding MongoDB "${collectionName}" with ${initialData.length} records...`);
        const cleaned = initialData.map((item) => {
          const doc = { ...item };
          // If _id is not a valid 24-char ObjectId hex string, let MongoDB generate a valid ObjectId
          if (doc._id && !mongoose.Types.ObjectId.isValid(doc._id)) {
            delete doc._id;
          }
          return doc;
        });
        await Model.insertMany(cleaned, { ordered: false });
      }
    }
    seededCollections.add(collectionName);
  } catch (err) {
    console.warn(`[dbService] Seed error for ${collectionName}:`, err.message);
    seededCollections.add(collectionName);
  }
}

// Resolve Mongoose model and ensure connected
async function getConnectedModel(collectionName) {
  const Model = MODEL_MAP[collectionName];
  if (!Model) return null;

  try {
    const conn = await connectDB();
    if (conn && mongoose.connection.readyState === 1) {
      await ensureCollectionSeeded(collectionName, Model);
      return Model;
    }
  } catch (err) {
    console.warn(`[dbService] MongoDB unavailable for ${collectionName}: ${err.message}`);
  }

  return null;
}

// Transform query for MongoDB (e.g. converting valid string _id to ObjectId)
function formatMongoQuery(query) {
  if (!query || typeof query !== 'object') return {};
  const formatted = { ...query };

  if (formatted._id) {
    if (typeof formatted._id === 'string' && mongoose.Types.ObjectId.isValid(formatted._id)) {
      formatted._id = new mongoose.Types.ObjectId(formatted._id);
    }
  }

  return formatted;
}

// Format document returned from MongoDB
function formatMongoDoc(doc) {
  if (!doc) return null;
  const item = { ...doc };
  if (item._id) {
    item._id = item._id.toString();
  }
  return item;
}

// --- PUBLIC DB INTERFACE ---

export async function dbFind(collectionName, query = {}, sort = { createdAt: -1 }) {
  const Model = await getConnectedModel(collectionName);

  if (Model) {
    try {
      const mongoQuery = formatMongoQuery(query);
      const docs = await Model.find(mongoQuery).sort(sort).lean();
      return docs.map(formatMongoDoc);
    } catch (err) {
      console.warn(`[dbService] MongoDB find failed on ${collectionName}:`, err.message);
    }
  }

  // Local JSON fallback
  const data = getLocalData(collectionName) || [];
  return data.filter((item) => {
    return Object.entries(query).every(([k, v]) => String(item[k]) === String(v));
  });
}

export async function dbFindOne(collectionName, query = {}) {
  const Model = await getConnectedModel(collectionName);

  if (Model) {
    try {
      const mongoQuery = formatMongoQuery(query);
      const doc = await Model.findOne(mongoQuery).lean();
      return formatMongoDoc(doc);
    } catch (err) {
      console.warn(`[dbService] MongoDB findOne failed on ${collectionName}:`, err.message);
    }
  }

  // Local JSON fallback
  const data = getLocalData(collectionName) || [];
  return (
    data.find((item) => {
      return Object.entries(query).every(([k, v]) => String(item[k]) === String(v));
    }) || null
  );
}

export async function dbCreate(collectionName, doc) {
  const Model = await getConnectedModel(collectionName);

  if (Model) {
    try {
      const copy = { ...doc };
      if (copy._id && !mongoose.Types.ObjectId.isValid(copy._id)) {
        delete copy._id;
      }
      const created = await Model.create(copy);
      return formatMongoDoc(created.toObject());
    } catch (err) {
      console.warn(`[dbService] MongoDB create failed on ${collectionName}:`, err.message);
    }
  }

  // Local JSON fallback
  const data = getLocalData(collectionName) || [];
  const newDoc = {
    _id: Date.now().toString() + Math.random().toString(36).substring(2, 7),
    ...doc,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  data.unshift(newDoc);
  setLocalData(collectionName, data);
  return newDoc;
}

export async function dbUpdate(collectionName, query, updateData) {
  const Model = await getConnectedModel(collectionName);

  if (Model) {
    try {
      const mongoQuery = formatMongoQuery(query);
      const updated = await Model.findOneAndUpdate(
        mongoQuery,
        { $set: updateData },
        { new: true }
      ).lean();
      if (updated) {
        return formatMongoDoc(updated);
      }
    } catch (err) {
      console.warn(`[dbService] MongoDB update failed on ${collectionName}:`, err.message);
    }
  }

  // Local JSON fallback
  const data = getLocalData(collectionName) || [];
  let index = data.findIndex((item) =>
    Object.entries(query).every(([k, v]) => String(item[k]) === String(v))
  );

  if (index === -1 && collectionName === 'settings' && data.length > 0) {
    index = 0;
  }

  if (index !== -1) {
    data[index] = { ...data[index], ...updateData, updatedAt: new Date().toISOString() };
    setLocalData(collectionName, data);
    return data[index];
  }

  return null;
}

export async function dbDelete(collectionName, query) {
  const Model = await getConnectedModel(collectionName);

  if (Model) {
    try {
      const mongoQuery = formatMongoQuery(query);
      const result = await Model.deleteOne(mongoQuery);
      return result.deletedCount > 0;
    } catch (err) {
      console.warn(`[dbService] MongoDB delete failed on ${collectionName}:`, err.message);
    }
  }

  // Local JSON fallback
  let data = getLocalData(collectionName) || [];
  const initialLen = data.length;
  data = data.filter(
    (item) => !Object.entries(query).every(([k, v]) => String(item[k]) === String(v))
  );
  setLocalData(collectionName, data);
  return data.length < initialLen;
}
