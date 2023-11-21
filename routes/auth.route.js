import express from "express";
import { test } from "../controllers/user.controller.js";
import { signup, signin,google } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/google", google);

export default router;
