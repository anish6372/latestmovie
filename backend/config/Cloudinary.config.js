

const { v2: cloudinary } = require('cloudinary');
require('dotenv').config(); 


export cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'dohajvmjw',
  api_key: process.env.CLOUDINARY_API_KEY || '549381837364977',
  api_secret: process.env.CLOUDINARY_API_SECRET || '88YpmyGAVJmqz-fpYO7soQzXlqw',
});


