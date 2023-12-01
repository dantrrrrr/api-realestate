// routes/index.js
import express from "express";
import userRoutes from "./user.route.js";
import authRoutes from "./auth.route.js";
import listingRoutes from "./listing.route.js";
const router = express.Router();

// Add other routes as needed
router.use("/user", userRoutes);
router.use("/auth", authRoutes);
router.use("/listing", listingRoutes);

export default router;
