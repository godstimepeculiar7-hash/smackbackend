const mongoose = require('mongoose');

// Create a schema for users
const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
        trim: true
    },

    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },

    // Marks whether the user's email has been verified
    isVerified: {
        type: Boolean,
        default: false
    },

    // Stores the temporary token used to verify the user's email address
    verificationToken: {
        type: String
    },

    // Stores the expiration time for the verification token
    verificationTokenExpires: {
        type: Date
    },

    lastVerificationEmailSentAt: {
        type: Date
    }
});

// Create a model called User
const User = mongoose.model('User', userSchema);

// Export the User model so we can use it in other files
module.exports = User;
