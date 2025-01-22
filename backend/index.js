const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const authRoutes = require('./Routes/Auth.Route');




const app = express();
const port = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());


 const uri = 'mongodb+srv://anish:anish1234@cluster0.3pbpv.mongodb.net/todoList'

mongoose.connect(uri,);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
});


app.use('/api', authRoutes);







app.get('/', (req, res) => {
  res.send('Hello World!');
});


app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});