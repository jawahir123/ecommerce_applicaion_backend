import Product from "../models/productModel.js"; // Adjust the path to your model

// Get stock details for the dashboard
export const getStockDetails = async (req, res) => {
  try {
    const stockData = await Product.find({}, "name stock"); // Fetch specific fields
    res.status(200).json({
      success: true,
      data: stockData,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
};
