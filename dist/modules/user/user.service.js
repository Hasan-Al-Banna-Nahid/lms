"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const user_repository_1 = require("./user.repository");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
exports.UserService = {
    createAdmin: async (payload) => {
        const hashedPassword = await bcryptjs_1.default.hash(payload.password, 12);
        const adminData = {
            ...payload,
            password: hashedPassword,
            role: "ADMIN",
        };
        return await user_repository_1.UserRepository.createUser(adminData);
    },
    manageUserStatus: async (userId, status) => {
        return await user_repository_1.UserRepository.updateUserStatus(userId, status);
    },
    deleteUserAccount: async (adminRole, targetUserId) => {
        return await user_repository_1.UserRepository.softDeleteUser(targetUserId);
    },
};
