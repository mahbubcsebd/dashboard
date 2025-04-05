const express = require('express');
const { createUser } = require('../controllers/userController');
const {
    registerUserController,
    activateUserController,
} = require('../controllers/userController');

const { runValidation } = require('../validators');
const {
    registerValidation,
    updatePasswordValidation,
} = require('../validators/authValidators');
const { isLoggedIn, isLoggedOut, isAdmin } = require('../middlewares/auth');

const userRouter = express.Router();

// Register a user
userRouter.post(
    '/register',
    isLoggedOut,
    registerValidation,
    runValidation,
    registerUserController
);
// Verify user account
userRouter.post('/verify', isLoggedOut, activateUserController);

module.exports = userRouter;
