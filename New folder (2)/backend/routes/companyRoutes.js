const express = require('express');
const companyController = require('../controllers/companyController');
const authController = require('../controllers/authController');

const router = express.Router();

// Protect all routes after this middleware
router.use(authController.protect);

// Restrict to admin for the following routes
router.use(authController.restrictTo('admin'));

router
  .route('/')
  .get(companyController.getAllCompanies)
  .post(companyController.createCompany);

router
  .route('/:id')
  .get(companyController.getCompany)
  .patch(companyController.updateCompany)
  .delete(companyController.deleteCompany);

router
  .route('/:id/upgrade-plan')
  .patch(companyController.upgradePlan);

module.exports = router;