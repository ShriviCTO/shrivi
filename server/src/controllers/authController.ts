import { Request, Response } from 'express';
import crypto from 'crypto';
import bcrypt from 'bcrypt';
import User from '../models/User';
import { generateToken } from '../utils/jwtUtils';
import { sendEmail } from '../utils/emailUtils';

const MAX_LOGIN_ATTEMPTS = 5;
const LOCK_TIME = 60 * 60 * 1000; // 1 hour

/** User Registration Controller
 *
 * Status Codes:
 * - 400: Bad Request (e.g., missing required fields, duplicate email)
 * - 201: Created (e.g., user registered successfully)
 * - 500: Internal Server Error (e.g., unexpected server-side error, email sending failure)
 */
export const registerUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { name, email, password, phoneNumber } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({
        status: 'error',
        message: 'User with this email already exists.',
      });
      return;
    }

    // Generate a verification token
    const verificationToken = crypto.randomBytes(32).toString('hex');

    // Create and save the user to the database
    const user = await User.create({
      name,
      email,
      password,
      phoneNumber,
      role: 'customer',
      verificationToken,
    });

    try {
      // Prepare verification email
      const verificationUrl = `${req.protocol}://${req.get(
        'host'
      )}/auth/verify-email?token=${verificationToken}`;
      const subject = 'Email Verification - Shrivi Organics';
      const html = `
        <h1>Welcome to Shrivi Organics</h1>
        <p>Hi ${name},</p>
        <p>Please verify your email by clicking the link below:</p>
        <a href="${verificationUrl}">Verify Email</a>
      `;

      // Send the verification email
      await sendEmail(email, subject, 'Please verify your email.', html);

      // Respond with success
      res.status(201).json({
        status: 'success',
        message: 'User registered successfully. Verification email sent.',
        data: {
          user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
          },
        },
      });
    } catch (emailError) {
      // Rollback: Delete the user if email sending fails
      await User.findByIdAndDelete(user._id);

      console.error(`Failed to send email to ${email}:`, emailError);

      res.status(500).json({
        status: 'error',
        message:
          'Failed to send verification email. Please try registering again later.',
      });
    }
  } catch (error: unknown) {
    // Handle database or unexpected errors
    if (error instanceof Error) {
      console.error(`Error registering user: ${error.message}`);
      res.status(500).json({
        status: 'error',
        message: 'An unexpected error occurred while registering the user.',
        details: error.message,
      });
    } else {
      console.error('An unknown error occurred during registration.');
      res.status(500).json({
        status: 'error',
        message: 'An unknown error occurred. Please try again later.',
      });
    }
  }
};

/** User Login Controller
 *
 * Status Codes:
 * - 400: Bad Request (e.g., missing email/password, invalid credentials)
 * - 403: Forbidden (e.g., account locked due to failed login attempts)
 * - 404: Not Found (e.g., user with the given email does not exist)
 * - 200: OK (e.g., login successful)
 * - 500: Internal Server Error (e.g., unexpected server-side error)
 */
export const loginUser = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });

    // 404: User not found
    if (!user) {
      res.status(404).json({
        status: 'error',
        message: 'User not found.',
      });
      return;
    }

    // 403: Account temporarily locked
    if (
      user.loginAttempts >= MAX_LOGIN_ATTEMPTS &&
      user.lastLogin &&
      new Date().getTime() - user.lastLogin.getTime() < LOCK_TIME
    ) {
      res.status(403).json({
        status: 'error',
        message: 'Account is temporarily locked. Try again later.',
      });
      return;
    }

    // 400: Email not verified
    if (!user.isVerified) {
      res.status(400).json({
        status: 'error',
        message: 'Email is not verified.',
      });
      return;
    }

    // Verify password
    const isMatch = await bcrypt.compare(password, user.password || '');

    // 400: Invalid credentials
    if (!isMatch) {
      // Increment login attempts
      user.loginAttempts += 1;

      // Lock the account if max attempts are exceeded
      if (user.loginAttempts >= MAX_LOGIN_ATTEMPTS) {
        user.lastLogin = new Date(); // Set lock time
      }

      await user.save();
      res.status(400).json({
        status: 'error',
        message: 'Invalid credentials.',
      });
      return;
    }

    // Reset login attempts on successful login
    user.loginAttempts = 0;
    user.lastLogin = new Date();

    await user.save();

    // Generate JWT token using utility
    const token = generateToken(user._id.toString(), user.name, user.role);

    // 200: Login successful
    res.status(200).json({
      status: 'success',
      message: 'Login successful.',
      data: {
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      },
    });
  } catch (error) {
    console.error('Error during login:', error);

    // 500: Internal Server Error
    res.status(500).json({
      status: 'error',
      message: 'An error occurred while logging in. Please try again later.',
    });
  }
};

