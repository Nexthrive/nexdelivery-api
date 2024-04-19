const express = require("express");
const app = express();

module.exports = (err, req, res, next) => {
  if (err) {
    err.message = `Error At ${new Date()}: ${err.message}`;
    next(err);
  } else {
    next();
  }
};