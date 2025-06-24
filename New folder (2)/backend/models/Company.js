const mongoose = require('mongoose');
const validator = require('validator');

const companySchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: [true, 'Company name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email']
  },
  accountURL: {
    type: String,
    required: [true, 'Account URL is required'],
    unique: true
  },
  phoneNumber: {
    type: String,
    required: [true, 'Phone number is required']
  },
  website: String,
  address: String,
  plan: {
    name: {
      type: String,
      enum: ['Basic', 'Advanced', 'Enterprise'],
      default: 'Basic'
    },
    type: {
      type: String,
      enum: ['Monthly', 'Yearly'],
      default: 'Monthly'
    }
  },
  currency: {
    type: String,
    enum: ['Dollar', 'Euro', 'Pound', 'Rupee'],
    default: 'Dollar'
  },
  language: {
    type: String,
    enum: ['English', 'Arabic', 'French', 'German'],
    default: 'English'
  },
  status: {
    type: String,
    enum: ['Active', 'Inactive'],
    default: 'Active'
  },
  image: {
    type: String,
    default: 'default-company.jpg'
  },
  createdDate: {
    type: Date,
    default: Date.now
  },
  permissions: {
    view: { type: Boolean, default: false },
    update: { type: Boolean, default: false },
    create: { type: Boolean, default: false },
    read: { type: Boolean, default: false }
  }
});

// Add indexes for better query performance
companySchema.index({ companyName: 1 });
companySchema.index({ email: 1 });
companySchema.index({ status: 1 });

const Company = mongoose.model('Company', companySchema);

module.exports = Company;