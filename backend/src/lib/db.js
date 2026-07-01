import mongoose from "mongoose";

export default async function connectDB() {
  try {
    const mongoURI = process.env.MONGO_URI;
    if (!mongoURI) {
      throw new Error("MONGO_URI required");
    }
    const conn = await mongoose.connect(mongoURI);
    console.log("MongoDB connected", conn.connection.host);
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
    process.exit(1);
  }
}
