const Destination = require('../models/Destination');
const APIFeatures = require('../utils/apiFeatures');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const { uploadDestinationImages, resizeDestinationImages } = require('../utils/upload');
exports.getAllDestinations = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(Destination.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const destinations = await features.query;

  res.status(200).json({
    status: 'success',
    results: destinations.length,
    data: {
      destinations
    }
  });
});

exports.getDestination = catchAsync(async (req, res, next) => {
  const destination = await Destination.findById(req.params.id);

  if (!destination) {
    return next(new AppError('No destination found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      destination
    }
  });
});

exports.createDestination = catchAsync(async (req, res, next) => {
  const destinationData = {
    name: req.body.name,
    description: req.body.description,
    images: req.body.images
  };

  const newDestination = await Destination.create(destinationData);

  res.status(201).json({
    status: 'success',
    data: {
      destination: newDestination
    }
  });
});

exports.updateDestination = catchAsync(async (req, res, next) => {
  const destination = await Destination.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  if (!destination) {
    return next(new AppError('No destination found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      destination
    }
  });
});

exports.deleteDestination = catchAsync(async (req, res, next) => {
  const destination = await Destination.findByIdAndDelete(req.params.id);

  if (!destination) {
    return next(new AppError('No destination found with that ID', 404));
  }

  res.status(204).json({
    status: 'success',
    data: null
  });
});