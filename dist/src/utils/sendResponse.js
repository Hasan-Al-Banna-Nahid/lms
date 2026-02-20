const sendResponse = (res, data) => {
    res.status(data.statusCode).json({
        success: data.success,
        message: data.message || "Success",
        data: data.data,
    });
};
export default sendResponse;
