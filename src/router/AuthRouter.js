const express = require('express');
const router = express.Router();
const UserController = require('../controller/AuthController');

router.post('/', UserController.register);

module.exports = router;

