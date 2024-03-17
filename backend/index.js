import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import express from 'express';
import { mongooseConnection } from './db.js';
import { errorHandler } from './middleware/errorHandler.js';
import { router as orderRoutes } from './routes/order.route.js';
import { router as productRoutes } from './routes/products.route.js';
import { router as usersRoutes } from './routes/users.route.js';
dotenv.config();

// port where app will work
// eslint-disable-next-line no-undef
const port = process.env.PORT;

// initialization of app
const app = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept',
  );
  next();
});

// body parser (will able to read data from req.body)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// cookie parser (will able to react data from cookie)
app.use(cookieParser());

// launching app
app.get('/', (req, res) => {
  res.send('Api is running...');
});

app.use('/api/products', productRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/orders', orderRoutes);

// error handlersapp.use(notFound);
app.use(errorHandler);

mongooseConnection();

// live-server
app.listen(port, () =>
  console.log(
    `Server is running on port ${port}. CORS-enabled web server listening on ${port}`,
  ),
);
