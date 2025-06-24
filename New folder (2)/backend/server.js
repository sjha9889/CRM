const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const app = express()
connectDB();

app.use(express.json()); // For parsing application/json
app.use(express.urlencoded({ extended: true }));
const authRouter = require('./routes/authRoutes');
const userRouter = require('./routes/userRoutes');
const companyRouter= require('./routes/companyRoutes');
app.get("/", (req, res) => {
  res.send("Welcome to CRM services ");
});
const corsOptions = {
  origin: ['http://localhost:3001', 'http://localhost:5173','http://localhost:3002','http://localhost:3000',], // Array of allowed origins
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization'],
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  exposedHeaders: ['Content-Length', 'X-Foo', 'X-Bar']
};
app.use(cors(corsOptions));
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);     
app.use('/api/v1/companies', companyRouter);

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
