"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const prisma_1 = require("./lib/prisma");
const main = async () => {
    try {
        await prisma_1.prisma.$connect();
        console.log("Database connected successfully!");
        app_1.default.listen(process.env.PORT, () => {
            console.log(`Server is running on port ${process.env.PORT}`);
        });
    }
    catch (err) {
        console.error("Database connection failed:", err);
        prisma_1.prisma.$disconnect();
    }
};
main();
