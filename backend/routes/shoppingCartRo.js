import express from 'express';
import { createOrUpdateCart, getCart, addItemToCart, removeItemFromCart } from '../controllers/shoppingCartCon.js';

const router = express.Router();

// Route to create or update a shopping cart
router.post('/', createOrUpdateCart);

// Route to get a shopping cart for a user by user_id
router.get('/:user_id', getCart);

// Route to add an item to the cart
router.post('/add-item', addItemToCart);

// Route to remove an item from the cart
router.post('/remove-item', removeItemFromCart);

export default router;
