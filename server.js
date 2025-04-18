require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const productRoutes = require("./routes/productRoutes");
const errorHandler = require("./middleware/errorMiddleware");
const { connectDb } = require("./db/connectDb");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Routes
app.use("/api/products", productRoutes);

// Error Handling Middleware (must be after routes)
app.use(errorHandler);

// Start Server
const startServer = async () => {
    try {
        await connectDb(process.env.MONGODB_URI);
        console.log("Database connected");
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    } catch (error) {
        console.error("Error starting server:", error);
        process.exit(1);
    }
};

startServer();
