import Order from '../models/orderModel.js';
import ShoppingCart from '../models/shoppingCart.js';

// ✅ Create a New Order & Clear Cart
export const createOrder = async (req, res, next) => {
  try {
    const { user_id, items, total_price, shipping_address, payment_method } = req.body;

    // 🛑 Validate request
    if (!user_id || !items || items.length === 0 || !total_price || !shipping_address || !payment_method) {
      return res.status(400).json({ message: 'Missing required fields.' });
    }

    // ✅ Create new order
    const newOrder = new Order({
      user_id,
      items,
      total_price,
      shipping_address,
      payment_method,
      status: 'Pending',
    });

    const savedOrder = await newOrder.save();

    // ✅ Clear the cart after successful order
    await ShoppingCart.findOneAndUpdate(
      { user_id: user_id },
      { $set: { items: [] } } // Empty the cart
    );

    res.status(201).json({ message: 'Order created successfully!', order: savedOrder });
  } catch (error) {
    next(error);
  }
};

// ✅ Get All Orders
export const getOrders = async (req, res, next) => {
  try {
    const orders = await Order.find()
      .populate('user_id', 'name email')
      .populate('items.product_id', 'name price');

    res.status(200).json(orders);
  } catch (error) {
    next(error);
  }
};

// ✅ Get a Specific Order by ID
export const getOrderById = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('user_id', 'name email')
      .populate('items.product_id', 'name price');

    if (!order) return res.status(404).json({ message: 'Order not found' });

    res.status(200).json(order);
  } catch (error) {
    next(error);
  }
};

// ✅ Update an Order
export const updateOrder = async (req, res, next) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedOrder) return res.status(404).json({ message: 'Order not found' });

    res.status(200).json(updatedOrder);
  } catch (error) {
    next(error);
  }
};

// ✅ Delete an Order
export const deleteOrder = async (req, res, next) => {
  try {
    const deletedOrder = await Order.findByIdAndDelete(req.params.id);
    if (!deletedOrder) return res.status(404).json({ message: 'Order not found' });

    res.status(200).json({ message: 'Order deleted successfully' });
  } catch (error) {
    next(error);
  }
};

export const getUserOrders = async (req, res) => {
  try {
    const { user_id } = req.params;
    console.log("🛑 Fetching orders for user:", user_id); // 🔥 Debugging

    if (!user_id) {
      return res.status(400).json({ success: false, message: "User ID is required" });
    }

    const orders = await Order.find({ user_id }) // ✅ Fixed field name
      .populate("items.product_id", "name price") // ✅ Fixed reference
      .sort({ createdAt: -1 });

    console.log("✅ Orders Found:", orders); // 🔥 Debugging

    res.status(200).json({ success: true, orders });
  } catch (error) {
    console.error("❌ Error fetching orders:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
