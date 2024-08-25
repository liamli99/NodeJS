const express = require('express');
const router = express.Router();

const { createProduct, getAllProducts, getSingleProduct, updateProduct, deleteProduct, uploadImage } = require('../controllers/productController');

const authorization = require('../middleware/authorization');

router.route('/')

module.exports = router;