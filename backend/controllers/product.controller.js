import { asyncHandler } from '../middleware/asyncHandler.js';
import { Product } from '../models/product.model.js';

// @@info: public, protect === signed, admin === isAdmin => true

// @desc --> Fetch all products | @route --> GET 'api/products/' | @access --> public
export const getAllProducts = asyncHandler(async (req, res) => {
  const pageSize = 5;

  // @@desc --> get the page number from url
  const page = Number(req.query.pageNumber) || 1;
  // @@desc --> get the keyword from url
  const keyword = req.query.keyword && {
    name: { $regex: req.query.keyword, $options: 'i' },
  };

  // @@desc --> get total count of products
  const count = await Product.countDocuments({ ...keyword });

  // @@desc --> get products, that limits by page size and skip the prv page
  const products = await Product.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  // @@desc --> return products, one page and all pages
  res.status(200).json({ products, page, pages: Math.ceil(count / pageSize) });
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
// @access --> protect / admin
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
// @access --> protect / admin
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

// @desc   --> delete product by admin
// @route  --> DELETE 'api/products/:id'
// @access --> protect / admin
export const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    await Product.deleteOne({ _id: product._id });
    res.status(200).json({ message: 'Product was succesfully deleted' });
  } else {
    res.status(404);
    throw new Error('Resourse not found');
  }
});

// @desc   --> create a new review
// @route  --> POST 'api/products/:id/reviews'
// @access --> protect
export const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;

  const product = await Product.findById(req.params.id);
  // @@desc --> в случае сущ-ния продукта
  if (product) {
    // @desc --> check if the product is not reviewed
    const alreadyReviewed = product.reviews.find(
      (review) => review.user.toString() === req.user._id.toString(),
    );

    if (alreadyReviewed) {
      res.status(400);
      throw new Error('Product already reviewed');
    }
    // @@desc --> in case the product is not reviewed, create review object
    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };
    // @@desc --> push a newly created review object into model in backend
    product.reviews.push(review);

    product.numReviews = product.reviews.length;

    // @@desc --> create product ratings by adding all together reviews
    product.rating =
      product.reviews.reduce((acc, review) => acc + review.rating, 0) /
      product.reviews.length;

    // @@desc --> save all changes
    await product.save();
    res.status(201).json({ message: 'Review added' });
  } else {
    res.status(404);
    throw new Error('Resourse not found');
  }
});

// @desc --> get top-rated products
// @route --> GET 'api/products/top'
// @access --> public
export const getTopProducts = asyncHandler(async (req, res) => {
  const product = await Product.find({}).sort({ rating: -1 }).limit(3);

  res.status(200).json(product);
});