/** Email Verification Controller
 *
 * Status Codes:
 * - 400: Bad Request (e.g., missing or invalid token)
 * - 404: Not Found (e.g., token not associated with any user)
 * - 200: OK (e.g., email verified successfully)
 * - 500: Internal Server Error (e.g., unexpected server-side error)
 */
export const verifyEmail = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { token } = req.body; // Token now comes from the request body

  // Validate token
  if (!token) {
    res.status(400).json({
      status: 'error',
      message: 'Verification token is required.',
    });
    return;
  }

  try {
    // Find user with the given verification token
    const user = await User.findOne({ verificationToken: token });
    if (!user) {
      res.status(404).json({
        status: 'error',
        message: 'Invalid or expired verification token.',
      });
      return;
    }

    // Update user to mark as verified
    user.isVerified = true;
    user.verificationToken = undefined;
    await user.save();

    res.status(200).json({
      status: 'success',
      message: 'Email verified successfully.',
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      },
    });
  } catch (error: unknown) {
    console.error('Error verifying email:', error);

    res.status(500).json({
      status: 'error',
      message: 'An error occurred while verifying the email.',
      details: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

/** Request Password Reset Controller
 *
 * Status Codes:
 * - 400: Bad Request (e.g., missing email, user not verified)
 * - 404: Not Found (e.g., user with the given email does not exist)
 * - 200: OK (e.g., password reset email sent successfully)
 * - 500: Internal Server Error (e.g., unexpected server-side error)
 */
export const requestPasswordReset = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { email } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });

    // Check if user exists
    if (!user) {
      res.status(404).json({
        status: 'error',
        message: 'User not found. Please check the email provided.',
      });
      return;
    }

    // Check if the user is verified
    if (!user.isVerified) {
      res.status(400).json({
        status: 'error',
        message: 'Password reset is only allowed for verified users.',
      });
      return;
    }

    // Check if a reset token is already active
    if (
      user.resetPasswordToken &&
      user.resetPasswordExpires &&
      user.resetPasswordExpires > new Date()
    ) {
      res.status(400).json({
        status: 'error',
        message:
          'A password reset link has already been sent. Please try again later.',
      });
      return;
    }

    // Generate a reset token
    const resetToken = crypto.randomBytes(32).toString('hex');
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = new Date(Date.now() + 3600000); // 1 hour
    await user.save();

    try {
      // Prepare the reset email
      const resetUrl = `${req.protocol}://${req.get(
        'host'
      )}/reset-password?token=${resetToken}`;
      const subject = 'Password Reset Request - Shrivi Organics';
      const html = `
        <h1>Password Reset Request</h1>
        <p>Hi ${user.name},</p>
        <p>We received a request to reset your password. You can reset your password by clicking the link below:</p>
        <a href="${resetUrl}">Reset Password</a>
        <p>If you did not request a password reset, please ignore this email.</p>
      `;

      // Send the reset email
      await sendEmail(user.email, subject, 'Password reset request.', html);

      res.status(200).json({
        status: 'success',
        message: 'Password reset email sent successfully.',
      });
    } catch (emailError) {
      console.error(
        `Failed to send password reset email to ${email}:`,
        emailError
      );

      res.status(500).json({
        status: 'error',
        message: 'Failed to send password reset email. Please try again later.',
      });
    }
  } catch (error: unknown) {
    console.error('Error during password reset request:', error);

    res.status(500).json({
      status: 'error',
      message: 'An unexpected error occurred while processing the request.',
      details: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

/** Reset Password Controller
 *
 * Status Codes:
 * - 400: Bad Request (e.g., missing token, invalid or expired token)
 * - 200: OK (e.g., password reset successfully)
 * - 500: Internal Server Error (e.g., unexpected server-side error)
 */
export const resetPassword = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { token, newPassword } = req.body;

  try {
    // Find user with the provided reset token and ensure token has not expired
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: new Date() },
    });

    // Check if token is invalid or expired
    if (!user) {
      res.status(400).json({
        status: 'error',
        message: 'Invalid or expired reset token.',
      });
      return;
    }

    // Set the updated password, clear reset token and expiration
    user.password = newPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.status(200).json({
      status: 'success',
      message: 'Password reset successfully.',
    });
  } catch (error: unknown) {
    console.error('Error during password reset:', error);

    res.status(500).json({
      status: 'error',
      message: 'An error occurred while resetting the password.',
      details: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

// Placeholder for Social Login
export const socialLogin = async (
  req: Request,
  res: Response
): Promise<void> => {
  res.status(200).json({ message: 'Social login not implemented yet' });
};
