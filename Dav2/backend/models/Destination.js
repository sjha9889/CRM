const mongoose = require('mongoose');

const destinationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A destination must have a name'],
    unique: true,
    trim: true
  },
  description: {
    type: String,
    required: [true, 'A destination must have a description'],
    trim: true
  },

  images: [String],
  packages: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Package'
    }
  ]
});

destinationSchema.index({ location: '2dsphere' });

const Destination = mongoose.model('Destination', destinationSchema);
module.exports = Destination;