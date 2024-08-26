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
  const reviews = await Review.find({});

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

  // Here we use save instead of findOneAndUpdate because save can trigger pre middleware in models/User.js to hash the password before saving it to database!!!
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

  // Here we use deleteOne instead of findOneAndDelete because deleteOne can trigger pre middleware in models/User.js to hash the password before saving it to database!!!
  await review.deleteOne();

  res.status(StatusCodes.OK).json({ review });
}

module.exports = { createReview, getAllReviews, getSingleReview, updateReview, deleteReview };