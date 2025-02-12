import express from "express";
import userRoutes from "./user/user.route";
import groupRoutes from "./group/group.route"
import authRoutes from "./auth/auth.route"

// routes
const router = express.Router();

router.use("/users", userRoutes);
router.use("/auth", authRoutes);
router.use("/groups", groupRoutes);

export default router;