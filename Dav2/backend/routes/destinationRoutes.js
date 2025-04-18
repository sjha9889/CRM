const express = require('express');
const destinationController = require('../controllers/destinationController');
const { uploadDestinationImages, resizeDestinationImages } = require('../utils/destinationMulter');
const authController = require('../controllers/authController');
const { protect, restrictTo } = require('../middleware/auth');

const router = express.Router();

router
  .route('/')
  .get(destinationController.getAllDestinations)
  .post(
    protect,
    restrictTo('admin'),
    uploadDestinationImages,
    resizeDestinationImages,
    destinationController.createDestination
  );

router
  .route('/:id')
  .get(destinationController.getDestination)
  .patch(
    protect,
    restrictTo('admin'),
    uploadDestinationImages,
    resizeDestinationImages,
    destinationController.updateDestination
  )
  .delete(
    protect,
    restrictTo('admin'),
    destinationController.deleteDestination
  );

module.exports = router;

module.exports = router;