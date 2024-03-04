import { asyncHandler } from '../middleware/asyncHandler.js';
import { Product } from '../models/product.model.js';

// @desc --> Fetch all products | @route --> GET 'api/products/' | @access --> public
export const getAllProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.status(200).json(products);
});

// @desc --> Fetch specific product by id | @route --> GET 'api/products/:id' | @access --> public
export const getProduct = asyncHandler(async (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // Разрешить доступ со всех источников
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  const { id } = req.params;
  const product = await Product.findById(id);

  res.status(200).json(product);

  next();
});
