const errorMiddleware = (err, req, res, next) => {
    err.message = err.message || "Internal Server Error";
    err.statusCode = err.statusCode || 500;
    if (err.name === "CastError") {
        err.message = `Resource not found. Invalid: ${err.message}`;
        err.statusCode = 400;
    }
    res.status(err.statusCode).json({
        success: false,
        message: err.message,
    });
};
export default errorMiddleware;
