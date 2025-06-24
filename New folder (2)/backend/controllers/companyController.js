const Company = require('../models/Company');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const APIFeatures = require('../utils/apiFeatures');

exports.getAllCompanies = catchAsync(async (req, res, next) => {
  // 1) Filtering
  const features = new APIFeatures(Company.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  
  // 2) Execute query
  const companies = await features.query;

  res.status(200).json({
    status: 'success',
    results: companies.length,
    data: {
      companies
    }
  });
});

exports.getCompany = catchAsync(async (req, res, next) => {
  const company = await Company.findById(req.params.id);

  if (!company) {
    return next(new AppError('No company found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      company
    }
  });
});

exports.createCompany = catchAsync(async (req, res, next) => {
  const newCompany = await Company.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      company: newCompany
    }
  });
});

exports.updateCompany = catchAsync(async (req, res, next) => {
  const company = await Company.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  if (!company) {
    return next(new AppError('No company found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      company
    }
  });
});

exports.deleteCompany = catchAsync(async (req, res, next) => {
  const company = await Company.findByIdAndDelete(req.params.id);

  if (!company) {
    return next(new AppError('No company found with that ID', 404));
  }

  res.status(204).json({
    status: 'success',
    data: null
  });
});

exports.upgradePlan = catchAsync(async (req, res, next) => {
  const { planName, planType } = req.body;
  
  const company = await Company.findByIdAndUpdate(
    req.params.id,
    { 
      'plan.name': planName,
      'plan.type': planType
    },
    {
      new: true,
      runValidators: true
    }
  );

  if (!company) {
    return next(new AppError('No company found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      company
    }
  });
});