import { asyncHandler } from '../middleware/asyncHandler.js';
import { Product } from '../models/product.model.js';

// @desc --> Fetch all products | @route --> GET 'api/products/' | @access --> public
export const getAllProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.status(200).json(products);
});

// @desc --> Fetch specific product by id
// @route --> GET 'api/products/:id'
// @access --> public
export const getProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  res.status(200).json(product);
});

// @desc   --> create product by admin
// @route  --> POST 'api/products'
// @access --> protect (signed) + admin (isAdmin => true)
export const createProduct = asyncHandler(async (req, res) => {
  const product = await new Product({
    price: 0,
    numReviews: 0,
    countInStock: 0,
    user: req.user._id,
    name: 'Sample Name',
    brand: 'Sample Brand',
    category: 'Sample Category',
    image: '/images/sample.jpeg',
    description: 'Sample Description',
  });
  const newProduct = await product.save();
  res.status(201).json(newProduct);
});

// @desc   --> edit product by admin
// @route  --> PUT 'api/products/:id'
// @access --> protect (signed) + admin (isAdmin => true)
export const updateProduct = asyncHandler(async (req, res) => {
  const { price, countInStock, name, brand, category, image, description } =
    req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = name;
    product.price = price;
    product.description = description;
    product.image = image;
    product.brand = brand;
    product.category = category;
    product.countInStock = countInStock;

    const updatedProduct = await product.save();
    res.status(201).json(updatedProduct);
  } else {
    res.status(404);
    throw new Error('The product is not found');
  }
});
