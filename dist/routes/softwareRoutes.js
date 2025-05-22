"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const softwareController_1 = require("../controllers/softwareController");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
router.post("/", auth_1.authenticateJWT, (0, auth_1.authorizeRoles)("Admin"), softwareController_1.createSoftware);
router.get("/", auth_1.authenticateJWT, softwareController_1.getAllSoftware);
exports.default = router;
