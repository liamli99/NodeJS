const Order = require('../models/Order');
const Product = require('../models/Product');
const { StatusCodes } = require('http-status-codes');
const { BadRequestError, NotFoundError } = require('../errors');
const checkPermission = require('../utils/checkPermission');
const stripe = require('stripe')(process.env.STRIPE_KEY); 

// POST /api/v1/orders
// The req.body only includes tax, shippingFee, and orderItems at first!
const createOrder = async (req, res) => {
  const { tax, shippingFee, orderItems } = req.body;
  
  if (!tax || !shippingFee || !orderItems || orderItems.length < 1) {
    throw new BadRequestError('Please provide tax, shipping fee, and order items');
  }

  let orderItemsDB = [];
  let subtotal = 0;

  // We cannot trust the name, image, and price of order items from frontend! We should find out the actual name, image, and price from the database!
  for (const item of orderItems) {
    const product = await Product.findOne({ _id: item.product });
    
    if (!product) {
      throw new NotFoundError(`Product with id ${item.product} Not Found`);
    }

    const { name, image, price } = product;
    const singleOrderItem = { name, image, price, amount: item.amount, product: item.product };
    
    orderItemsDB = [...orderItemsDB, singleOrderItem];
    subtotal += price * item.amount;
  }

  const total = tax + shippingFee + subtotal;

  const paymentIntent = await stripe.paymentIntents.create({
    amount: total,
    currency: "usd"
  });
  
  const order = await Order.create({
    tax,
    shippingFee,
    subtotal,
    total,
    orderItems: orderItemsDB,
    user: req.user.userId,
    clientSecret: paymentIntent.client_secret
  });

  res.status(StatusCodes.CREATED).json({ order });
}

// GET /api/v1/orders
// Only admin can get all orders
const getAllOrders = async (req, res) => {
  const orders = await Order.find({});

  res.status(StatusCodes.OK).json({ orders, count: orders.length });
}

// GET /api/v1/orders/:id
// Only admin or user himself can get his order!
const getSingleOrder = async (req, res) => {
  const { id } = req.params;
  const order = await Order.findOne({ _id: id });

  if (!order) {
    throw new NotFoundError('Order Not Found');
  }

  // Only admin or user himself can get his order!
  checkPermission(req.user, order.user);

  res.status(StatusCodes.OK).json({ order });
}

// PATCH /api/v1/orders/:id
// Only admin or user himself can update his order's status and paymentIntentId! The request body only needs to include paymentIntentId and status will be set to 'paid'!
const updateOrder = async (req, res) => {
  const { id } = req.params;
  const order = await Order.findOneAndUpdate({ _id: id }, { 
    status: 'paid', 
    paymentIntentId: req.body.paymentIntentId 
  }, {
    new: true, 
    runValidators: true 
  });

  if (!order) {
    throw new NotFoundError('Order Not Found');
  }

  // Only admin or user himself can update his order!
  checkPermission(req.user, order.user);

  res.status(StatusCodes.OK).json({ order });
}

// GET /api/v1/orders/showAllMyOrders
const getCurrentUserOrders = async (req, res) => {
  const orders = await Order.find({ user: req.user.userId });

  res.status(StatusCodes.OK).json({ orders, count: orders.length });
}

module.exports = { getAllOrders, getSingleOrder, getCurrentUserOrders, createOrder, updateOrder };