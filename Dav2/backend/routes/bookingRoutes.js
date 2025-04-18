const express = require('express');
const bookingController = require('../controllers/bookingController');
const authController = require('../controllers/authController');
const { protect, restrictTo } = require('../middleware/auth');

const router = express.Router();

router.use(protect);

router
  .route('/')
  .get(restrictTo('admin'), bookingController.getAllBookings)
  .post(bookingController.createBooking);

router
  .route('/:id')
  .get(bookingController.getBooking)
  .patch(restrictTo('admin'), bookingController.updateBooking)
  .delete(restrictTo('admin'), bookingController.deleteBooking);

module.exports = router;