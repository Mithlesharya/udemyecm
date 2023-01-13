import mongoose from 'mongoose';
import validator from 'validator';

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter your name'],
        maxLength: [30, 'Your name must be within a 30 character']
    },
    email: {
        type: String,
        required: [true, ['Please enter your email address']],
        unique: true,
        validate: [validator.isEmail, 'Please Enter a valid email address']
    },
    password: {
        type: String,
        required: [true, 'Please enter your password'],
        maxLength: [6, 'Your password must be within a 6 character'],
        select: false
    },
    avatar: {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    },
    role: {
        type: String,
        default: 'user'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date
})

const User = mongoose.model('user', userSchema);

export default User;