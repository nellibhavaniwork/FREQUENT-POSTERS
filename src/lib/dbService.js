import fs from 'fs';
import path from 'path';

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

export async function dbFind(collectionName, query = {}, sort = { createdAt: -1 }) {
  const data = getLocalData(collectionName) || [];
  let filtered = data.filter((item) => {
    return Object.entries(query).every(([k, v]) => item[k] === v);
  });
  return filtered;
}

export async function dbFindOne(collectionName, query = {}) {
  const data = getLocalData(collectionName) || [];
  return data.find((item) => {
    return Object.entries(query).every(([k, v]) => item[k] === v);
  }) || null;
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
