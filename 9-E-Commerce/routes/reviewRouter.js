const express = require('express');
const router = express.Router();

const { createReview, getAllReviews, getSingleReview, updateReview, deleteReview } = require('../controllers/reviewController');

const authentication = require('../middleware/authentication');

// /api/v1/reviews
router.route('/')
  .get(getAllReviews)
  .post(authentication, createReview);


// /api/v1/reviews/:id
router.route('/:id')
  .get(getSingleReview)
  .patch(authentication, updateReview)
  .delete(authentication, deleteReview);

module.exports = router;