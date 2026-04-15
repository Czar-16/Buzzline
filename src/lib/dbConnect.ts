import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
  throw new Error("Please define MONGODB_URI in .env file");
}
// FIRST API CALL -> { No cached → connect → store → return }

// NEXT API CALL -> { cached.conn exists → reuse → no new connection }

type MongooseCache = {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;

  // actual connection
  // promise while connecting (to aovoid multiple connections)
  
};

declare global {
  var mongoose: MongooseCache;
}

let cached: MongooseCache = global.mongoose || {
  conn: null,
  promise: null,
};

global.mongoose = cached;

if (!cached) {
  global.mongoose = { conn: null, promise: null };
}
async function dbConnect(): Promise<typeof mongoose> {
  if (cached.conn) {
    console.log("Using cached connection 🔁");
    //already connection is there
    return cached.conn;
  }
  if (!cached.promise) {
  
    console.log("Creating new DB connection 🚀");
    cached.promise = mongoose.connect(MONGODB_URI); // start the connection
  }

  cached.conn = await cached.promise; // wait till the connection is done
  console.log("Database Connected 🔥");

  return cached.conn;
}

export default dbConnect;
