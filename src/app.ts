import express, { Request, Response } from "express";
import cors from "cors";
import { AuthRoutes } from "./modules/auth/auth.route";
import { CategoryRoutes } from "./modules/category/category.route";
import { CourseRoutes } from "./modules/course/course.route";
import { LessonRoutes } from "./modules/lesson/lesson.route";
import { EnrollmentRoutes } from "./modules/enrollment/enrollment.route";
import { AnalyticsRoutes } from "./modules/analytics/analytics.route";
import globalErrorHandler from "./middlewares/globalErrorHandler";
import { UserRoutes } from "./modules/user/user.route";

const app = express();

const allowedOrigins = [
  "http://localhost:3000",

  process.env.FRONTEND_URL, // From environment
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      console.error("Blocked by CORS:", origin);
      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.use("/api/v1", AuthRoutes);
app.use("/api/v1", CategoryRoutes);
app.use("/api/v1/course", CourseRoutes);
app.use("/api/v1/lesson", LessonRoutes);
app.use("/api/v1", EnrollmentRoutes);
app.use("/api/v1", AnalyticsRoutes);
app.use("/api/v1/users", UserRoutes);

app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: "Requested API route not found!",
  });
});
app.use(globalErrorHandler);
export default app;
