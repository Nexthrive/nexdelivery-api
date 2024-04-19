const express = require('express');
const router = express.Router();
const app = express();
const UserController = require('../controller/AuthController');
const error = require('../../middleware/middleware');

router.post('/register', UserController.register);
router.post('/login',UserController.Login);

app.use(error)
module.exports = router;

