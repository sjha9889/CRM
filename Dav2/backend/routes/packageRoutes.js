// routes/packageRoutes.js
const express = require('express');
const packageController = require('../controllers/packageController');
const authController = require('../controllers/authController');
const { protect, restrictTo } = require('../middleware/auth');
const { uploadPackageImages, resizePackageImages } = require('../utils/upload');
const cors = require('cors');
const router = express.Router();

//router.options('*', cors());

router
  .route('/')
  .get(packageController.getAllPackages)
  .post(
    protect,
    restrictTo('admin'),
    uploadPackageImages,
    resizePackageImages,
    packageController.createPackage
  );

router
  .route('/:id')
  .get(packageController.getPackage)
  .patch(
    protect,
    restrictTo('admin'),
    uploadPackageImages,
    resizePackageImages,
    packageController.updatePackage
  )
  .delete(
    protect,
    restrictTo('admin'),
    packageController.deletePackage
  );

module.exports = router;