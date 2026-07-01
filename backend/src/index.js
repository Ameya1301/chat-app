import express from "express";
import connectDB from "./lib/db.js";
import { clerkMiddleware } from "@clerk/express";

import "dotenv/config";
import User from "./models/user.model.js";

const app = express();
const PORT = process.env.PORT;

app.use(clerkMiddleware());

app.get("/health", (req, res) => {
  res.status(200).json({ ok: true });
});
app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on port ${PORT}`);
});
