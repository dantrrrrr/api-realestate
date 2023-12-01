import express from "express";
import { signup, signin, google } from "../controllers/auth.controller.js";

const router = express.Router();

/**
 * @swagger
 * /api/auth/signup:
 *  post:
 *    description: Use to sign up a new user
 *    parameters:
 *      - in: body
 *        name: user
 *        description: The user to create.
 *        schema:
 *          type: object
 *          required:
 *            - username
 *            - email
 *            - password
 *          properties:
 *            username:
 *              type: string
 *            email:
 *              type: string
 *            password:
 *              type: string
 *    responses:
 *      '201':
 *        description: User registered successfully
 */
router.post("/signup", signup);

/**
 * @swagger
 * /api/auth/signin:
 *  post:
 *    description: Use to sign in a user
 *    parameters:
 *      - in: body
 *        name: user
 *        description: The user to sign in.
 *        schema:
 *          type: object
 *          required:
 *            - email
 *            - password
 *          properties:
 *            email:
 *              type: string
 *            password:
 *              type: string
 *    responses:
 *      '200':
 *        description: User signed in successfully
 */
router.post("/signin", signin);

router.post("/google", google);

export default router;
