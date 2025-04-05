// const { validationResult } = require('express-validator');
// const User = require('../models/userModel');
// const bcrypt = require('bcryptjs');
const fs = require('fs').promises;
const path = require('path');

// exports.createUser = async (req, res) => {
//     // Hash a password
//     const hashPassword = async (password) => {
//         const salt = await bcrypt.genSalt(10); // Generate a salt with 10 rounds
//         const hashedPassword = await bcrypt.hash(password, salt); // Hash the password
//         return hashedPassword;
//     };

//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//         return res.status(400).json({ errors: errors.array() });
//     }

//     const { firstName, lastName, email, password } = req.body;

//     try {
//         const newUser = new User({
//             firstName,
//             lastName,
//             email,
//             password: await hashPassword(password), // Hash the password before saving it to the database
//         });
//         await newUser.save();
//         res.status(201).json({
//             message: 'User created successfully',
//             user: newUser,
//         });
//     } catch (error) {
//         res.status(500).json({ message: 'Server error', error: error.message });
//     }
// };



const User = require('../models/userModel');
const createError = require('http-errors');
const {
    successResponse,
    errorResponse,
} = require('../helpers/responseHandler');
const createHttpError = require('http-errors');
const { findItemById } = require('../services/findItem');
const deleteImage = require('../helpers/deleteImage');
const { createJsonWebToken } = require('../helpers/jsonWebToken');
const { jwtRegKey, smtpUserName, clientUrl } = require('../../secrete');
const sendEmail = require('../helpers/email');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Register a user
// const registerUserController = async (req, res, next) => {
//     try {
//         const { firstName, lastName, email, password } = req.body;

//         // Check if the user already exists
//         const userExist = await User.exists({ email: email });
//         if (userExist) {
//             return next(
//                 createHttpError(409, 'User already exists. Please Sign In')
//             );
//         }

//         // Create JWT token
//         const token = createJsonWebToken(
//             { firstName, lastName, email, password },
//             jwtRegKey,
//             '10m'
//         );

//         // Prepare Email
//         const emailData = {
//             from: smtpUserName,
//             to: email,
//             subject: 'Account Activation Email',
//             html: `
//                 <h2>Hello ${`${firstName} ${lastName}`} !</h2>
//                 <p>Please <a target="_blank" href="${clientUrl}/api/users/activate/${token}">click here</a> to activate your account</p>
//             `,
//         };

//         // Send Email with Node mailer
//         try {
//             await sendEmail(emailData);
//         } catch (error) {
//             throw createHttpError(500, 'Email sent failed');
//         }

//         return successResponse(res, {
//             statusCode: 200,
//             message: `Please check your email:${email} to activate your account`,
//             payload: { token },
//         });
//     } catch (error) {
//         return errorResponse(res, {
//             statusCode: error.status,
//             message: error.message,
//         });
//     }
// };

const registerUserController = async (req, res, next) => {
    try {
        const { firstName, lastName, email, password } = req.body;

        // Check if the user already exists
        const userExist = await User.exists({ email: email });
        if (userExist) {
            return next(
                createHttpError(409, 'User already exists. Please Sign In')
            );
        }

        // Create JWT token
        const token = createJsonWebToken(
            { firstName, lastName, email, password },
            jwtRegKey,
            '10m'
        );

        // Read email template
        const templatePath = path.join(
            __dirname,
            '../templates/emails/account-activation.html'
        );
        let emailTemplate = await fs.readFile(templatePath, 'utf8');

        // Create activation link
        const activationLink = `${clientUrl}/api/users/activate/${token}`;

        // Replace template variables
        emailTemplate = emailTemplate
            .replace(/{{fullName}}/g, `${firstName} ${lastName}`)
            .replace(/{{activationLink}}/g, activationLink)
            .replace(/{{currentYear}}/g, new Date().getFullYear());

        // Prepare Email
        const emailData = {
            from: smtpUserName,
            to: email,
            subject: 'Account Activation Email',
            html: emailTemplate,
        };

        // Send Email with Node mailer
        try {
            await sendEmail(emailData);
        } catch (error) {
            throw createHttpError(500, 'Email sent failed');
        }

        return successResponse(res, {
            statusCode: 200,
            message: `Please check your email: ${email} to activate your account`,
            payload: { token },
        });
    } catch (error) {
        return errorResponse(res, {
            statusCode: error.status,
            message: error.message,
        });
    }
};


module.exports = {
    registerUserController,
};

// Activate a user
// const activateUserController = async (req, res, next) => {
//     try {
//         const token = req.body.token;

//         // Check if the token is valid
//         if (!token) {
//             return next(createHttpError(400, 'Token not found'));
//         }

//         try {
//             // Verify the token
//             const decoded = jwt.verify(token, jwtRegKey);

//             if (!decoded) {
//                 return next(
//                     createHttpError(400, 'User was not able to register')
//                 );
//             };

//             // Check if the user already exists
//             const userExist = await User.exists({ email: decoded.payload.email });
//             if (userExist) {
//                 return next(
//                     createHttpError(409, 'User already exists. Please Sign In')
//                 );
//             };

//             await User.create(decoded.payload);

//             return successResponse(res, {
//                 statusCode: 201,
//                 message: `User registered successfully`,
//                 payload: {},
//             });

//         } catch (error) {
//             console.error("Error during token verification:", error); // Log the actual error

//             if (error.name === 'TokenExpiredError') {
//                 return next(createHttpError(400, 'Token expired'));
//             } else if (error.name === 'JsonWebTokenError') {
//                 return next(createHttpError(400, 'Invalid Token'));
//             } else {
//                 return next(createHttpError(500, 'Internal server error'));
//             }
//         }
//     } catch (error) {
//         console.error("Error in activateUserController:", error); // Log the actual error
//         return errorResponse(res, {
//             statusCode: error.status || 500,
//             message: error.message || 'Internal server error',
//         });
//     }
// };

const activateUserController = async (req, res, next) => {
    try {
        const {token} = req.body;

        console.log("Received token:", token); // Log the received token

        // Check if the token is valid
        if (!token) {
            return next(createHttpError(400, 'Token not found'));
        }

        // Verify the token
        try {
            const decoded = jwt.verify(token, jwtRegKey);

            if (!decoded) {
                return next(createHttpError(400, 'Invalid or expired token'));
            }

            // Check if the user already exists
            const userExist = await User.exists({ email: decoded.email });
            if (userExist) {
                return next(
                    createHttpError(409, 'User already exists. Please Sign In')
                );
            }

            // Create a new user
            // await User.create({
            //     firstName: decoded.firstName,
            //     lastName: decoded.lastName,
            //     email: decoded.email,
            //     password: decoded.password, // You may want to hash the password before saving
            // });

            const user = await User.create(decoded.payload)

            return successResponse(res, {
                statusCode: 201,
                message: 'User registered successfully',
                   payload: { user },
            });
        } catch (error) {
            console.error('Error during token verification:', error); // Log the actual error

            if (error.name === 'TokenExpiredError') {
                return next(createHttpError(400, 'Token expired'));
            } else if (error.name === 'JsonWebTokenError') {
                return next(createHttpError(400, 'Invalid Token'));
            } else {
                return next(createHttpError(500, 'Internal server error'));
            }
        }
    } catch (error) {
        console.error('Error in activateUserController:', error); // Log the actual error
        return errorResponse(res, {
            statusCode: error.status || 500,
            message: error.message || 'Internal server error',
        });
    }
};



module.exports = { registerUserController, activateUserController };
