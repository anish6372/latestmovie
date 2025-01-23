// config/cloudinaryConfig.js

const { v2: cloudinary } = require('cloudinary');
require('dotenv').config(); // Ensure dotenv is used to load environment variables

// Cloudinary configuration with your credentials from .env file
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

module.exports = cloudinary; // Export Cloudinary instance to use in other files
