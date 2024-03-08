import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import { mongooseConnection } from './db.js';
import { router as productRoutes } from './routes/products.route.js';
import { router as usersRoutes } from './routes/users.route.js';

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

app.use('/api/products', productRoutes);
app.use('/api/users', usersRoutes);

// error handlersapp.use(notFound);
// app.use(errorHandler);
//

mongooseConnection();

// live-server
app.listen(port, () => console.log(`Server is running on port ${port}`));
