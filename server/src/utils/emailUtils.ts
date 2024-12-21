import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Ensure the required environment variables are set
if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
  throw new Error(
    'EMAIL_USER or EMAIL_PASS is missing. Please check your .env file.'
  );
}

// Function to send email
export const sendEmail = async (
  to: string,
  subject: string,
  text: string,
  html?: string
): Promise<void> => {
  try {
    // Configure the transporter
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false, // Use TLS
      auth: {
        user: process.env.EMAIL_USER, // Gmail address
        pass: process.env.EMAIL_PASS, // App password
      },
    });

    // Email options
    const mailOptions = {
      from: `"Shrivi Organics" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text,
      html,
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);
    console.log(`✅ Email sent to ${to}: ${info.messageId}`);
  } catch (error: any) {
    console.error(`❌ Failed to send email to ${to}:`, error.message || error);
    throw error;
  }
};
