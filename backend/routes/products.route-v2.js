import express from 'express';
import {
  createProduct,
  createProductReview,
  deleteProduct,
  getAllProducts,
  getProduct,
  getTopProducts,
  updateProduct,
} from '../controllers/product.controller.js';
import { admin, protect } from '../middleware/authMiddlleware.js';
import { checkObjectId } from '../middleware/checkObjectId.js';

export const router = express.Router();

// api/products

// @desc --> get simply get all products | post --> protected and admined route for create product
router.route('/').get(getAllProducts).post(protect, admin, createProduct);

// @desc --> get top-rated products
router.get('/top', getTopProducts);

// @desc --> Fetch specific product by id
// @route --> 'api/products/:id' GET - get specific product | PUT - edit specific product for protected and admined user
// @access --> public | --> private + admin
router
  .route('/:id')
  .get(checkObjectId, getProduct)
  .put(protect, admin, checkObjectId, updateProduct)
  .delete(protect, admin, checkObjectId, deleteProduct);
// for single route, we can use route,get('/:id', getProduct)

router.route('/:id/reviews').post(protect, checkObjectId, createProductReview);
