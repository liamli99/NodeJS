const mongoose = require('mongoose');

// Nested Schema!
const SingleCartItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  product: {
    type: mongoose.Types.ObjectId,
    ref: 'Product',
    required: true
  }
})

const OrderSchema = new mongoose.Schema({
  tax: {
    type: Number,
    required: [true, 'Tax is required'],
  },
  shippingFee: {
    type: Number,
    required: [true, 'Shipping fee is required'],
  },
  // total amount of money
  subtotal: {
    type: Number,
    required: [true, 'Subtotal is required'],
  },
  // total = tax + shippingFee + subtotal
  total: {
    type: Number,
    required: [true, 'Total is required'],
  },
  cartItems: {
    type: [SingleCartItemSchema],
    required: [true, 'Cart item is required']
  },
  status: {
    type: String,
    enum: ['pending', 'failed', 'paid', 'delivered', 'canceled'],
    default: 'pending'
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: [true, 'User is required']
  },
  clientSecret: {
    type: String,
    required: [true, 'Client secret is required']
  },
  paymentIntentId: {
    type: String,
    required: [true, 'Payment intent ID is required']
  }
}, { timestamps: true });

module.exports = mongoose.model('Order', OrderSchema);