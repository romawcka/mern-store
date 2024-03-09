import dotenv from 'dotenv';
dotenv.config();

import cookieParser from 'cookie-parser';
import express from 'express';
import { mongooseConnection } from './db.js';
import { router as productRoutes } from './routes/products.route.js';
import { router as usersRoutes } from './routes/users.route.js';

// port where app will work
const port = process.env.PORT;

// initialization of app
const app = express();

// body parser (will able to read data from req.body)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// cookie parser (will able to react data from cookie)
app.use(cookieParser());

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

app.use('/api/products', productRoutes);
app.use('/api/users', usersRoutes);

// error handlersapp.use(notFound);
// app.use(errorHandler);
//

mongooseConnection();

// live-server
app.listen(port, () => console.log(`Server is running on port ${port}`));
