import Product from '../models/productModel.js';
import mongoose from 'mongoose';
import multer from 'multer';
import path from 'path';

// Set up Multer storage engine
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Store the uploaded images in the 'uploads/' folder
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname); // Get the file extension
    const filename = Date.now() + ext; // Create a unique filename based on timestamp
    cb(null, filename);
  }
});

// Create Multer instance with storage configuration
const upload = multer({ storage });

// Helper function for finding a product by ID
const findProductById = async (id, res) => {
  try {
    const product = await Product.findById(id).populate('category'); // Populate category details
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    return product;
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// CREATE: Add a new product
export const createProduct = async (req, res) => {
  try {
    // Use Multer to upload the image
    upload.single('image')(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ message: 'Error uploading image', error: err.message });
      }

      // Extract form fields and image URL from the request body and file
      const { name, price, description, category, stock } = req.body;
      const imageUrl = req.file ? `http://localhost:3000/uploads/${req.file.filename}` : ''; // Construct image URL

      // Validate required fields
      if (!name || !price || !description || !category || !imageUrl || stock === undefined) {
        return res.status(400).json({ message: 'Please provide all required fields' });
      }

      // Create and save the new product
      const newProduct = new Product({ name, price, description, category, image: imageUrl, stock });
      const product = await newProduct.save();

      res.status(201).json({ message: 'Product created successfully', product });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// READ: Get all products
export const getAllProducts = async (req, res) => {
  const { page = 1, limit = 10 } = req.query; // Default values
  try {
    const products = await Product.find()
      .populate('category')
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const total = await Product.countDocuments();

    res.status(200).json({
      message: 'Products retrieved successfully',
      products,
      total,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// READ: Get all products by category
export const getProductsByCategory = async (req, res) => {
  try {
    const categoryId = req.params.category;

    if (!mongoose.Types.ObjectId.isValid(categoryId)) {
      return res.status(400).json({ error: 'Invalid category ID' });
    }

    const products = await Product.find({ category: categoryId });

    if (products.length === 0) {
      return res.status(404).json({ message: 'No products found for this category' });
    }

    return res.status(200).json({ products });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

// READ: Get a single product by ID
export const getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await findProductById(id, res);
    if (product) {
      res.status(200).json({ message: 'Product retrieved successfully', product });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// UPDATE: Update a product by ID
export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, price, description, category, stock } = req.body;

  try {
    const product = await findProductById(id, res);
    if (!product) return;

    // Handle image upload separately if it is provided
    let imageUrl = product.image; // Keep existing image URL

    if (req.file) {
      // If a new image is provided, update the image URL
      imageUrl = `http://localhost:3000/uploads/${req.file.filename}`;
    }

    // Update the product
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { name, price, description, category, image: imageUrl, stock },
      { new: true } // Return the updated product
    ).populate('category');

    res.status(200).json({ message: 'Product updated successfully', updatedProduct });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// DELETE: Delete a product by ID
export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await findProductById(id, res);
    if (!product) return;

    // Delete the product
    await Product.findByIdAndDelete(id);
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// SEARCH: Search products by query
export const searchProducts = async (req, res) => {
  const { query } = req.query;

  try {
    const products = await Product.find({
      $text: { $search: query }, // Use text search
    }).populate('category');

    res.status(200).json({ success: true, products });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
};
