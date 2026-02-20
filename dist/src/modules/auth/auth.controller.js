import { AuthService } from "./auth.service";
export const AuthController = {
    register: async (req, res) => {
        try {
            const result = await AuthService.register(req.body);
            res.status(201).json({ success: true, data: result });
        }
        catch (err) {
            res.status(400).json({ success: false, message: err.message });
        }
    },
    login: async (req, res) => {
        try {
            const result = await AuthService.login(req.body);
            res.status(200).json({ success: true, ...result });
        }
        catch (err) {
            res.status(400).json({ success: false, message: err.message });
        }
    },
};
