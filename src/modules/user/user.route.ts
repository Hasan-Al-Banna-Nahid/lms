import express from "express";
import { UserController } from "./user.controller";
import { protect, restrictTo } from "../../middlewares/auth.middleware";

const router = express.Router();

router.post(
  "/create-admin",
  protect,
  restrictTo("SUPER_ADMIN"),
  UserController.createAdmin,
);

router.delete(
  "/:id",
  protect,
  restrictTo("SUPER_ADMIN", "ADMIN"),
  UserController.deleteUser,
);

export const UserRoutes = router;
