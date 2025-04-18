const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    price: {
        type: Number,
        required: true,
        min: 0.01, // Ensures positive numbers
    },
    category: {
        type: String,
        required: true,
        trim: true,
    },
    image: {
        type: String,
        // required: true,
    },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
