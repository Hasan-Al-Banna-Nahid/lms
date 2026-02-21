import { prisma } from "../../lib/prisma";

export class AuthRepository {
  public async findUserByEmail(email: string) {
    return await prisma.user.findUnique({
      where: { email },
    });
  }

  public async createUser(data: any) {
    return await prisma.user.create({
      data,
    });
  }
}
