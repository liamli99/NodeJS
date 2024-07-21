const express = require('express');
const router = express.Router();

const { createProduct, getAllProducts } = require('../controllers/productController');
const { uploadProductImageLocal, uploadProductImageCloud } = require('../controllers/uploadsController');

// /api/v1/products
router.route('/').get(getAllProducts).post(createProduct);
// /api/v1/products/uploads
// router.route('/uploads').post(uploadProductImageLocal);
router.route('/uploads').post(uploadProductImageCloud);

module.exports = router;