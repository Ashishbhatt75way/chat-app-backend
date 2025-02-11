
import { Router } from "express";
import { catchError } from "../common/middleware/cath-error.middleware";
import { jwtAuthenticate } from '../common/middleware/jwt-authenticate';
import * as userController from "./user.controller";
import * as userValidator from "./user.validation";

const router = Router();

router
        .get("/", userController.getAllUser)
        .get("/:id",jwtAuthenticate, userController.getUserById)
        .delete("/:id",jwtAuthenticate, userController.deleteUser)
        .post("/login",userController.login)
        .post("/", userValidator.createUser, catchError, userController.createUser)
        .put("/:id", jwtAuthenticate, userValidator.updateUser, catchError, userController.updateUser)
        .patch("/:id",jwtAuthenticate, userValidator.editUser, catchError, userController.editUser)

export default router;

