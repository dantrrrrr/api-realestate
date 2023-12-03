import express from "express";
import {
  deleteUser,
  updateUser,
  getUserListings,
  getUser,
} from "../controllers/user.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

/**
 * @swagger
 * /api/users/update/{id}:
 *  put:
 *    description: Use to update a user
 *    parameters:
 *      - in: path
 *        name: id
 *        description: ID of the user to update
 *        required: true
 *        type: string
 *      - in: body
 *        name: user
 *        description: The user data to update.
 *        schema:
 *          type: object
 *          properties:
 *            username:
 *              type: string
 *            email:
 *              type: string
 *            password:
 *              type: string
 *            avatar:
 *              type: string
 *    responses:
 *      '200':
 *        description: User updated successfully
 */
router.put("/update/:id", verifyToken, updateUser);

//delete own user
router.delete("/delete/:id", verifyToken, deleteUser);

//get all own listing
router.get("/listing/:id", verifyToken, getUserListings);

//get user info by id
router.get("/get/:id", verifyToken, getUser);

export default router;
