const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ['user', 'kurir'],
      default: 'user',
    },
    phone:{
      type: String,
      required: true,
    },
    NIK:{
      type: Number,
      required: true,
    },
    Alamat:{
      type: String,
      required: true,
    },
    status:{
      type: String,
      enum: ['active', 'inactive', 'deactive'],
      default: 'inactive',
    }
  },
  { timestamps: true }
);
module.exports = mongoose.model('User', UserSchema);
