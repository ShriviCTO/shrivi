import { Request, Response } from 'express';
import crypto from 'crypto';
import bcrypt from 'bcrypt';
import User from '../models/User';
import { generateToken } from '../utils/jwtUtils';
import { sendEmail } from '../utils/emailUtils';

// User Registration
// User Registration
export const registerUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { name, email, password, phoneNumber } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ error: 'User with this email already exists' });
      return;
    }

    // Generate a verification token
    const verificationToken = crypto.randomBytes(32).toString('hex');

    // Create the user
    const user = new User({
      name,
      email,
      password,
      phoneNumber,
      role: 'customer',
      verificationToken,
    });

    // Save the user to the database
    await user.save();

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

    try {
      // Send the verification email
      await sendEmail(email, subject, 'Please verify your email.', html);

      // Respond with success only if the email is sent
      res.status(201).json({
        message: 'User registered successfully. Verification email sent.',
      });
    } catch (emailError) {
      // Rollback: Delete the user if the email fails
      await User.findByIdAndDelete(user._id);

      console.error(`Failed to send email to ${email}:`, emailError);

      res.status(500).json({
        error: 'Failed to send verification email. Please try again later.',
      });
    }
  } catch (error) {
    // Catch other errors (e.g., database errors)
    res.status(500).json({
      error: 'Error registering user',
      details: error,
    });
  }
};

// User Login
export const loginUser = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    if (!user.isVerified) {
      res.status(400).json({ error: 'Email not verified' });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password || '');
    if (!isMatch) {
      res.status(400).json({ error: 'Invalid credentials' });
      return;
    }

    const token = generateToken(user._id.toString(), user.role);

    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    res.status(500).json({ error: 'Error logging in', details: error });
  }
};

// Email Verification
export const verifyEmail = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { token } = req.query;

  try {
    const user = await User.findOne({ verificationToken: token });
    if (!user) {
      res.status(400).json({ error: 'Invalid or expired token' });
      return;
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    await user.save();

    res.status(200).json({ message: 'Email verified successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error verifying email', details: error });
  }
};

// Request Password Reset
export const requestPasswordReset = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    const resetToken = crypto.randomBytes(32).toString('hex');
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = new Date(Date.now() + 3600000); // 1 hour
    await user.save();

    // Send password reset email (placeholder)
    console.log(`Password reset email sent. Token: ${resetToken}`);

    res.status(200).json({ message: 'Password reset email sent' });
  } catch (error) {
    res
      .status(500)
      .json({ error: 'Error requesting password reset', details: error });
  }
};

// Reset Password
export const resetPassword = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { token, newPassword } = req.body;

  try {
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: new Date() },
    });

    if (!user) {
      res.status(400).json({ error: 'Invalid or expired token' });
      return;
    }

    user.password = newPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.status(200).json({ message: 'Password reset successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error resetting password', details: error });
  }
};

// Placeholder for Social Login
export const socialLogin = async (
  req: Request,
  res: Response
): Promise<void> => {
  res.status(200).json({ message: 'Social login not implemented yet' });
};
