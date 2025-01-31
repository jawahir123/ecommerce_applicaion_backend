import mongoose from 'mongoose';

// Define the Category schema
const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true, // Ensure the name is unique
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
}, {
  timestamps: true, // Automatically add createdAt and updatedAt fields
});

// Create the Category model
const Category = mongoose.model('Category', categorySchema);

export default Category;
