import express from 'express';
import { getAllProducts, getProduct } from '../controllers/product.controller.js';

export const router = express.Router();

// @desc --> can use either this syntax: router.route('/').get(getAllProducts) or:
router.get('/', getAllProducts);

// @desc --> Fetch specific product by id | @route --> GET 'api/products/:id' | @access --> public
router.get('/:id', getProduct);
