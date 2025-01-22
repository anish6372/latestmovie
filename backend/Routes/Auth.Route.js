const express = require('express');
const router = express.Router();


const { SignUp, LogIn } = require('../Controllers/Auth.Controllers');


router.post('/signup', SignUp);


router.post('/login', LogIn);

module.exports = router;