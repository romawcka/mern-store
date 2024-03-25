import express from 'express';
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProduct,
  updateProduct,
} from '../controllers/product.controller.js';
import { admin, protect } from '../middleware/authMiddlleware.js';

export const router = express.Router();

// api/products

// @desc --> get simply get all products | post --> protected and admined route for create product
router.route('/').get(getAllProducts).post(protect, admin, createProduct);

// @desc --> Fetch specific product by id
// @route --> 'api/products/:id' GET - get specific product | PUT - edit specific product for protected and admined user
// @access --> public | --> private + admin
router
  .route('/:id')
  .get(getProduct)
  .put(protect, admin, updateProduct)
  .delete(protect, admin, deleteProduct);
// for single route, we can use route,get('/:id', getProduct)
