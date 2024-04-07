import { PayPalScriptProvider } from '@paypal/react-paypal-js';
// eslint-disable-next-line no-unused-vars
import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  Route,
  RouterProvider,
  createBrowserRouter as createRouter,
  createRoutesFromElements as routes,
} from 'react-router-dom';
import App from './App.jsx';
import {
  Cart,
  Home,
  Login,
  Order,
  OrderList,
  Payment,
  PlaceOrder,
  Product,
  ProductsEdit,
  ProductsList,
  Profile,
  Register,
  Shipping,
  UserEdit,
  UserList,
} from './screen/index.js';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import './assets/styles/bootstrap.custom.css';
import './assets/styles/style.css';
import { AdminRouter, PrivateRouter } from './components/index.js';
import store from './store.js';

const router = createRouter(
  routes(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<Home />} />
      {/* @@desc --> for searching */}
      <Route path="/search/:keyword" element={<Home />} />
      {/* @@desc --> for implementing pagination */}
      <Route path="/page/:pageNumber" element={<Home />} />
      {/* @@desc --> for searching + pagination*/}
      <Route path="/search/:keyword/page/:pageNumber" element={<Home />} />

      <Route path="/products/:id" element={<Product />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      {/* private routes */}
      <Route path="" element={<PrivateRouter />}>
        <Route path="/shipping" element={<Shipping />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/placeorder" element={<PlaceOrder />} />
        <Route path="/orders/:id" element={<Order />} />
        <Route path="/profile" element={<Profile />} />
      </Route>
      {/* routes for admin */}
      <Route path="" element={<AdminRouter />}>
        <Route path="/admin/orders" element={<OrderList />} />
        <Route path="/admin/orders/:pageNumber" element={<OrderList />} />
        <Route path="/admin/products" element={<ProductsList />} />{' '}
        <Route path="/admin/products/:pageNumber" element={<ProductsList />} />
        <Route path="/admin/products/:id/edit" element={<ProductsEdit />} />
        <Route path="/admin/users/" element={<UserList />} />
        <Route path="/admin/users/:pageNumber" element={<UserList />} />
        <Route path="/admin/users/:id/edit" element={<UserEdit />} />
      </Route>
    </Route>,
  ),
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <HelmetProvider>
    <Provider store={store}>
      <PayPalScriptProvider deferLoading={true}>
        <RouterProvider router={router} />
      </PayPalScriptProvider>
    </Provider>
  </HelmetProvider>,
);
