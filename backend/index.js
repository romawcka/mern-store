import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import { products } from './data/products.js';
import { mongooseConnection } from './db.js';

// port where app will work
const port = process.env.PORT;

// initialization of app
const app = express();

// launching app
app.get('/', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // Разрешить доступ со всех источников
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  res.send('Api is running...');
  next();
});

// get all products
app.get('/api/products', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // Разрешить доступ со всех источников
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  res.json(products);
  next();
});

// get single products
app.get('/api/products/:id', (req, res, next) => {
  const product = products.find((product) => product._id === req.params.id);
  res.header('Access-Control-Allow-Origin', '*'); // Разрешить доступ со всех источников
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  res.json(product);
  next();
});

mongooseConnection();
// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => {
//     console.log('Connected to the database!');
//     app.listen(port, () => console.log(`Server is running on port ${port}`));
//   })
//   .catch(() => {
//     console.log('Connection failed');
//     process.exit(1);
//   });

// live-server
app.listen(port, () => console.log(`Server is running on port ${port}`));
