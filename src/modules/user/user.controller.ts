import { Request, Response } from "express";
import { UserService } from "./user.service";
import sendResponse from "../../utils/sendResponse";

export class UserController {
  private userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  public createAdmin = async (req: Request, res: Response): Promise<void> => {
    try {
      const result = await this.userService.createAdmin(req.body);
      sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "Admin account created successfully",
        data: result,
      });
    } catch (err: any) {
      res.status(400).json({ success: false, message: err.message });
    }
  };

  public deleteUser = async (req: Request, res: Response): Promise<void> => {
    try {
      await this.userService.deleteUserAccount(req.user!.role, req.params.id);
      sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "User deleted successfully",
        data: null,
      });
    } catch (err: any) {
      res.status(400).json({ success: false, message: err.message });
    }
  };
}
