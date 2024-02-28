import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  Route,
  RouterProvider,
  createBrowserRouter as createRouter,
  createRoutesFromElements as routes,
} from 'react-router-dom';
import App from './App.jsx';
import { Home, Product } from './screen/index.js';

import './assets/styles/bootstrap.custom.css';
import './assets/styles/style.css';

const router = createRouter(
  routes(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<Home />} />
      <Route path="/product/:id" element={<Product />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);
