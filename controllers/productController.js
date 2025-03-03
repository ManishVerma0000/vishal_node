const Product = require("../models/Product");
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
// Set up multer for image uploads
const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: (req, file, cb) => {
    cb(
      null,
      Date.now() +
        "-" +
        Math.round(Math.random() * 1e9) +
        path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 100 * 10224 * 10224 }, // 5MB file limit
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|webp|gif/;
    const extname = fileTypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimeType = fileTypes.test(file.mimetype);
    if (mimeType && extname) {
      return cb(null, true);
    } else {
      cb("Error: Images Only!");
    }
  },
}).array("images", 100); // 'images' should match the name used in FormData

exports.createProduct = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res
        .status(400)
        .json({ message: "Error uploading images", error: err });
    }

    console.log(req.files); // Log to check if files are being uploaded

    const {
      name,
      price,
      category,
      quantity,
      dimensions,
      stock,
      description,
      color,
    } = req.body;
    const images = req.files
      ? req.files.map((file) => `/uploads/${file.filename}`)
      : []; // Safely check for req.files

    try {
      const newProduct = new Product({
        name,
        price,
        category,
        quantity,
       
        dimensions,
        stock,
        description,
        color,
        images,
      });

      await newProduct.save();
      res.json({
        message: "Product created successfully",
        product: newProduct,
      });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error creating product", error: error.message });
    }
  });
};

exports.updateProduct = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res
        .status(400)
        .json({ message: "Error uploading images", error: err });
    }

    const { id } = req.params;
    const {
      name,
      price,
      category,
      quantity,
     
      dimensions,
      stock,
      description,
      color,
    } = req.body;

    try {
      // Find the existing product
      const existingProduct = await Product.findById(id);
      if (!existingProduct) {
        return res.status(404).json({ message: "Product not found" });
      }

      // Parse imagesToDelete from request (if provided)
      const imagesToDelete = JSON.parse(req.body.imagesToDelete || "[]");

      // Delete selected old images from the file system and filter them out from the product's image array
      const updatedImages = existingProduct.images.filter((img) => {
        if (imagesToDelete.includes(img)) {
          const fullPath = path.join(__dirname, "..", img);
          fs.unlink(fullPath, (err) => {
            if (err) {
              console.error("Error deleting old image:", fullPath, err);
            } else {
              console.log("Deleted old image:", fullPath);
            }
          });
          return false;
        }
        return true;
      });

      // Get the new images from the upload
      const newImages = req.files.map((file) => `/uploads/${file.filename}`);

      // Update product with new and remaining old images
      const updatedProduct = await Product.findByIdAndUpdate(
        id,
        {
          name,
          price,
          category,
          quantity,
         
          dimensions,
          stock,
          description,
          color,
          images: [...updatedImages, ...newImages], // Keep remaining old images and add new images
        },
        { new: true, runValidators: true }
      );

      res.json({
        message: "Product updated successfully",
        product: updatedProduct,
      });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error updating product", error: error.message });
    }
  });
};

exports.getProduct = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getByIdProducts = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteProduct = async (req, res) => {
  const { id } = req.params;
  console.log("Deleting product with id:", id);

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid product ID format" });
    }

    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Delete images from the file system
    if (product.images && product.images.length > 0) {
      product.images.forEach((imagePath) => {
        const fullPath = path.join(__dirname, "..", imagePath);
        fs.unlink(fullPath, (err) => {
          if (err) {
            console.error("Error deleting image:", fullPath, err);
          } else {
            console.log("Deleted image:", fullPath);
          }
        });
      });
    }

    // Now delete the product from the database
    await Product.findByIdAndDelete(id);

    res.json({ message: "Product and associated images deleted successfully" });
  } catch (error) {
    console.error("Error during product deletion:", error);
    res
      .status(500)
      .json({ message: "Error deleting product", error: error.message });
  }
};
