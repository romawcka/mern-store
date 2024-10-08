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

router.route('/').get(getAllProducts).post(protect, admin, createProduct);

router.get('/top', getTopProducts);

router
  .route('/:id')
  .get(checkObjectId, getProduct)
  .put(protect, admin, checkObjectId, updateProduct)
  .delete(protect, admin, checkObjectId, deleteProduct);

router.route('/:id/reviews').post(protect, checkObjectId, createProductReview);
