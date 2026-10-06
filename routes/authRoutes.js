const crypto = require('crypto');

const express = require('express');
const bcrypt = require('bcrypt');
const validator = require('validator');
const jwt = require('jsonwebtoken');

const User = require('../models/User');
const sendEmail = require('../utils/sendEmail');

const router = express.Router();

function isStrongPassword(password) {
   return (
      password.length >= 8 && /[A-Z]/.test(password) && /[a-z]/.test(password) && /\d/.test(password) && /[!@#$%^&*(),.?":{}|<>]/.test(password)
   )
}



router.post('/register', async (req, res) => {
   try {
      const { fullName, email, password } = req.body;

      // Valiting the input to ensure that fullname, and email, and password are string
      if (typeof fullName !== 'string' || typeof email !== 'string' || typeof password !== 'string') {
         return res.status(400).json({
            message: 'Full name, email, and password must be strings'
         });
      }



      // Trimmed the full name and email to remove any leading or trailing whitespace
      const trimmedFullName = fullName.trim();
      const trimmedEmail = email.trim().toLowerCase(); // Convert email to lowercase for consistency

      // Checked if any of the required fields are missing and returned a 400 status code with an error message if they are
      if (!trimmedFullName || !trimmedEmail || !password) {
         return res.status(400).json({
            message: 'Please provide full name, email, and password'
         });
      }

      const isValidFullName = trimmedFullName.length >= 4 && trimmedFullName.length <= 50 && /^[a-zA-Z '-]+$/.test(trimmedFullName); // Full name must be between 4 and 50 characters long and can only contain letters, spaces, hyphens and apostrophes

      if (!isValidFullName) {
         return res.status(400).json({
            message: 'Full name must be between 4 and 50 characters long and can only contain letters, spaces, hyphens and apostrophes'
         });
      }

      // Validated the email format using the validator library and returned a 400 status code with an error message if it's invalid
      if (!validator.isEmail(trimmedEmail)) {
         return res.status(400).json({
            message: 'Please provide a valid email address'
         });
      }

      // Validate the password strength using a custom function and returned a 400 status code with an error message if it's weak

      if (!isStrongPassword(password)) {
         return res.status(400).json({
            message: 'Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character'
         });
      }

      //Checking for duplicate email in the database and returning a 409 status code with an error message if it exists
      const existingUser = await User.findOne({
         email: trimmedEmail
      });

      if (existingUser) {
         return res.status(409).json({
            message: 'User with this email already exists'
         });
      }

      // Used bcrypt to hash the password before storing it in the database. The second argument (12) controls the cost/work factor bcrypt uses when generating the hash. A higher value generally makes password hashing more computationally expensive, which can make password-guessing attacks more costly, but it's not simply "more secure" in isolation.

      const hashedPassword = await bcrypt.hash(password, 12);

      // Generate a random verification token to send to the user's email.
      // This token is temporary and used to confirm the email address belongs to the user.
      const verificationToken = crypto.randomBytes(32).toString('hex');

      // Hash the token before saving it in the database so the raw token is never stored.
      // This keeps the verification process safer and prevents token exposure in the database.
      const hashedVerificationToken = crypto.createHash('sha256').update(verificationToken).digest('hex');

      // Set an expiration time so the verification link is only valid for a limited period.
      const verificationTokenExpires = new Date(Date.now() + 30 * 60 * 1000); // Token expires in 30 minutes

      const user = await User.create({
         fullName: trimmedFullName,
         email: trimmedEmail,
         password: hashedPassword,
         verificationToken: hashedVerificationToken,
         verificationTokenExpires: verificationTokenExpires
      });

      const verificationUrl = `http://localhost:5000/auth/verify-email?token=${verificationToken}`;

      await sendEmail(
         user.email,
         'Verify your SMACK account',
         `
        <h1>Welcome to SMACK, ${user.fullName}!</h1>

        <p>Your account has been created successfully.</p>

        <p>Please verify your email address by clicking the button below:</p>

        <a href="${verificationUrl}">
            Verify My Email
        </a>

        <p>This link will expire in 30 minutes.</p>
    `
      );


      res.status(201).json({
         message: 'User registered successfully'
      });

   } catch (error) {
      console.log(error);

      if (error.code === 11000) {
         return res.status(409).json({
            message: 'User with this email already exists'
         });
      }

      res.status(500).json({
         message: 'An error occurred while registering the user'
      });
   }

});

router.get('/verify-email', async (req, res) => {
   try {
      const { token } = req.query

      if (!token) {
         return res.status(400).json({
            message: 'Verification token is required'
         });
      }

      const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

      const user = await User.findOne({
         verificationToken: hashedToken
      });

      if (user.isVerified === true) {
         return res.status(400).json({
            message: 'This account is already verified'
         });
      }

      if (!user) {
         return res.status(400).json({
            message: 'Invalid verification token'
         });
      }

      if (Date.now() > user.verificationTokenExpires.getTime()) {
         return res.status(400).json({
            message: 'Verification token has expired'
         });
      }

      user.isVerified = true;
      user.verificationToken = undefined;
      user.verificationTokenExpires = undefined;

      await user.save();

      const jwtToken = jwt.sign({
         userId: user._id
      },
         process.env.JWT_SECRET
      );

      res.cookie('token', jwtToken, {
         httpOnly: true,
         secure: true,
         sameSite: 'none'
      });

      return res.redirect('http://localhost:5173/dashboard');

   } catch (error) {
      res.status(500).json({
         message: 'An error occurred while verifying email'
      });
   }
});

router.post('/resend-verification', async (req, res) => {
   try {
      const { email } = req.body;

      // validating the email to make sure we get the correct email type

      if (typeof email !== 'string') {
         return res.status(400).json({
            message: 'Email must be a string'
         });
      }

      // Normalizing the email i.e removing whitespace at the beginning and end of the email, and coverting to lowercase for consistency

      const trimmedEmail = email.trim().toLowerCase();

      // Check if the email field is empty
      if (!trimmedEmail) {
         return res.status(400).json({
            message: 'Please provide email'
         });
      }

      // Validated the email format using the validator library and returned a 400 status code with an error message if it's invalid
      if (!validator.isEmail(trimmedEmail)) {
         return res.status(400).json({
            message: 'Please provide a valid email address'
         });
      }

      const user = await User.findOne({
         email: trimmedEmail
      });

      if (!user) {
         return res.status(200).json({
            message: 'If an account with this email exists, a verification email will be sent'
         });
      }

      if (user.isVerified === true) {
         return res.status(200).json({
            message: 'If an account with this email exists, a verification email will be sent'
         });
      }

      // Logic for email throttling

      const resendCooldown = 5 * 60 * 1000;

      if (user.lastVerificationEmailSentAt) {

         const timeSinceLastEmail =
            Date.now() - user.lastVerificationEmailSentAt.getTime();

         if (timeSinceLastEmail < resendCooldown) {

            const remainingCooldown =
               resendCooldown - timeSinceLastEmail;

            const remainingMinutes =
               Math.ceil(remainingCooldown / 60000);

            return res.status(429).json({
               message: `Too many attempts. Try again in ${remainingMinutes} minutes`
            });
         }
      }

      const verificationToken = crypto.randomBytes(32).toString('hex');

      const hashedVerificationToken = crypto.createHash('sha256').update(verificationToken).digest('hex');

      const verificationTokenExpires = new Date(Date.now() + 30 * 60 * 1000);

      user.verificationToken = hashedVerificationToken;
      user.verificationTokenExpires = verificationTokenExpires;

      await user.save();

      const verificationUrl = `http://localhost:5000/auth/verify-email?token=${verificationToken}`;

      await sendEmail(user.email, 'Verify your SMACK account', `<h1>Welcome to SMACK, ${user.fullName}!</h1>

        <p>Your account has been created successfully.</p>

        <p>Please verify your email address by clicking the button below:</p>

        <a href="${verificationUrl}">
            Verify My Email
        </a>

        <p>This link will expire in 30 minutes.</p>`);

      user.lastVerificationEmailSentAt = new Date();
      await user.save();

      return res.status(200).json({
         message: 'Verification email sent'
      });

   } catch (error) {
      console.log(error);
      res.status(500).json({
         message: 'An error occurred while resending email'
      });
   }
});

router.get('/me', async (req, res) => {
   try {
      const { token } = req.cookies

      if (!token) {
         return res.status(401).json({
            message: 'Not authenticated'
         });
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      const user = await User.findOne({
         _id: decoded.userId
      });

      if (!user) {
         return res.status(404).json({
            message: 'User not found'
         });
      }

      return res.status(200).json({
         fullName: user.fullName,
         email: user.email,
         isVerified: user.isVerified
      });
   } catch (error) {
      console.log(error);
      res.status(401).json({
         message: 'Invalid or expired token'
      })
   }
});

module.exports = router;