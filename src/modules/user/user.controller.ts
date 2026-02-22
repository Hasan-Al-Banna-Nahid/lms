import { Request, Response } from "express";
import { UserService } from "./user.service";

export class UserController {
  private userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  // 1. Fetch all users list
  public getAllUsers = async (req: Request, res: Response): Promise<void> => {
    try {
      const result = await this.userService.getAllUsers(req.query);

      res.status(200).json({
        success: true,
        message: "Users retrieved successfully",
        data: result,
      });
    } catch (err: any) {
      res.status(400).json({
        success: false,
        message: err.message,
      });
    }
  };

  // 2. Create Admin Account
  public createAdmin = async (req: Request, res: Response): Promise<void> => {
    try {
      const result = await this.userService.createAdmin(req.body);

      res.status(201).json({
        success: true,
        message: "Admin account created successfully",
        data: result,
      });
    } catch (err: any) {
      res.status(400).json({
        success: false,
        message: err.message,
      });
    }
  };

  // 3. Toggle User Status (Active/Inactive)
  public toggleStatus = async (req: Request, res: Response): Promise<void> => {
    try {
      const result = await this.userService.manageUserStatus(
        req.params.id,
        req.body.status,
      );

      res.status(200).json({
        success: true,
        message: "User status updated",
        data: result,
      });
    } catch (err: any) {
      res.status(400).json({
        success: false,
        message: err.message,
      });
    }
  };

  // 4. Soft Delete User
  public deleteUser = async (req: Request, res: Response): Promise<void> => {
    try {
      // Assuming req.user is populated by 'protect' middleware
      const adminRole = (req as any).user?.role;

      await this.userService.deleteUserAccount(adminRole, req.params.id);

      res.status(200).json({
        success: true,
        message: "User deleted successfully",
        data: null,
      });
    } catch (err: any) {
      res.status(400).json({
        success: false,
        message: err.message,
      });
    }
  };
}
