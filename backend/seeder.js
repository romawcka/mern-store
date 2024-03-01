import dotenv from 'dotenv';
import { products } from './data/products.js';
import { users } from './data/users.js';
import { mongooseConnection } from './db.js';
import { Order } from './models/order.model.js';
import { Product } from './models/product.model.js';
import { User } from './models/user.model.js';

dotenv.config();

mongooseConnection();

const importData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    const createdUsers = await User.insertMany(users);

    const adminUser = createdUsers[0]._id;

    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser };
    });

    await Product.insertMany(sampleProducts);

    console.log('Data were successfully imported!');
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

const deleteData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    console.log('Data were successfully deleted!');
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

process.argv[2] === '-d' ? deleteData() : importData();
