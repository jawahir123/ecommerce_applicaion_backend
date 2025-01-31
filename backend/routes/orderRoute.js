import express from 'express';
import { createOrder, getOrders, getOrderById, updateOrder, deleteOrder, getUserOrders } from '../controllers/orderController.js';

const router = express.Router();

// ✅ Order Routes
router.post('/create', createOrder);
router.get('/', getOrders);
router.get('/:id', getOrderById);
router.put('/:id', updateOrder);
router.delete('/:id', deleteOrder);
router.get('/user/:user_id', getUserOrders); // Fetch orders for a specific user

export default router;
