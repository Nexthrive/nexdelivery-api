const User = require('../schema/Auth');
exports.register = async (req, res) => {
  try{
    const user = new User(req.body);
    await user.save();
    res.status(201).json({message: 'User created successfully'})
  }catch(err){
    res.status(500).json({message: err.message});
  }
};