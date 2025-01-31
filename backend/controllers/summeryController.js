// Add this route in your controller or a separate file for stats
import Order from "../models/orderModel.js";
import Product from "../models/productModel.js";

// Get summary stats for dashboard
export const getDashboardStats = async (req, res) => {
  try {
    const totalProducts = await Product.countDocuments(); // Count total products
    const totalOrders = await Order.countDocuments(); // Count total orders

    res.status(200).json({
      success: true,
      data: {
        totalProducts,
        totalOrders,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
};
