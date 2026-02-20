"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnalyticsRoutes = void 0;
const express_1 = __importDefault(require("express"));
const analytics_controller_1 = require("./analytics.controller");
const auth_middleware_1 = require("../../middlewares/auth.middleware");
const router = express_1.default.Router();
router.get("/dashboard", auth_middleware_1.protect, (0, auth_middleware_1.restrictTo)("SUPER_ADMIN", "ADMIN"), analytics_controller_1.AnalyticsController.getDashboardData);
exports.AnalyticsRoutes = router;
