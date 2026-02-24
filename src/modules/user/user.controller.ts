import { Request, Response } from "express";
import { UserService } from "./user.service";

export class UserController {
  private userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  public getAllUsers = async (req: Request, res: Response) => {
    try {
      const result = await this.userService.getAllUsers(req.query);
      res.status(200).json({ success: true, data: result });
    } catch (err: any) {
      res.status(400).json({ success: false, message: err.message });
    }
  };

  public createAdmin = async (req: Request, res: Response) => {
    try {
      const result = await this.userService.createAdmin(req.body);
      res
        .status(201)
        .json({ success: true, message: "Admin created", data: result });
    } catch (err: any) {
      res.status(400).json({ success: false, message: err.message });
    }
  };

  public toggleStatus = async (req: Request, res: Response) => {
    try {
      const result = await this.userService.manageUserStatus(
        req.params.id,
        req.body.status,
      );
      res
        .status(200)
        .json({ success: true, message: "Status updated", data: result });
    } catch (err: any) {
      res.status(400).json({ success: false, message: err.message });
    }
  };

  public changeRole = async (req: Request, res: Response) => {
    try {
      const result = await this.userService.manageUserRole(
        req.params.id,
        req.body.role,
      );
      res
        .status(200)
        .json({ success: true, message: "Role updated", data: result });
    } catch (err: any) {
      res.status(400).json({ success: false, message: err.message });
    }
  };

  public deleteUser = async (req: Request, res: Response) => {
    try {
      await this.userService.deleteUserAccount(req.params.id);
      res
        .status(200)
        .json({ success: true, message: "User deleted successfully" });
    } catch (err: any) {
      res.status(400).json({ success: false, message: err.message });
    }
  };
}
