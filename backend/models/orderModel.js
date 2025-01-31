import mongoose from 'mongoose';

// Define the schema for an order
const orderSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Reference to User
      required: true,
    },
    items: [
      {
        product_id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product', // Reference to Product
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
      },
    ],
    total_price: {
      type: Number,
      required: true,
    },
    shipping_address: {
      type: String,
      required: true,
    },
    payment_method: {
      type: String,
      enum: ['Cash on Delivery', 'Credit Card', 'PayPal'], // Restrict options
      required: true,
    },
    status: {
      type: String,
      enum: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'], // Valid statuses
      default: 'Pending',
    },
  },
  { timestamps: true } // Auto add createdAt and updatedAt
);

// Create the Order model
const Order = mongoose.model('Order', orderSchema);

export default Order;
