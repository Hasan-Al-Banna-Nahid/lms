import bcrypt from "bcryptjs";
import { UserRepository } from "./user.repository";

export class UserService {
  private repository: UserRepository;

  constructor(repository: UserRepository) {
    this.repository = repository;
  }

  public async createAdmin(payload: any) {
    const hashedPassword = await bcrypt.hash(payload.password, 12);
    const adminData = {
      ...payload,
      password: hashedPassword,
      role: "ADMIN",
    };
    return await this.repository.createUser(adminData);
  }

  public async manageUserStatus(userId: string, status: string) {
    return await this.repository.updateUserStatus(userId, status);
  }

  public async deleteUserAccount(adminRole: string, targetUserId: string) {
    return await this.repository.softDeleteUser(targetUserId);
  }
}
