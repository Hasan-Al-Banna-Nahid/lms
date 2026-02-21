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
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.use("/api/v1", AuthRoutes);
app.use("/api/v1", CategoryRoutes);
app.use("/api/v1/course", CourseRoutes);
app.use("/api/v1/lession", LessonRoutes);
app.use("/api/v1", EnrollmentRoutes);
app.use("/api/v1", AnalyticsRoutes);
app.use("/api/v1", UserRoutes);

app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: "Requested API route not found!",
  });
});
app.use(globalErrorHandler);
export default app;
