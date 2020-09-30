const mongoose = require('mongoose');
const slugify = require('slugify');
const ProfileSchema = new mongoose.Schema({
  bio: {
    type: String,
    maxlength: [500, 'The description cannot be more than 500 characters'],
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
    },
    coordinates: {
      type: [Number],
      index: '2dsphere',
    },
    formattedAddress: String,
    street: String,
    city: String,
    state: String,
    zipcode: String,
    country: String,
  },
  website: String,
  company: String,
  slug: String,
  address: String,
  github: String,
  technologies: [String],
  features: [String],
  experience: [
    {
      title: {
        type: String,
        lowercase: true,
        required: true,
      },
      company: {
        type: String,
        lowercase: true,
        required: true,
      },
      from: {
        type: Date,
        required: true,
      },
      to: Date,
      current: {
        type: Boolean,
        default: false,
      },
      location: {
        type: {
          type: String,
          enum: ['Point'],
        },
        coordinates: {
          type: [Number],
          index: '2dsphere',
        },
        formattedAddress: String,
        street: String,
        city: String,
        state: String,
        zipcode: String,
        country: String,
      },
      description: String,
    },
  ],
  social: {
    youtube: String,
    twitter: String,
    facebook: String,
    linkedin: String,
    instagram: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
});

// Prevent users from creating more than one profile
ProfileSchema.index({ user: 1 }, { unique: true });

module.exports = mongoose.model('Profile', ProfileSchema);
