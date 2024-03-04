// @desc --> before controllers and asyncHandler middleware implemented
import express from 'express';
import { asyncHandler } from '../middleware/asyncHandler.js';
import { Product } from '../models/product.model.js';
import { getAllProducts } from '../controllers/product.controller.js';

export const router = express.Router();

// get all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// one product
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
