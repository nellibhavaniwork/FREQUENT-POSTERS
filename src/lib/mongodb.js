import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

let cached = global.mongoose;
if (!cached) {
  cached = global.mongoose = { conn: null, promise: null, lastFailureTime: 0 };
}

// 60-second cooldown after a failed connection attempt to avoid stalling page requests
const FAILURE_COOLDOWN_MS = 60000;

async function connectDB() {
  if (cached.conn && mongoose.connection.readyState === 1) {
    return cached.conn;
  }

  if (!MONGODB_URI) {
    return null;
  }

  // If a connection recently failed (e.g. offline/network blocked), avoid stalling page navigations
  if (cached.lastFailureTime && Date.now() - cached.lastFailureTime < FAILURE_COOLDOWN_MS) {
    return null;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 1500,
      connectTimeoutMS: 1500,
    };

    cached.promise = mongoose
      .connect(MONGODB_URI, opts)
      .then((mongooseInstance) => {
        console.log('[mongodb] Connected to MongoDB Atlas successfully.');
        cached.lastFailureTime = 0;
        return mongooseInstance;
      })
      .catch((err) => {
        console.warn(
          '[mongodb] MongoDB Atlas connection failed (serving from instant local cache):',
          err.message
        );
        cached.lastFailureTime = Date.now();
        cached.promise = null;
        return null;
      });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.lastFailureTime = Date.now();
    cached.promise = null;
    cached.conn = null;
  }

  return cached.conn;
}

export default connectDB;
