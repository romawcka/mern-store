/* eslint-disable no-undef */
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import express from 'express';
import path from 'path';
import { mongooseConnection } from './db.js';
import { errorHandler } from './middleware/errorHandler.js';
import { router as orderRoutes } from './routes/order.route.js';
import { router as productRoutes } from './routes/products.route.js';
import { router as uploadRoutes } from './routes/upload.route.js';
import { router as usersRoutes } from './routes/users.route.js';

dotenv.config();
// port where app will work
// eslint-disable-next-line no-undef
const port = process.env.PORT;

// initialization of app
const app = express();

// body parser (will able to read data from req.body)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// cookie parser (will able to react data from cookie)
app.use(cookieParser());

app.use('/api/products', productRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/upload', uploadRoutes);

// @desc -> for paypal
app.get('/api/config/paypal', (req, res) =>
  res.send({ clientId: process.env.PAYPAL_CLIENT_ID }),
);

const __dirname = path.resolve(); // Set __dirmane to current directoty
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

if (process.env.NODE_ENV === 'production') {
  // @@desc --> set up static folder
  app.use(express.static(path.join(__dirname, '/frontend/dist')));

  // @@desc --> any route that is not api routes will be redirected to the index.html
  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html')),
  );
} else {
  // launching app
  app.get('/', (req, res, next) => {
    res.send('Api is running...');
    next();
  });
}

// error handlersapp.use(notFound);
app.use(errorHandler);

mongooseConnection();

// live-server
app.listen(port, () => console.log(`Server is running on port ${port}`));
