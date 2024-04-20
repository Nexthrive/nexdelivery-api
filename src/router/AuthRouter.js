const express = require('express');
const router = express.Router();
const UserController = require('../controller/AuthController');

router.post('/register', UserController.register);
router.post('/login',UserController.Login);
router.get('/',UserController.getAllUsers);
router.get('/courier',UserController.getAllKurir);
router.get('/:id',UserController.getUserById);
router.put('/:id',UserController.Update);
router.put('/password/:id',UserController.updatePassword);

module.exports = router;

