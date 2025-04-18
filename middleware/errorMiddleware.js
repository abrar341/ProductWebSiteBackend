const errorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    // Log error (only in development for debugging)
    if (process.env.NODE_ENV === "development") {
        console.error(`[ERROR] ${err.stack || err.message}`);
    }

    // Send structured error response
    res.status(statusCode).json({
        success: false,
        message,
        error: process.env.NODE_ENV === "development" ? err.stack : null,
    });
};

module.exports = errorHandler;
