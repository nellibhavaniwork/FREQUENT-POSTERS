import fs from 'fs';
import path from 'path';

// Root directory for read-only bundled data
const BUNDLED_DATA_DIR = path.join(process.cwd(), '.data');

// On serverless environments like Vercel/AWS Lambda, process.cwd() is read-only (/var/task).
// Only /tmp is writable.
function getWritableDataDir() {
  if (process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME || process.cwd().startsWith('/var/task')) {
    const tmpDir = path.join('/tmp', '.data');
    if (!fs.existsSync(tmpDir)) {
      try {
        fs.mkdirSync(tmpDir, { recursive: true });
      } catch (e) {
        // ignore
      }
    }
    return tmpDir;
  }
  if (!fs.existsSync(BUNDLED_DATA_DIR)) {
    try {
      fs.mkdirSync(BUNDLED_DATA_DIR, { recursive: true });
    } catch (e) {
      // ignore
    }
  }
  return BUNDLED_DATA_DIR;
}

export function getLocalData(collectionName) {
  const writableDir = getWritableDataDir();
  const writableFile = path.join(writableDir, `${collectionName}.json`);

  // First check if a modified version exists in writable dir
  if (fs.existsSync(writableFile)) {
    try {
      return JSON.parse(fs.readFileSync(writableFile, 'utf-8'));
    } catch {
      // fall through
    }
  }

  // Fallback to bundled data directory
  const bundledFile = path.join(BUNDLED_DATA_DIR, `${collectionName}.json`);
  if (fs.existsSync(bundledFile)) {
    try {
      return JSON.parse(fs.readFileSync(bundledFile, 'utf-8'));
    } catch {
      return null;
    }
  }

  return null;
}

export function setLocalData(collectionName, data) {
  const writableDir = getWritableDataDir();
  const file = path.join(writableDir, `${collectionName}.json`);
  try {
    fs.writeFileSync(file, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.warn(`[dbService] Unable to write to ${file}: ${err.message}`);
  }
}

export async function dbFind(collectionName, query = {}, sort = { createdAt: -1 }) {
  const data = getLocalData(collectionName) || [];
  let filtered = data.filter((item) => {
    return Object.entries(query).every(([k, v]) => item[k] === v);
  });
  return filtered;
}

export async function dbFindOne(collectionName, query = {}) {
  const data = getLocalData(collectionName) || [];
  return (
    data.find((item) => {
      return Object.entries(query).every(([k, v]) => item[k] === v);
    }) || null
  );
}

export async function dbCreate(collectionName, doc) {
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
  const data = getLocalData(collectionName) || [];
  const index = data.findIndex((item) => Object.entries(query).every(([k, v]) => item[k] === v));
  if (index !== -1) {
    data[index] = { ...data[index], ...updateData, updatedAt: new Date().toISOString() };
    setLocalData(collectionName, data);
    return data[index];
  }
  return null;
}

export async function dbDelete(collectionName, query) {
  let data = getLocalData(collectionName) || [];
  const initialLen = data.length;
  data = data.filter((item) => !Object.entries(query).every(([k, v]) => item[k] === v));
  setLocalData(collectionName, data);
  return data.length < initialLen;
}
