import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  Route,
  RouterProvider,
  createBrowserRouter as createRouter,
  createRoutesFromElements as routes,
} from 'react-router-dom';
import App from './App.jsx';
import { Cart, Home, Login, Payment, Product, Register, Shipping } from './screen/index.js';

import { Provider } from 'react-redux';
import './assets/styles/bootstrap.custom.css';
import './assets/styles/style.css';
import { PrivateRouter } from './components/index.js';
import store from './store.js';

const router = createRouter(
  routes(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<Home />} />
      <Route path="/product/:id" element={<Product />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      {/* for privacy */}
      <Route path="" element={<PrivateRouter />}>
        <Route path="/shipping" element={<Shipping />} />
        <Route path="/payment" element={<Payment />} />
      </Route>
    </Route>,
  ),
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>,
);
