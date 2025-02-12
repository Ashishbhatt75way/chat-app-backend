import express from "express";
import * as userValidation from "../user/user.validation";
import { login } from "./auth.controller";

const router = express.Router();

router.post("/login", userValidation.loginUser, login);

export default router;
