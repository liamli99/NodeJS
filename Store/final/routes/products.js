const express = require('express');
const router = express.Router();

const { getAllProductsStatic, getAllProducts } = require('../controllers/products');

// /api/v1/products/static
router.route('/static').get(getAllProductsStatic);
// /api/v1/products
router.route('/').get(getAllProducts);

module.exports = router;