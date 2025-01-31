import Order from "../models/orderModel.js";
import Product from "../models/productModel.js";

export const getStockReport =async(req,res)=>{
   try{
      // Fetch products with low stock
    const lowStockProducts = await Product.find({ stock: { $lt: 10 } }, "name stock");

    // Count total products and total orders
    const totalProducts = await Product.countDocuments();
    const totalOrders = await Order.countDocuments();

    res.json({
      totalProducts,
      totalOrders,
      lowStockProducts,
    });
   }catch(error){
      res.status(500).json({ error: "Failed to fetch the report." });
   }
}



// ================
// What data do you want to include? For example:
// Total sales
// Products out of stock done
// Orders by status (e.g., pending, completed)
// Revenue generated over a specific period