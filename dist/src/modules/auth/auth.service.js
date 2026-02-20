import bcrypt from "bcryptjs";
import { AuthRepository } from "./auth.repository";
import { sendEmail } from "../../utils/sendEmail";
import { registerUserSchema, loginSchema } from "./auth.dto";
import "dotenv/config";
import jwt from "jsonwebtoken";
export const AuthService = {
    register: async (payload) => {
        const validatedData = registerUserSchema.parse({ body: payload });
        const userData = validatedData.body;
        const isExist = await AuthRepository.findUserByEmail(userData.email);
        if (isExist)
            throw new Error("User already exists");
        const hashedPassword = await bcrypt.hash(userData.password, 12);
        const user = await AuthRepository.createUser({
            ...userData,
            password: hashedPassword,
        });
        await sendEmail(user.email, `<h1>Welcome ${user.firstName}</h1><p>Your registration is successful.</p>`, "Welcome to LMS");
        return user;
    },
    login: async (payload) => {
        const validatedData = loginSchema.parse({ body: payload });
        const credentials = validatedData.body;
        const user = await AuthRepository.findUserByEmail(credentials.email);
        if (!user)
            throw new Error("User not found");
        const isMatch = await bcrypt.compare(credentials.password, user.password);
        if (!isMatch)
            throw new Error("Invalid credentials");
        const token = jwt.sign({ id: user.id, role: user.role, email: user.email }, process.env.JWT_ACCESS_SECRET, { expiresIn: "1d" });
        return { token, user };
    },
};
