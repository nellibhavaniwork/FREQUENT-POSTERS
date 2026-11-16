import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';

const MONGODB_URI = process.env.MONGODB_URI;

let cached = global.mongoose;
if (!cached) {
  cached = global.mongoose = { conn: null, promise: null, isFallback: false };
}

// In-memory / file fallback storage path if MongoDB Atlas network has IP whitelist restrictions
const DATA_DIR = path.join(process.cwd(), '.data');
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

export function getLocalData(collectionName) {
  const file = path.join(DATA_DIR, `${collectionName}.json`);
  if (!fs.existsSync(file)) return null;
  try {
    return JSON.parse(fs.readFileSync(file, 'utf-8'));
  } catch {
    return null;
  }
}

export function setLocalData(collectionName, data) {
  const file = path.join(DATA_DIR, `${collectionName}.json`);
  fs.writeFileSync(file, JSON.stringify(data, null, 2), 'utf-8');
}

async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise && MONGODB_URI) {
    const opts = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 5000,
      connectTimeoutMS: 5000,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((inst) => {
      console.log('Connected to MongoDB Atlas successfully.');
      cached.isFallback = false;
      return inst;
    }).catch((err) => {
      console.warn('MongoDB Atlas connection failed (likely IP whitelist 0.0.0.0/0 required). Running in resilient persistent storage mode.', err.message);
      cached.isFallback = true;
      return null;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    cached.isFallback = true;
  }

  return cached.conn;
}

export default connectDB;
