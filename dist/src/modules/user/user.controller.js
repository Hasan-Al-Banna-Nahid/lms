import { UserService } from "./user.service";
import sendResponse from "../../utils/sendResponse";
export const UserController = {
    createAdmin: async (req, res) => {
        try {
            const result = await UserService.createAdmin(req.body);
            sendResponse(res, {
                statusCode: 201,
                success: true,
                message: "Admin account created successfully",
                data: result,
            });
        }
        catch (err) {
            res.status(400).json({ success: false, message: err.message });
        }
    },
    deleteUser: async (req, res) => {
        try {
            await UserService.deleteUserAccount(req.user.role, req.params.id);
            sendResponse(res, {
                statusCode: 200,
                success: true,
                message: "User deleted successfully",
                data: null,
            });
        }
        catch (err) {
            res.status(400).json({ success: false, message: err.message });
        }
    },
};
