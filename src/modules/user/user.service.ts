import bcrypt from "bcryptjs";
import { UserRepository } from "./user.repository";
import { UserStatus, UserRole } from "../../../generated/prisma/client";

export class UserService {
  private repository: UserRepository;

  constructor(repository: UserRepository) {
    this.repository = repository;
  }

  public async getAllUsers(filters: any) {
    return await this.repository.getAllUsers(filters);
  }

  public async createAdmin(payload: any) {
    const hashedPassword = await bcrypt.hash(payload.password, 12);
    const adminData = {
      ...payload,
      password: hashedPassword,
      role: "ADMIN" as UserRole,
      status: "ACTIVE" as UserStatus,
    };
    return await this.repository.createUser(adminData);
  }

  public async manageUserStatus(userId: string, status: string) {
    const validStatuses = Object.values(UserStatus);
    if (!validStatuses.includes(status as any)) {
      throw new Error(`Invalid status. Use: ${validStatuses.join(", ")}`);
    }

    const user = await this.repository.getUserById(userId);
    if (!user) throw new Error("User not found");
    if (user.role === "SUPER_ADMIN")
      throw new Error("Cannot change status of SUPER_ADMIN");

    return await this.repository.updateUser(userId, {
      status: status as UserStatus,
    });
  }

  public async manageUserRole(userId: string, role: string) {
    const validRoles = Object.values(UserRole);
    if (!validRoles.includes(role as any)) {
      throw new Error(`Invalid role. Use: ${validRoles.join(", ")}`);
    }

    const user = await this.repository.getUserById(userId);
    if (!user) throw new Error("User not found");
    if (user.role === "SUPER_ADMIN")
      throw new Error("Cannot change role of SUPER_ADMIN");

    return await this.repository.updateUser(userId, { role: role as UserRole });
  }

  public async deleteUserAccount(targetUserId: string) {
    const user = await this.repository.getUserById(targetUserId);
    if (user?.role === "SUPER_ADMIN")
      throw new Error("Cannot delete SUPER_ADMIN");
    return await this.repository.softDeleteUser(targetUserId);
  }
}
