import express from 'express';
import {
  createProduct,
  getAllProducts,
  getProduct,
} from '../controllers/product.controller.js';
import { admin, protect } from '../middleware/authMiddlleware.js';

export const router = express.Router();

// api/products

// @desc --> get simply get all products | post --> protected and admined route for create product
router.route('/').get(getAllProducts).post(protect, admin, createProduct);

// @desc --> Fetch specific product by id
// @route --> GET 'api/products/:id'
// @access --> public
router.get('/:id', getProduct);
