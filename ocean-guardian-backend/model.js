const mongoose = require('mongoose');

// User Schema
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Report Schema
const reportSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  reportedBy: {
    type: String,
    required: true
  },
  userEmail: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: [
      'Plastic Waste (Bottles, bags, wrappers)',
      'General Waste (Glass, metal, rubber, wood)',
      'Oil & Chemical Pollution (Spills, leaks)',
      'Water Pollution (Sewage, unusual color)',
      'Marine Wildlife Incident (Injured/Dead animals)',
      'Habitat Damage (Coral, Mangroves)',
      'Other'
    ],
    required: true
  },
  severity: {
    type: Number,
    enum: [1, 2, 3], // 1: Low, 2: Medium, 3: High
    required: true
  },
  description: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  coordinates: {
    latitude: {
      type: Number,
      required: true
    },
    longitude: {
      type: Number,
      required: true
    }
  },
  imageUrl: {
    type: String,
    default: null
  },
  status: {
    type: String,
    enum: ['submitted', 'under_review', 'resolved'],
    default: 'submitted'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

const User = mongoose.model('User', userSchema);
const Report = mongoose.model('Report', reportSchema);

module.exports = { User, Report };