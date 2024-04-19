const bcrypt = require('bcrypt');
const User = require('../schema/AuthSchema');
const jwt = require('jsonwebtoken');
const error = require('../../middleware/middleware');

exports.register = async (req, res) => {
  try{
    const {password, ...rest} = req.body;

    const existUserEmail = await User.findOne({email: rest.email});
    if(existUserEmail){
      return res.status(400).json({message: 'email has already taken'});
    }

    const existUserUN = await User.findOne({username: rest.username});
    if(existUserUN){
      return res.status(400).json({message: 'username has already taken'});
    }

    const existUserPhone = await User.findOne({phone: rest.phone});
    if(existUserPhone){
      return res.status(400).json({message: 'phone has already taken'});
    }

    const hashPass = await bcrypt.hash(password, 10);
    const user = new User({...rest, password: hashPass});
    await user.save();
    res.status(201).json({message: 'User created successfully'})
  }catch(err){
    error(err, req, res, next);
  }
};

exports.Login = async (req, res) => {
  try {
    const {email, password} = req.body;
    const user = await User.findOne({email});
    if (!user) {
      throw new Error('User not found'); 
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid password'); 
    }

    const token = jwt.sign({
      id: user._id,
      email: user.email
    }, process.env.SECRET_KEY, {expiresIn: '1h'});

    return res.status(200).json({message: 'Login success', token});
  } catch (err) {
    console.error('Error occurred:', err.message);
    console.error('Error stack:', err.stack);
    return res.status(500).json({message: 'Internal server error', error: err.message});
  }
};

