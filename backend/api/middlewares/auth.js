const createHttpError = require('http-errors');
const jwt = require('jsonwebtoken');
const { jwtAccessKey } = require('../../secrete');

const
isLoggedIn = (req, res, next) => {
    try {
        const accessToken = req.cookies.accessToken;
        if (!accessToken) throw createHttpError(401, 'You are not logged in');

        const decoded = jwt.verify(accessToken, jwtAccessKey);
        if(!decoded) throw createHttpError(401, 'You are not logged in');

        req.user = decoded.payload.user;
        next();
    } catch (error) {
        next(error);
    }
};


// const isLoggedOut = (req, res, next) => {
//     try {
//         const accessToken = req.cookies.accessToken;
//         if (accessToken) throw createHttpError(401, 'You are already logged in');

//         next();
//     } catch (error) {
//         next(error);
//     }
// };

const isLoggedOut = (req, res, next) => {
    try {
        const authHeader = req?.headers?.authorization;
        const token = authHeader && authHeader.split(' ')[1];

        console.log('Token received:', token);

        if (token) {
            // Token verify করার চেষ্টা করবে
            try {
                const decoded = jwt.verify(token, jwtAccessKey); // টোকেন verify করুন
                if (decoded) {
                    return next(
                        createHttpError(401, 'You are already logged in')
                    ); // Error throw করুন
                }
            } catch (verifyError) {
                console.error('Invalid token:', verifyError.message);
                // টোকেন অবৈধ হলে কোনো action নেবেন না
                // Allow user to proceed as logged out
            }
        }

        next(); // টোকেন না থাকলে বা অবৈধ হলে proceed করুন
    } catch (error) {
        console.error('Middleware error:', error.message);
        return next(error); // কোনো unexpected error হলে সেটি handle করুন
    }
};




const isAdmin = (req, res, next) => {
    try {
        if (!req.user.isAdmin){
            throw createHttpError(403, 'You are not authorized');
        }

        console.log(req.user.isAdmin);


        next();
    } catch (error) {
        next(error);
    }
};


module.exports = {
    isLoggedIn,
    isLoggedOut,
    isAdmin,
};