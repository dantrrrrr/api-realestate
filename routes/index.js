// routes/index.js
import express from "express";
import userRoutes from "./user.route.js";

const router = express.Router();

// Add other routes as needed
router.use("/users", userRoutes);

export default router;
