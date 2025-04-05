const express = require('express');
const { runValidation } = require('../validators');
const authRoute = express.Router();
const {
    loginController,
    logoutController,
} = require('../controllers/authController');
const { loginValidation } = require('../validators/authValidators');
const { isLoggedOut, isLoggedIn } = require('../middlewares/auth');

authRoute.post(
    '/login',
    loginValidation,
    runValidation,
    isLoggedOut,
    loginController
);
authRoute.post('/logout', isLoggedIn, logoutController);

module.exports = authRoute;
