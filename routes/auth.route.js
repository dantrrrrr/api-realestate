import express from "express";
import { test } from "../controllers/user.controller.js";
import { signup } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/signup", signup);

export default router;
