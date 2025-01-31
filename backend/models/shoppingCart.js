import mongoose from 'mongoose';

const { Schema, model } = mongoose;

// Define the ShoppingCart schema
const shoppingCartSchema = new Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',  // Reference to the Users collection
    required: true,
  },
  items: [{
    product_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',  // Reference to the Product collection (ensure Product model exists)
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,  // Minimum quantity should be 1
    },
  }],
  created_at: {
    type: Date,
    default: Date.now,
  },
}, {
  timestamps: true, // Automatically add createdAt and updatedAt fields
});

// Create the ShoppingCart model
const ShoppingCart = model('ShoppingCart', shoppingCartSchema);

export default ShoppingCart;
