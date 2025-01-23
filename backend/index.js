const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./Routes/Auth.Route');
const movieRoutes = require('./Routes/Movie.Route');
const { v2: cloudinary } = require('cloudinary'); 
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary'); 

dotenv.config();

const app = express();
const port = process.env.PORT || 8001;


app.use(cors());
app.use(express.json());
app.use('/api', movieRoutes);


const uri = process.env.MONGO_URI || 'mongodb+srv://anishpanda3:anish123@anish.bigfp.mongodb.net/movies';
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const connection = mongoose.connection;

connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
});


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'movies', 
    allowed_formats: ['jpg', 'png', 'jpeg'], 
  },
});

const upload = multer({ storage }); 

// Routes
app.use('/api/auth', authRoutes); 
app.use('/api/movies', upload.single('poster'), movieRoutes); 


app.get('/', (req, res) => {
  res.send('Welcome to the Movie API!');
});


app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
