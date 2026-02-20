"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const user_service_1 = require("./user.service");
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
exports.UserController = {
    createAdmin: async (req, res) => {
        try {
            const result = await user_service_1.UserService.createAdmin(req.body);
            (0, sendResponse_1.default)(res, {
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
            await user_service_1.UserService.deleteUserAccount(req.user.role, req.params.id);
            (0, sendResponse_1.default)(res, {
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
