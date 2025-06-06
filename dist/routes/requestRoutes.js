"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const requestController_1 = require("../controllers/requestController");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
router.post("/", auth_1.authenticateJWT, (0, auth_1.authorizeRoles)("Employee"), requestController_1.submitRequest);
router.get("/", auth_1.authenticateJWT, (0, auth_1.authorizeRoles)("Manager"), requestController_1.getPendingRequests);
router.patch("/:id", auth_1.authenticateJWT, (0, auth_1.authorizeRoles)("Manager"), requestController_1.updateRequestStatus);
exports.default = router;
