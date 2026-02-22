import bcrypt from "bcryptjs";
import { UserRepository } from "./user.repository";

export class UserService {
  private repository: UserRepository;

  constructor(repository: UserRepository) {
    this.repository = repository;
  }

  public async getAllUsers(filters: any) {
    return await this.repository.getAllUsers(filters);
  }

  public async createAdmin(payload: any) {
    // Check if user already exists
    const hashedPassword = await bcrypt.hash(payload.password, 12);
    const adminData = {
      ...payload,
      password: hashedPassword,
      role: "ADMIN",
      status: "ACTIVE", // Set default status
    };
    return await this.repository.createUser(adminData);
  }

  public async manageUserStatus(userId: string, status: string) {
    return await this.repository.updateUserStatus(userId, status);
  }

  public async deleteUserAccount(adminRole: string, targetUserId: string) {
    // Logic: Prevent non-super-admins from deleting certain roles if needed
    return await this.repository.softDeleteUser(targetUserId);
  }
}
