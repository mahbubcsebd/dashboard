const { Schema, model } = require('mongoose');
const { defaultImagePath } = require('../../secrete');
const bcrypt = require('bcryptjs');
const validate = require('validator');

const userSchema = new Schema(
    {
        firstName: {
            type: String,
            required: [true, 'Name is required'],
            trim: true,
            minLenght: [2, 'Name must be more than 2 characters'],
            maxlength: [50, 'Name must be less than 50 characters'],
        },
        lastName: {
            type: String,
            required: [true, 'Name is required'],
            trim: true,
            minLenght: [2, 'Name must be more than 2 characters'],
            maxlength: [50, 'Name must be less than 50 characters'],
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
            trim: true,
            unique: true,
            lowercase: true,
            validate: {
                validator: function (value) {
                    const emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
                    return emailRegex.test(value);
                },
                message: 'Email is not valid',
            },
        },
        password: {
            type: String,
            required: [true, 'Password is required'],
            minLenght: [8, 'Password must be more than 8 characters'],
            set: (value) => {
                return bcrypt.hashSync(value, 10);
            },
        },
        isAdmin: {
            type: Boolean,
            default: false,
        },
        isBanned: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true, versionKey: false }
);

const User = model('User', userSchema);

module.exports = User;
