const express = require('express');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const { protect, restrictTo } = require('../middleware/auth');
const authMiddleware = require('../middleware/auth');
const router = express.Router();

// This route should be accessible to any authenticated user
//router.get('/me', authController.protect, authController.getMe);

// All routes below this will require admin role
//router.use(protect);
//router.use(restrictTo('admin'));

router
  .route('/')
  .get(userController.getAllUsers);
router.patch('/update-password', authMiddleware.protect, authController.updatePassword);
router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;