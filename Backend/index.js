import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import router from "./routes/user.route.js";
import messageRoute from "./routes/message.route.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";

import { app, server } from "./SocketIO/server.js";

dotenv.config();
const PORT = process.env.PORT || 5000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/* ---------------- MIDDLEWARE ---------------- */

app.use(
  cors({
    origin: process.env.CLIENT_URL || "https://chatapp-8-hobb.onrender.com",
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

/* ---------------- ROUTES ---------------- */

app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "OK" });
});

app.use("/api/user", router);
app.use("/api/message", messageRoute);

/* ---------------- FRONTEND BUILD ---------------- */

if (process.env.NODE_ENV === "production") {
  const dirPath = path.resolve()
  app.use(express.static(path.join("./Frontend/dist")));

  app.use((req, res) => {
    res.sendFile(
      path.resolve(dirPath, "./Frontend/dist", "index.html")
    );
  });
}


/* ---------------- START SERVER ---------------- */

const startServer = async () => {
  try {
    await connectDB();
    server.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
