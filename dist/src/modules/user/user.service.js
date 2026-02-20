import { UserRepository } from "./user.repository";
import bcrypt from "bcryptjs";
export const UserService = {
    createAdmin: async (payload) => {
        const hashedPassword = await bcrypt.hash(payload.password, 12);
        const adminData = {
            ...payload,
            password: hashedPassword,
            role: "ADMIN",
        };
        return await UserRepository.createUser(adminData);
    },
    manageUserStatus: async (userId, status) => {
        return await UserRepository.updateUserStatus(userId, status);
    },
    deleteUserAccount: async (adminRole, targetUserId) => {
        return await UserRepository.softDeleteUser(targetUserId);
    },
};
