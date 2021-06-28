require("dotenv").config();
const cloudinary = require("cloudinary").v2;
console.log(process.env.CLOUDINARY_API_SECRET);
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

module.exports = { cloudinary };
