import express from "express";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { UserRepository } from "./user.repository";
import { protect, restrictTo } from "../../middlewares/auth.middleware";

const router = express.Router();

const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const userController = new UserController(userService);

router.post("/create-admin", protect, restrictTo("SUPER_ADMIN"), (req, res) =>
  userController.createAdmin(req, res),
);

router.delete("/:id", protect, restrictTo("SUPER_ADMIN", "ADMIN"), (req, res) =>
  userController.deleteUser(req, res),
);

export const UserRoutes = router;
