/* eslint-disable no-unused-vars */
import { asyncHandler } from '../middleware/asyncHandler.js';
import { Order } from '../models/order.model.js';

// @desc -> create new order
// @route -> POST 'api/orders'
// @access -> private
const addOrderItems = asyncHandler(async (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept',
  );
  res.send('add order items');
  next();
});

// @desc -> get orders for logged-in user
// @route -> GET 'api/orders/myorders'
// @access -> private
const getMyOrders = asyncHandler(async (req, res) => {
  res.send('add order items');
});

// @desc -> get order by id
// @route -> GET 'api/orders/:id'
// @access -> private/admin
const getOrder = asyncHandler(async (req, res) => {
  res.send('get specific order');
});

// @desc -> update order to paid
// @route -> PUT 'api/orders/:id/paid'
// @access -> private
const updateOrderToPaid = asyncHandler(async (req, res) => {
  res.send('update order to paid');
});

// @desc -> update order to delivered
// @route -> PUT 'api/orders/:id/delivered'
// @access -> private/admin
const updateOrderToDelivered = asyncHandler(async (req, res) => {
  res.send('update order to delivered');
});

// @desc -> update order to delivered
// @route -> GET 'api/orders/'
// @access -> private/admin
const getOrders = asyncHandler(async (req, res) => {
  res.send('get all orders');
});

export {
  addOrderItems,
  getMyOrders,
  getOrder,
  updateOrderToDelivered,
  updateOrderToPaid,
  getOrders,
};
