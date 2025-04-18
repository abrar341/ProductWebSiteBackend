const Product = require("../models/productModel");
const { uploadOnCloudinary } = require("../src/utils/cloudinary");

const getProducts = async (req, res) => {
    try {

        const products = await Product.find().sort({ date: -1 });

        res.status(200).json({
            success: true,
            count: products.length,
            products,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch products",
            error: error.message,
        });
    }
};


const addProduct = async (req, res) => {
    try {
        const { name, price, category } = req.body;
        console.log("name, price, category", name, price, category);


        let imageLogoLocalPath;
        if (req.files && Array.isArray(req.files.image) && req.files.image.length > 0) {
            imageLogoLocalPath = req.files.image[0].path;
        }

        // Upload logo if present
        const productPic = imageLogoLocalPath ? await uploadOnCloudinary(imageLogoLocalPath) : null;


        // Validate required fields
        if (!name || !price || !category) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Validate amount
        if (price <= 0) {
            return res.status(400).json({ message: "Amount must be a positive number" });
        }
        let image;
        // Create new Product
        // Create new Product with image URL
        const newProduct = new Product({
            name,
            category,
            price,
            image: productPic?.url?.trim() || "",
        });


        // Save Product to the database
        await newProduct.save();

        res.status(201).json({
            message: "Product added successfully",
            product: newProduct,
        });
    } catch (error) {
        console.error("Error adding Product:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};


// Delete a Product by ID
const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;

        // Find and delete the product
        const deletedProduct = await Product.findByIdAndDelete(id);

        if (!deletedProduct) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        res.status(200).json({ success: true, message: "Product deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};

module.exports = { getProducts, addProduct, deleteProduct };
