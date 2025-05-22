import { Router } from "express";
import { createSoftware, getAllSoftware } from "../controllers/softwareController";
import { authenticateJWT, authorizeRoles } from "../middleware/auth";

const router = Router();

router.post("/", authenticateJWT, authorizeRoles("Admin"), createSoftware);
router.get("/", authenticateJWT, getAllSoftware);

export default router;
