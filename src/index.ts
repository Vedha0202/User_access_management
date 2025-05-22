import express from "express";
import dotenv from "dotenv";
import "reflect-metadata";
import { AppDataSource } from "./ormconfig";
import authRoutes from "./routes/authRoutes";
import softwareRoutes from "./routes/softwareRoutes";
import requestRoutes from "./routes/requestRoutes";

dotenv.config();
const app = express();
app.use(express.json());

AppDataSource.initialize().then(() => {
  console.log("📦 Connected to DB");

  app.use("/api/auth", authRoutes);
  app.use("/api/software", softwareRoutes);
  app.use("/api/requests", requestRoutes);

  app.listen(process.env.PORT, () => {
    console.log(`🚀 Server running on port ${process.env.PORT}`);
  });
});
