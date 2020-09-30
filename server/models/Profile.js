const mongoose = require('mongoose');
const slugify = require('slugify');
const geocoder = require('../utils/geocoder');
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
      address: String,
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

// Geocode and Create Location Field
// the two required fields to have a GeoJSON point are the type and coordinates
ProfileSchema.pre('save', async function (next) {
  let loc;

  if (this.address !== undefined) {
    loc = await geocoder.geocode(this.address);

    this.location = {
      type: 'Point',
      coordinates: [loc[0].longitude, loc[0].latitude],
      formattedAddress: loc[0].formattedAddress,
      street: loc[0].streetName,
      city: loc[0].city,
      state: loc[0].administrativeLevels.level1short,
      zipcode: loc[0].zipcode,
      country: loc[0].countryCode,
    };

    // Do not save address in DB because we will have the formatted address from the location field
    this.address = undefined;
  }
  next();
});

module.exports = mongoose.model('Profile', ProfileSchema);
