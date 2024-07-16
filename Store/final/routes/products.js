const express = require('express');
const router = express.Router();

const { getAllProductsTest, getAllProducts } = require('../controllers/products');

// /api/v1/products/test
router.route('/test').get(getAllProductsTest);
// /api/v1/products
router.route('/').get(getAllProducts);

module.exports = router;