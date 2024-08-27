const express = require('express');
const router = express.Router();

const { getAllOrders, getSingleOrder, getCurrentUserOrders, createOrder, updateOrder } = require('../controllers/orderController');

const authentication = require('../middleware/authentication');
const authorization = require('../middleware/authorization');

// /api/v1/orders
router.route('/')
  .get(authentication, authorization(['admin']), getAllOrders)
  .post(authentication, createOrder);

// /api/v1/orders/showAllMyOrders
router.route('/showAllMyOrders').get(authentication, getCurrentUserOrders);

// /api/v1/orders/:id
router.route('/:id')
  .get(authentication, getSingleOrder)
  .patch(authentication, updateOrder);

module.exports = router;