const express = require("express");
const app = express();
const mongoose = require("mongoose");

module.exports = (err, req, res, next) => {
  if (err) {
    let statusCode = 500;
    if (err instanceof mongoose.Error.ValidationError) {
      statusCode = 400;
    } else if (err instanceof mongoose.Error.CastError) {
      statusCode = 404;
    }
    res.status(statusCode).json({ error: err.message });
  } else {
    next();
  }
};