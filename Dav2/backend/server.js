const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cookieParser = require('cookie-parser');
const path = require('path');
//const cors = require('cors');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./middleware/error');
const connectDB = require('./config/db');
const app = express()
connectDB();
// Routers
const authRouter = require('./routes/authRoutes');
const userRouter = require('./routes/userRoutes');
const packageRouter = require('./routes/packageRoutes');
const destinationRouter = require('./routes/destinationRoutes');
const bookingRouter = require('./routes/bookingRoutes');
// Remove all other routes and middleware

const corsOptions = {
  origin: 'http://localhost:5173',
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization'],
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  exposedHeaders: ['Content-Length', 'X-Foo', 'X-Bar']
};


process.on('uncaughtException', err => {
    console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
    console.log(err.name, err.message);
    process.exit(1);
  });
  
  app.use(helmet());

  app.use(cors(corsOptions));
  // Development logging
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
  }

  const limiter = rateLimit({
      max: 100,
      windowMs: 60 * 60 * 1000,
      message: 'Too many requests from this IP, please try again in an hour!'
    });
    app.use('/api', limiter);
    // Handle preflight requests
//app.options('*', cors(corsOptions));
    
    app.use(express.json({ limit: '10kb' }));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
//app.use(mongoSanitize());
//app.use(xss());
app.get("/", (req, res) => {
  res.send("Welcome to the Tour & Travel API");
});
// Prevent parameter pollution
app.use(hpp({
    whitelist: [
      'duration',
      'ratingsQuantity',
      'ratingsAverage',
      'maxGroupSize',
      'difficulty',
      'price'
    ]
  }));
  
  // Error handling middleware
app.use((err, req, res, next) => {
  console.error('ERROR 💥', err.stack);
  
  // Always return JSON, even for errors
  res.status(err.statusCode || 500).json({
    status: 'error',
    message: err.message || 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
});
  app.use(express.static('public'));

  app.use((req, res, next) => {
      req.requestTime = new Date().toISOString();
      next();
    });
    app.use('/api/v1/auth', authRouter);
    app.use('/api/v1/users', userRouter);
    app.use('/api/v1/packages', packageRouter);
    app.use('/api/v1/destinations', destinationRouter);
    app.use('/api/v1/bookings', bookingRouter);
    
const server = app.listen(process.env.PORT || 3000, () => {
  console.log(`App running on port ${process.env.PORT}...`);
});

process.on('unhandledRejection', err => {
  console.log('UNHANDLED REJECTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});

module.exports = app;



