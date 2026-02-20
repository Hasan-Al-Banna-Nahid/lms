import express from "express";
import { AuthController } from "./auth.controller";
import { registerUserSchema, loginSchema } from "./auth.dto";

const router = express.Router();

router.post("/register", AuthController.register);
router.post("/login", AuthController.login);

export const AuthRoutes = router;
