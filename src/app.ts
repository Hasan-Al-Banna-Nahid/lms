import express from "express";
import cors from "cors";
import { AuthRoutes } from "./modules/auth/auth.route";
import { CategoryRoutes } from "./modules/category/category.route";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.use("/api/v1", AuthRoutes);
app.use("/api/v1", CategoryRoutes);

export default app;
