"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
require("reflect-metadata");
const ormconfig_1 = require("./ormconfig");
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const softwareRoutes_1 = __importDefault(require("./routes/softwareRoutes"));
const requestRoutes_1 = __importDefault(require("./routes/requestRoutes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
ormconfig_1.AppDataSource.initialize().then(() => {
    console.log("📦 Connected to DB");
    app.use("/api/auth", authRoutes_1.default);
    app.use("/api/software", softwareRoutes_1.default);
    app.use("/api/requests", requestRoutes_1.default);
    app.listen(process.env.PORT, () => {
        console.log(`🚀 Server running on port ${process.env.PORT}`);
    });
});
