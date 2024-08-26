const express = require('express');
const router = express.Router();

const { createProduct, getAllProducts, getSingleProduct, updateProduct, deleteProduct, uploadImage } = require('../controllers/productController');

const authentication = require('../middleware/authentication');
const authorization = require('../middleware/authorization');

// /api/v1/products
router.route('/')
  .get(getAllProducts)
  .post(authentication, authorization(['admin']), createProduct);

// /api/v1/products/uploadImage
router.route('/uploadImage')
  .post(authentication, authorization(['admin']), uploadImage);

// /api/v1/products/:id
router.route('/:id')
  .get(getSingleProduct)
  .patch(authentication, authorization(['admin']), updateProduct)
  .delete(authentication, authorization(['admin']), deleteProduct);

module.exports = router;