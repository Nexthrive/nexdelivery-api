const express = require('express');
const router = express.Router();
const UserController = require('../controller/auth');

router.post('/create', UserController.register);

module.exports = router;

