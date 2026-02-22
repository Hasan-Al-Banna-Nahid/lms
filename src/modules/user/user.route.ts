import express from "express";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { UserRepository } from "./user.repository";
import { protect, restrictTo } from "../../middlewares/auth.middleware";

const router = express.Router();

const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const userController = new UserController(userService);

// 1. Get all users for Management Table
router.get("/", protect, restrictTo("SUPER_ADMIN"), (req, res) =>
  userController.getAllUsers(req, res),
);

// 2. Create Admin (Matching frontend path: /users/create-admin)
router.post("/create-admin", protect, restrictTo("SUPER_ADMIN"), (req, res) =>
  userController.createAdmin(req, res),
);

// 3. Update User Status (Toggle Active/Inactive)
router.patch("/status/:id", protect, restrictTo("SUPER_ADMIN"), (req, res) =>
  userController.toggleStatus(req, res),
);

// 4. Soft Delete User
router.delete("/:id", protect, restrictTo("SUPER_ADMIN", "ADMIN"), (req, res) =>
  userController.deleteUser(req, res),
);

export const UserRoutes = router;
