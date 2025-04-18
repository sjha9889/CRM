const Package = require('../models/Package');
const APIFeatures = require('../utils/apiFeatures');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.createPackage = catchAsync(async (req, res, next) => {
  const packageData = {
    Package_name: req.body.Package_name,
    Package_type: req.body.Package_type,
    Package_location: req.body.Package_location,
    Package_price: req.body.Package_price,
    Package_feature: req.body.Package_feature,
    address: req.body.address,
    imageCover: req.file ? req.file.filename : undefined
  };

  const newPackage = await Package.create(packageData);

  res.status(201).json({
    status: 'success',
    data: {
      package: newPackage
    }
  });
});

exports.getAllPackages = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(Package.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const packages = await features.query;

  res.status(200).json({
    status: 'success',
    results: packages.length,
    data: {
      packages
    }
  });
});

exports.getPackage = catchAsync(async (req, res, next) => {
  const package = await Package.findById(req.params.id);

  if (!package) {
    return next(new AppError('No package found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      package
    }
  });
});

exports.updatePackage = catchAsync(async (req, res, next) => {
  const package = await Package.findByIdAndUpdate(
    req.params.id,
    {
      Package_name: req.body.Package_name,
      Package_type: req.body.Package_type,
      Package_location: req.body.Package_location,
      Package_price: req.body.Package_price,
      Package_feature: req.body.Package_feature,
      address: req.body.address,
      imageCover: req.file ? req.file.filename : undefined
    },
    {
      new: true,
      runValidators: true
    }
  );

  if (!package) {
    return next(new AppError('No package found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      package
    }
  });
});

exports.deletePackage = catchAsync(async (req, res, next) => {
  const package = await Package.findByIdAndDelete(req.params.id);

  if (!package) {
    return next(new AppError('No package found with that ID', 404));
  }

  res.status(204).json({
    status: 'success',
    data: null
  });
});