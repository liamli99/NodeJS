const Order = require('../models/Order');
const Product = require('../models/Product');
const { StatusCodes } = require('http-status-codes');
const { BadRequestError, NotFoundError } = require('../errors');
const checkPermission = require('../utils/checkPermission');

// POST /api/v1/orders
// The req.body only includes tax, shippingFee, and cartItems at first!
const createOrder = async (req, res) => {
  const { tax, shippingFee, cartItems } = req.body;
  
  if (!tax || !shippingFee || !cartItems || cartItems.length < 1) {
    throw new BadRequestError('Please provide tax, shipping fee, and cart items');
  }

  let cartItemsDB = [];
  let subtotal = 0;

  // We cannot trust the name, image, and price of cart items from frontend! We should find out the actual name, image, and price from the database!
  for (const item of cartItems) {
    const product = await Product.findOne({ _id: item.product });
    
    if (!product) {
      throw new NotFoundError(`Product with id ${item.product} Not Found`);
    }

    const { name, image, price } = product;
    const singleCartItem = { name, image, price, amount: item.amount, product: item.product };
    
    cartItemsDB = [...cartItemsDB, singleCartItem];
    subtotal += price * item.amount;
  }

  const total = tax + shippingFee + subtotal;
  
  const order = await Order.create(req.body);
  res.status(StatusCodes.CREATED).json({ order });
}

// GET /api/v1/orders
// Only admin can get all orders
const getAllOrders = async (req, res) => {
  res.send('get all orders');
}

// GET /api/v1/orders/:id
const getSingleOrder = async (req, res) => {
  res.send('get single order');
}

// PATCH /api/v1/orders/:id
const updateOrder = async (req, res) => {
  res.send('update');
}

// GET /api/v1/orders/showAllMyOrders
const getCurrentUserOrders = async (req, res) => {
  res.send('get current user orders');
}

module.exports = { getAllOrders, getSingleOrder, getCurrentUserOrders, createOrder, updateOrder };