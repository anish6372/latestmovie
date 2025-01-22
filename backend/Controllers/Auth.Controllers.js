const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../Models/UserModel'); 

const SignUp = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
   
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

   
    user = new User({
      name,
      email,
      password,
      role
    });

    
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    
    await user.save();

    res.status(201).json({ msg: 'User registered successfully', role: user.role });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

const LogIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

   
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    
    const payload = {
      user: {
        id: user.id,email
      }
    };

    
    jwt.sign(
      payload,
      'your_jwt_secret', 
      { expiresIn: '1d' },
      (err, token) => {
        if (err) throw err;
        res.json({ token, role: user.role });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

module.exports = { SignUp, LogIn };