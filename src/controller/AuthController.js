const bcrypt = require("bcrypt");
const User = require("../schema/AuthSchema");
const jwt = require("jsonwebtoken");
const error = require("../../middleware/middleware");

exports.register = async (req, res, next) => {
  try {
    const { password, ...rest } = req.body;

    const existUserEmail = await User.findOne({
      email: rest.email,
    });
    if (existUserEmail) {
      return res.status(400).json({
        message: "email has already taken",
      });
    }

    const existUserUN = await User.findOne({
      username: rest.username,
    });
    if (existUserUN) {
      return res.status(400).json({
        message: "username has already taken",
      });
    }

    const existUserPhone = await User.findOne({
      phone: rest.phone,
    });
    if (existUserPhone) {
      return res.status(400).json({
        message: "phone has already taken",
      });
    }

    const hashPass = await bcrypt.hash(password, 10);
    const user = new User({
      ...rest,
      password: hashPass,
    });
    await user.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    error(err, req, res, next);
  }
};

exports.Login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("User not found");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Invalid password");
    }

    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
      },
      process.env.SECRET_KEY,
      { expiresIn: "1h" }
    );

    return res.status(200).json({ message: "Login success", token });
  } catch (err) {
    console.error('Error occurred:', err.message);
    console.error('Error stack:', err.stack);
    error(err, req, res, next);
  }
};

exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    if (!users || users.length === 0) {
      throw new Error("No users found");
    }
    res.status(200).json(users);
  } catch (err) {
    error(err, req, res, next);
  }
};

exports.getAllKurir = async (req, res, next) => {
  try {
    const kurir = await User.find({
      role: "courier",
    });

    if (!kurir || kurir.length === 0) {
      throw new Error("No kurir found");
    }

    res.status(200).json(kurir);
  } catch (err) {
    error(err, req, res, next);
  }
};

exports.getUserById = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);

    if (!user) {
      throw new Error("User not found");
    }

    res.status(200).json(user);
  } catch (err) {
    error(err, req, res, next);
  }
};

exports.Update = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const newData = req.body;

    if (!userId || !newData) {
      throw new Error("Invalid Request");
    }

    const user = await User.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }

    if (newData.password) {
      throw new Error("Password cannot be updated directly");
    }

    delete newData.password;
    Object.assign(user, newData);

    await user.save();

    res.status(200).json({ message: "User updated successfully", user });
  } catch (err) {
    error(err, req, res, next);
  }
};

exports.updatePassword = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const { oldPassword, newPassword } = req.body;

    if (!userId || !oldPassword || !newPassword) {
      throw new Error("Invalid Request");
    }

    const user = await User.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }

    const isPasswordValid = await bcrypt.compare(oldPassword, user.password);
    if (!isPasswordValid) {
      throw new Error("Invalid old_password");
    }

    const hashNewPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashNewPassword;
    await user.save();
    res.status(200).json({ message: "Password updated successfully" });
  } catch (err) {
    error(err, req, res, next);
  }
};
