const Product = require('../models/Product');
const { StatusCodes } = require('http-status-codes');
const { NotFoundError, BadRequestError } = require('../errors');
const path = require('path');

// POST /api/v1/products
// Only admin can create product
const createProduct = async (req, res) => {
  req.body.user = req.user.userId;
  const product = await Product.create(req.body);
    
  res.status(StatusCodes.CREATED).json({ product });
}

// GET /api/v1/products
const getAllProducts = async (req, res) => {
  const products = await Product.find({});

  res.status(StatusCodes.OK).json({ products, count: products.length });
}

// GET /api/v1/products/:id
const getSingleProduct = async (req, res) => {
  const { id } = req.params;
  const product = await Product.findOne({ _id: id });

  if (!product) {
    throw new NotFoundError('Product Not Found');
  }

  res.status(StatusCodes.OK).json({ product });
}

// PATCH /api/v1/products/:id
// Only admin can update product
const updateProduct = async (req, res) => {
  const { id } = req.params;
  const product = await Product.findOneAndUpdate({ _id: id }, req.body, {
    new: true, 
    runValidators: true
  });

  if (!product) {
    throw new NotFoundError('Product Not Found');
  }

  res.status(StatusCodes.OK).json({ product });
}

// DELETE /api/v1/products/:id
// Only admin can delete product
const deleteProduct = async (req, res) => {
  const { id } = req.params;
  const product = await Product.findOneAndDelete({ _id: id });

  if (!product) {
    throw new NotFoundError('Product Not Found');
  }

  // Here we use remove instead of findOneAndDelete because remove can trigger pre middleware in models/User.js to hash the password before saving it to database!!!

  res.status(StatusCodes.OK).json({ product });
}

// POST /api/v1/products/uploadImage
// Only admin can upload image
// For this project, we save the uploaded file to local (../public/uploads)! To upload a file via Postman, we can go to Body -> form-data -> Key (choose 'File', name is 'image'), Value (Select file from local machine) 
const uploadImage = async (req, res) => {
  if (!req.files) {
    throw new BadRequestError('No File Uploaded');
  }

  const productImage = req.files.image;

  if (!productImage.mimetype.startsWith('image')) {
      throw new BadRequestError('Please Upload Image');
  }
  if (productImage.size > 1024 * 1024) {
      throw new BadRequestError('Please Upload Image Smaller Than 1MB');
  }

  const imagePath = path.join(__dirname, '../public/uploads/' + `${productImage.name}`);
  await productImage.mv(imagePath);

  // Send the image url back as response, we will use it as 'image' field when creating the product!
  // Note that the url is not '/public/uploads/...' becasue app.js serves static files from public directory!
  res.status(StatusCodes.OK).json({ image: `/uploads/${productImage.name}` });
}

module.exports = { createProduct, getAllProducts, getSingleProduct, updateProduct, deleteProduct, uploadImage };