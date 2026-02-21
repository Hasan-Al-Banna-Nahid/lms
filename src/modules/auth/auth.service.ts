import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { AuthRepository } from "./auth.repository";
import { sendEmail } from "../../utils/sendEmail";
import { registerUserSchema, loginSchema } from "./auth.dto";

export class AuthService {
  private repository: AuthRepository;

  constructor(repository: AuthRepository) {
    this.repository = repository;
  }

  public async register(payload: any) {
    const validatedData = registerUserSchema.parse({ body: payload });
    const userData = validatedData.body;

    const isExist = await this.repository.findUserByEmail(userData.email);
    if (isExist) {
      throw new Error("User already exists");
    }

    const hashedPassword = await bcrypt.hash(userData.password, 12);

    const user = await this.repository.createUser({
      ...userData,
      password: hashedPassword,
    });

    await sendEmail(
      user.email,
      `<h1>Welcome ${user.firstName}</h1><p>Your registration is successful.</p>`,
      "Welcome to LMS",
    );

    return user;
  }

  public async login(payload: any) {
    const validatedData = loginSchema.parse({ body: payload });
    const credentials = validatedData.body;

    const user = await this.repository.findUserByEmail(credentials.email);
    if (!user) {
      throw new Error("User not found");
    }

    const isMatch = await bcrypt.compare(credentials.password, user.password);
    if (!isMatch) {
      throw new Error("Invalid credentials");
    }

    const token = jwt.sign(
      { id: user.id, role: user.role, email: user.email },
      process.env.JWT_ACCESS_SECRET as string,
      { expiresIn: "1d" },
    );

    return { token, user };
  }
}
