const Review = require('../models/Review');
const Product = require('../models/Product');
const { StatusCodes } = require('http-status-codes');
const { NotFoundError } = require('../errors');
const checkPermission = require('../utils/checkPermission');

// POST /api/v1/reviews
// A user creates a review for a product. A user can only leave one review per product, see models/review.js!
const createReview = async (req, res) => {
  const { product: productId } = req.body;
  const product = await Product.findOne({ _id: productId });

  if (!product) {
    throw new NotFoundError('Product Not Found');
  }

  req.body.user = req.user.userId;
  const review = await Review.create(req.body);
    
  res.status(StatusCodes.CREATED).json({ review });
}

// GET /api/v1/reviews
const getAllReviews = async (req, res) => {
  // Populate: https://mongoosejs.com/docs/populate.html
  // Review model has a product field, which is ObjectId and reference to Product model, so that we can reference documents in products collection! Now each review's product is an object with product's name, price, and company!
  const reviews = await Review.find({}).populate({
    path: 'product',
    select: 'name price company'
  });

  res.status(StatusCodes.OK).json({ reviews, count: reviews.length });
}

// GET /api/v1/reviews/:id
const getSingleReview = async (req, res) => {
  const { id } = req.params;
  const review = await Review.findOne({ _id: id });

  if (!review) {
    throw new NotFoundError('Review Not Found');
  }

  res.status(StatusCodes.OK).json({ review });
}

// PATCH /api/v1/reviews/:id
// Only admin or user himself can update his review's rating, title, and comment!
const updateReview = async (req, res) => {
  const { id } = req.params;
  const review = await Review.findOne({ _id: id });

  if (!review) {
    throw new NotFoundError('Review Not Found');
  }

  // Only admin or user himself can delete his review!
  checkPermission(req.user, review.user);

  // Here we use save instead of findOneAndUpdate because save can trigger post save middleware in models/Review.js to calculate and update average rating and number of reviews for the product after saving the review to database!!!
  review.rating = req.body.rating;
  review.title = req.body.title;
  review.comment = req.body.comment;
  await review.save();

  res.status(StatusCodes.OK).json({ review });
}

// DELETE /api/v1/reviews/:id
// Only admin or user himself can delete his review!
const deleteReview = async (req, res) => {
  const { id } = req.params;
  const review = await Review.findOne({ _id: id });

  if (!review) {
    throw new NotFoundError('Review Not Found');
  }

  // Only admin or user himself can delete his review!
  checkPermission(req.user, review.user);

  // Here we use deleteOne instead of findOneAndDelete because deleteOne can trigger post deleteOne middleware in models/Review.js to calculate and update average rating and number of reviews for the product after deleting the review!
  await review.deleteOne();

  res.status(StatusCodes.OK).json({ review });
}

module.exports = { createReview, getAllReviews, getSingleReview, updateReview, deleteReview };