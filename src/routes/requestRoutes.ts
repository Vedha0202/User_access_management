import { Router } from "express";
import { submitRequest, getPendingRequests, updateRequestStatus } from "../controllers/requestController";
import { authenticateJWT, authorizeRoles } from "../middleware/auth";

const router = Router();

router.post("/", authenticateJWT, authorizeRoles("Employee"), submitRequest);
router.get("/", authenticateJWT, authorizeRoles("Manager"), getPendingRequests);
router.patch("/:id", authenticateJWT, authorizeRoles("Manager"), updateRequestStatus);

export default router;
