import { Request, Response, NextFunction } from "express";
import cache from "../utils/cache";

export const cacheMiddleware = (key: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const cachedData = cache.get(key);

    if (cachedData) {
      return res.status(200).json({
        success: true,
        message: "Data served from cache",
        data: cachedData,
      });
    }

    next();
  };
};
