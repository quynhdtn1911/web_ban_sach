const AuthController = require('../controller/AuthController');

const router = require('express').Router();

// Register
router.post('/register', AuthController.registerUser);

// Login
router.post('/login', AuthController.login);

//login by google
router.post('/loginByGoogle', AuthController.loginByGoogle);

// Change password
router.post('/:id', AuthController.changePassword)



module.exports = router;