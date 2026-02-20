"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const auth_repository_1 = require("./auth.repository");
const sendEmail_1 = require("../../utils/sendEmail");
const auth_dto_1 = require("./auth.dto");
require("dotenv/config");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.AuthService = {
    register: async (payload) => {
        const validatedData = auth_dto_1.registerUserSchema.parse({ body: payload });
        const userData = validatedData.body;
        const isExist = await auth_repository_1.AuthRepository.findUserByEmail(userData.email);
        if (isExist)
            throw new Error("User already exists");
        const hashedPassword = await bcryptjs_1.default.hash(userData.password, 12);
        const user = await auth_repository_1.AuthRepository.createUser({
            ...userData,
            password: hashedPassword,
        });
        await (0, sendEmail_1.sendEmail)(user.email, `<h1>Welcome ${user.firstName}</h1><p>Your registration is successful.</p>`, "Welcome to LMS");
        return user;
    },
    login: async (payload) => {
        const validatedData = auth_dto_1.loginSchema.parse({ body: payload });
        const credentials = validatedData.body;
        const user = await auth_repository_1.AuthRepository.findUserByEmail(credentials.email);
        if (!user)
            throw new Error("User not found");
        const isMatch = await bcryptjs_1.default.compare(credentials.password, user.password);
        if (!isMatch)
            throw new Error("Invalid credentials");
        const token = jsonwebtoken_1.default.sign({ id: user.id, role: user.role, email: user.email }, process.env.JWT_ACCESS_SECRET, { expiresIn: "1d" });
        return { token, user };
    },
};
