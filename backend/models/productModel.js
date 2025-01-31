import mongoose from "mongoose";
const Schema = mongoose.Schema;

// Define the Product Schema
const productSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId, // Reference to Category model
    ref: "Category", // The name of the Category model
    required: true,
  },
  image: {
    type: String, // URL to image
    required: true,
  },
  stock: {
    type: Number,
    required: true,
    min: 0,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
});
productSchema.index({ name: 'text', description: 'text' });


const Product = mongoose.model('Product', productSchema);

export default Product;
