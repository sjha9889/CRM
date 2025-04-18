const Booking = require('../models/Booking');
const Package = require('../models/Package');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.getAllBookings = catchAsync(async (req, res, next) => {
  const bookings = await Booking.find();

  res.status(200).json({
    status: 'success',
    results: bookings.length,
    data: {
      bookings
    }
  });
});

exports.getBooking = catchAsync(async (req, res, next) => {
  const booking = await Booking.findById(req.params.id);

  if (!booking) {
    return next(new AppError('No booking found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      booking
    }
  });
});

exports.createBooking = catchAsync(async (req, res, next) => {
  const package = await Package.findById(req.body.package);
  if (!package) return next(new AppError('No package found with that ID', 404));

  const booking = await Booking.create({
    package: req.body.package,
    user: req.user.id,
    price: package.price
  });

  res.status(201).json({
    status: 'success',
    data: {
      booking
    }
  });
});

exports.updateBooking = catchAsync(async (req, res, next) => {
  const booking = await Booking.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  if (!booking) {
    return next(new AppError('No booking found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      booking
    }
  });
});

exports.deleteBooking = catchAsync(async (req, res, next) => {
  const booking = await Booking.findByIdAndDelete(req.params.id);

  if (!booking) {
    return next(new AppError('No booking found with that ID', 404));
  }

  res.status(204).json({
    status: 'success',
    data: null
  });
});