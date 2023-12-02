import express from "express";
import {
  createListing,
  deleteListing,
} from "../controllers/listing.controller.js";
import { verifyToken } from "../utils/verifyUser.js";
const router = express.Router();

<<<<<<< HEAD
router.post("/create", verifyToken, createListing);
router.delete("/delete/:id", verifyToken, deleteListing);
=======
router.post("/create", createListing);
router.delete("/delete/:id", deleteListing);
>>>>>>> e901898c9025880ae9da9ea3ac7d37e0480ccf29

export default router;
