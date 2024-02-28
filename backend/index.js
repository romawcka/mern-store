import express from 'express';
import products from './data/products.js';

// port where app will work
const port = 1000;

// initialization of app
const app = express();

// launching app
app.get('/', (req, res) => {
  res.send('Api is running...');
});

// get all products
app.get('/api/products', (req, res) => {
  res.json(products);
});

// get single products
app.get('/api/products/:id', (req, res) => {
  const product = products.find((product) => product._id === req.params.id);
  res.json(product);
});

// live-server
app.listen(port, () => console.log(`Server is running on port ${port}`));
