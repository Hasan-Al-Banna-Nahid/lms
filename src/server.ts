import app from "./app";
import { prisma } from "./lib/prisma";

const main = async () => {
  try {
    await prisma.$connect();
    console.log("Database connected successfully!");
    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  } catch (err) {
    console.error("Database connection failed:", err);
    prisma.$disconnect();
  }
};

main();
