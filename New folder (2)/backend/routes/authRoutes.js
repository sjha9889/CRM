// routes/authRoutes.js
const express = require('express');
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.get('/me', authMiddleware.protect, authController.getMe); // Add this line
router.post('/logout', authController.logout);// Add this line
router.post('/restrictTo', authController.restrictTo);
router.patch('/update-password', authMiddleware.protect, authController.updatePassword);
module.exports = router;