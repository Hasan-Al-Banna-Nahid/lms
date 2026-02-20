import cache from "../utils/cache";
export const cacheMiddleware = (key) => {
    return (req, res, next) => {
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
