import express from "express";
import { authenticateJWT } from "../common/middleware/auth-middleware";
import { login, refreshToken } from "./auth.controller";
import * as userValidation from "../user/user.validation";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication endpoints
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Logs in a user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 example: password123
 *     responses:
 *       200:
 *         description: Successful login, returns access and refresh tokens
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: object
 *                 tokens:
 *                   type: object
 *                   properties:
 *                     accessToken:
 *                       type: string
 *                     refreshToken:
 *                       type: string
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 */
router.post("/login", userValidation.loginUser, login);

/**
 * @swagger
 * /auth/protected:
 *   get:
 *     summary: Access a protected route
 *     tags: [Auth]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully accessed the protected route
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "You are authenticated"
 *                 user:
 *                   type: object
 *       401:
 *         description: Unauthorized, token missing or invalid
 */
router.get("/protected", authenticateJWT, (req, res) => {
  res.json({ message: "You are authenticated", user: req.user });
});

export default router;
