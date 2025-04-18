const express = require("express");
const router = express.Router();
const ProductController = require("../controllers/productController");
const { upload } = require("../middleware/multer.middleware");

// Route to fetch all transactions
router.get("/", ProductController.getProducts);

// Route to add a new transaction
router.post("/", upload.fields([
    {
        name: "image",
        maxCount: 1
    }
]), ProductController.addProduct);

// router.post("/",  ProductController.addProduct);

// Route to delete a transaction by ID
router.delete("/:id", ProductController.deleteProduct);

module.exports = router;
