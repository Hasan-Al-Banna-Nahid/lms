import { UserRepository } from "./user.repository";
import bcrypt from "bcryptjs";

export const UserService = {
  createAdmin: async (payload: any) => {
    const hashedPassword = await bcrypt.hash(payload.password, 12);
    const adminData = {
      ...payload,
      password: hashedPassword,
      role: "ADMIN",
    };
    return await UserRepository.createUser(adminData);
  },

  manageUserStatus: async (userId: string, status: string) => {
    return await UserRepository.updateUserStatus(userId, status);
  },

  deleteUserAccount: async (adminRole: string, targetUserId: string) => {
    return await UserRepository.softDeleteUser(targetUserId);
  },
};
