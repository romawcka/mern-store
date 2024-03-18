import express from 'express';
import { admin, protect } from '../middleware/authMiddlleware.js';
import {
  addOrderItems,
  getMyOrders,
  getOrder,
  getOrders,
  updateOrderToDelivered,
  updateOrderToPaid,
} from '../controllers/order.controller.js';

export const router = express.Router();

// /api/orders
// @ -> private route | -> admin route
router.route('/').post(protect, addOrderItems).get(protect, admin, getOrders);
// @ -> private route --> /api/orders/myorders
router.get('/myorders', protect, getMyOrders);
// @ -> admin route --> /api/orders/:id
router.get('/:id', protect, getOrder);
// @ -> private route --> /api/orders/:paid
router.put('/:id/paid', protect, updateOrderToPaid);
// @ -> admin route --> /api/orders/:delivered
router.put('/:id/delivered', protect, admin, updateOrderToDelivered);
