import jwt from "jsonwebtoken";
import { prisma } from "../lib/prisma";
import "dotenv/config";
export const protect = async (req, res, next) => {
    try {
        let token;
        if (req.headers.authorization &&
            req.headers.authorization.startsWith("Bearer")) {
            token = req.headers.authorization.split(" ")[1];
        }
        else if (req.cookies?.accessToken) {
            token = req.cookies.accessToken;
        }
        if (!token) {
            return res
                .status(401)
                .json({ success: false, message: "You are not logged in" });
        }
        const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
        const currentUser = await prisma.user.findUnique({
            where: { id: decoded.id, status: "ACTIVE" },
        });
        if (!currentUser) {
            return res.status(401).json({
                success: false,
                message: "User no longer exists or suspended",
            });
        }
        req.user = decoded;
        next();
    }
    catch (error) {
        return res.status(401).json({ success: false, message: "Invalid token" });
    }
};
export const restrictTo = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user?.role)) {
            return res.status(403).json({
                success: false,
                message: "You do not have permission to perform this action",
            });
        }
        next();
    };
};
