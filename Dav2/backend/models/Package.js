const mongoose = require('mongoose');

const packageSchema = new mongoose.Schema({
  Package_name: {
    type: String,
    required: [true, 'Package name is required'],
    sparse: true,
    trim: true,
    
    minlength: [3, 'Package name must be at least 3 characters'],
    maxlength: [50, 'Package name cannot exceed 50 characters']
  },
  Package_type: {
    type: String,
    required: [true, 'Package type is required'],
    enum: ['Adventure', 'Honeymoon', 'Family', 'Solo', 'Luxury']
  },
  Package_location: {
    type: String,
    required: [true, 'Location is required'],
    enum: ['Goa', 'Manali', 'Jaipur', 'Kerala', 'Andaman']
  },
  Package_price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [0, 'Price cannot be negative']
  },
  Package_feature: {
    type: String,
    required: [true, 'Main feature is required'],
    trim: true
  },
  address: {
    type: String,
    required: [true, 'Description is required'],
    trim: true
  },
  imageCover: {
    type: String,
    default: 'default-cover.jpg'
  }
}, {
  timestamps: true // Adds createdAt and updatedAt fields
});

// Create compound index for better query performance
packageSchema.index({ Package_location: 1, Package_type: 1 },
  { 
    unique: true,
    partialFilterExpression: { Package_name: { $exists: true } }
  });


const Package = mongoose.model('Package', packageSchema);

module.exports = Package;