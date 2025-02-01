const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./Routes/Auth.Route');
const movieRoutes = require('./Routes/Movie.Route');
const editRoutes= require('./Routes/Edit.Route');
const deleteRoutes= require('./Routes/Delete.Route')
// const multer = require('multer');

dotenv.config();


const app = express();
const port = process.env.PORT || 8000;


app.use(express.json()); // For handling JSON data
app.use(express.urlencoded({ extended: true }));

app.use(cors({
  origin: 'http://localhost:3000', // Frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json());
// app.use('/api', movieRoutes);

// MongoDB connection
const uri = process.env.MONGO_URI || 'mongodb+srv://anishpanda3:anish123@anish.bigfp.mongodb.net/movies';
mongoose.connect(uri, { });
const connection = mongoose.connection;

connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
});

// Local file storage setup
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'uploads/');  // Save files in the 'uploads' directory
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + '-' + file.originalname); // Unique file name
//   },
// });

// const upload = multer({ storage });

// Routes
app.use('/api/auth', authRoutes);
app.use('/api', movieRoutes);
// app.use('/api', editRoutes); 
app.use('/api', deleteRoutes);

// Basic route
app.get('/', (req, res) => {
  res.send('Welcome to the Movie API!');
});

// Movie upload route
// app.post('/api/upload', upload.single('poster'), (req, res) => {
//   if (!req.file) {
//     return res.status(400).json({ error: 'No file uploaded' });
//   }

//   const fileUrl = `http://localhost:8000/uploads/${req.file.filename}`;  // Local file URL
//   res.status(200).json({ message: 'File uploaded successfully', fileUrl });
// });

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
