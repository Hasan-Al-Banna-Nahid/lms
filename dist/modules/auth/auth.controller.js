"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const auth_service_1 = require("./auth.service");
exports.AuthController = {
    register: async (req, res) => {
        try {
            const result = await auth_service_1.AuthService.register(req.body);
            res.status(201).json({ success: true, data: result });
        }
        catch (err) {
            res.status(400).json({ success: false, message: err.message });
        }
    },
    login: async (req, res) => {
        try {
            const result = await auth_service_1.AuthService.login(req.body);
            res.status(200).json({ success: true, ...result });
        }
        catch (err) {
            res.status(400).json({ success: false, message: err.message });
        }
    },
};
