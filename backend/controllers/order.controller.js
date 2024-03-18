/* eslint-disable no-unused-vars */
import { asyncHandler } from '../middleware/asyncHandler.js';
import { Order } from '../models/order.model.js';

// @desc -> create new order
// @route -> POST 'api/orders'
// @access -> private
const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error('No order Items');
  } else {
    const order = new Order({
      orderItems: orderItems.map((order) => ({
        ...order,
        product: order._id,
        _id: undefined,
      })),
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });

    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  }
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
  const order = await Order.findById(req.params.id).populate(
    'user',
    'name email',
  );
  if (order) {
    res.status(200).json(order);
  } else {
    res.status(404);
    throw new Error('Order not find');
  }
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
