import express from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";
import mongoose from "mongoose";
import cors from "cors";
import userRoutes from "./routes/users.routes.js";

import { connectToSocket } from "./controllers/socketManager.js";

const app = express();
const server = createServer(app);
const io = connectToSocket(server);

app.use(cors());
app.use(express.json({ limit: "40kb" }));
app.use(express.urlencoded({ limit: "40kb", extended: true }));
app.use("/api/v1/users", userRoutes);

const start = async () => {
  app.set("mongo_user");
  const connectionDb = await mongoose.connect(
    "mongodb+srv://k24145798_db_user:sQPYzscNfaqiUBgj@cluster0.1eqd95d.mongodb.net/"
  );
  console.log(`Mongo connected DB host : ${connectionDb.connection.host}`);

  server.listen(8000, () => {
    console.log("Server is listening on port 8000");
  });
};

start();
