import express from "express";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { UserRepository } from "./user.repository";
import { protect, restrictTo } from "../../middlewares/auth.middleware";

const router = express.Router();
const userController = new UserController(
  new UserService(new UserRepository()),
);

router.get("/", protect, restrictTo("SUPER_ADMIN"), userController.getAllUsers);
router.post(
  "/create-admin",
  protect,
  restrictTo("SUPER_ADMIN"),
  userController.createAdmin,
);
router.patch(
  "/status/:id",
  protect,
  restrictTo("SUPER_ADMIN"),
  userController.toggleStatus,
);
router.patch(
  "/change-role/:id",
  protect,
  restrictTo("SUPER_ADMIN"),
  userController.changeRole,
);
router.delete(
  "/:id",
  protect,
  restrictTo("SUPER_ADMIN", "ADMIN"),
  userController.deleteUser,
);

export const UserRoutes = router;
