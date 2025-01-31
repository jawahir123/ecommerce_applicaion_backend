import ShoppingCart from '../models/shoppingCart.js';

// Create or update a shopping cart for a user
const createOrUpdateCart = async (req, res) => {
  try {
    const { user_id, items } = req.body;

    // Find the user's existing cart, or create a new one if not found
    let cart = await ShoppingCart.findOne({ user_id });

    if (!cart) {
      // If no cart exists, create a new one
      cart = new ShoppingCart({ user_id, items });
      await cart.save();
      return res.status(201).json({
        message: 'Shopping cart created successfully!',
        cart,
      });
    }

    // Update the existing cart by modifying the items
    cart.items = items;  // You can add logic to update individual items if needed
    await cart.save();

    return res.status(200).json({
      message: 'Shopping cart updated successfully!',
      cart,
    });
  } catch (error) {
    return res.status(400).json({
      error: error.message,
    });
  }
};

// Get the shopping cart for a user
const getCart = async (req, res) => {
  try {
    const user_id = req.params.user_id;
    const cart = await ShoppingCart.findOne({ user_id }).populate('items.product_id');

    if (!cart) {
      return res.status(404).json({
        message: 'Shopping cart not found!',
      });
    }

    return res.status(200).json({
      cart,
    });
  } catch (error) {
    return res.status(400).json({
      error: error.message,
    });
  }
};

// Add an item to the cart
const addItemToCart = async (req, res) => {
  try {
    const { user_id, product_id, quantity } = req.body;

    // Find the user's cart
    let cart = await ShoppingCart.findOne({ user_id });

    if (!cart) {
      // If no cart exists, create a new one with the item
      cart = new ShoppingCart({
        user_id,
        items: [{ product_id, quantity }],
      });
      await cart.save();
      return res.status(201).json({
        message: 'Item added to cart successfully!',
        cart,
      });
    }

    // If the cart exists, add the item or update the quantity
    const itemIndex = cart.items.findIndex(item => item.product_id.toString() === product_id);

    if (itemIndex > -1) {
      // Item already exists, update the quantity
      cart.items[itemIndex].quantity += quantity;
    } else {
      // New item, add to the cart
      cart.items.push({ product_id, quantity });
    }

    await cart.save();
    return res.status(200).json({
      message: 'Item added to cart successfully!',
      cart,
    });
  } catch (error) {
    return res.status(400).json({
      error: error.message,
    });
  }
};

// Remove an item from the cart
const removeItemFromCart = async (req, res) => {
  try {
    const { user_id, product_id } = req.body;

    // Find the user's cart
    const cart = await ShoppingCart.findOne({ user_id });

    if (!cart) {
      return res.status(404).json({
        message: 'Shopping cart not found!',
      });
    }

    // Find the item and remove it
    cart.items = cart.items.filter(item => item.product_id.toString() !== product_id);
    await cart.save();

    return res.status(200).json({
      message: 'Item removed from cart successfully!',
      cart,
    });
  } catch (error) {
    return res.status(400).json({
      error: error.message,
    });
  }
};

export { createOrUpdateCart, getCart, addItemToCart, removeItemFromCart };
