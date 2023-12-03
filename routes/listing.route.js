import express from "express";
import {
  createListing,
  deleteListing,
  updateListing,
  getListing,
  getListingsWithSearch
} from "../controllers/listing.controller.js";
import { verifyToken } from "../utils/verifyUser.js";
const router = express.Router();

//create new listing
router.post("/create", verifyToken, createListing);

//delete own listing
router.delete("/delete/:id", verifyToken, deleteListing);

//update own listing
router.put("/update/:id", verifyToken, updateListing);

//get listing by id
router.get("/get/:id", getListing);

router.get("/get", getListingsWithSearch);

export default router;
