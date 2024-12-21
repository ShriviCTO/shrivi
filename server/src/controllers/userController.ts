import { Request, Response } from 'express';
import User from '../models/User';

/** Get Logged-In User Controller
 *
 * Fetches the details of the currently authenticated user based on the token.
 *
 * Status Codes:
 * - 401: Unauthorized (if the user ID is missing or invalid)
 * - 404: Not Found (if the user does not exist in the database)
 * - 200: OK (if the user is successfully fetched)
 * - 500: Internal Server Error (if an unexpected error occurs)
 */
export const getLoggedInUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    // Extract user ID from the request
    const userId = req.user?.id;

    // Check if user ID is present
    if (!userId) {
      res.status(401).json({
        status: 'error',
        message: 'Unauthorized access. Please log in to access this resource.',
      });
      return;
    }

    // Find the user by ID in the database
    const user = await User.findById(userId);

    // Check if user exists
    if (!user) {
      res.status(404).json({
        status: 'error',
        message: 'User not found. Please ensure the account is active.',
      });
      return;
    }

    // Sanitize user data before sending the response
    const sanitizedUser = {
      id: user._id,
      name: user.name,
      email: user.email,
      phoneNumber: user.phoneNumber,
      bio: user.bio,
      theme: user.theme,
      language: user.language,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };

    res.status(200).json({
      status: 'success',
      message: 'User fetched successfully.',
      data: sanitizedUser,
    });
  } catch (error: unknown) {
    console.error('Error fetching logged-in user:', error);

    res.status(500).json({
      status: 'error',
      message: 'An error occurred while fetching the user.',
      details: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

/** Get User By ID Controller
 *
 * Fetches the details of a specific user by their ID. This endpoint is restricted to users with elevated permissions (e.g., founders).
 *
 * Status Codes:
 * - 404: Not Found (if the user does not exist)
 * - 200: OK (if the user is successfully fetched)
 * - 500: Internal Server Error (if an unexpected error occurs)
 */
export const getUserById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;

  try {
    // Fetch the user from the database
    const user = await User.findById(id);

    // Check if the user exists
    if (!user) {
      res.status(404).json({
        status: 'error',
        message: 'User not found.',
      });
      return;
    }

    // Sanitize the user data before sending the response
    const sanitizedUser = {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      phoneNumber: user.phoneNumber,
      bio: user.bio,
      theme: user.theme,
      language: user.language,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };

    res.status(200).json({
      status: 'success',
      message: 'User fetched successfully.',
      data: sanitizedUser,
    });
  } catch (error: unknown) {
    console.error('Error fetching user by ID:', error);

    res.status(500).json({
      status: 'error',
      message: 'An error occurred while fetching the user.',
      details: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

/** Get All Users Controller (Founders Only)
 *
 * Fetches a summary of all user profiles, including cart, addresses, metadata, and last login information.
 *
 * Status Codes:
 * - 200: OK (if the users are successfully fetched)
 * - 500: Internal Server Error (if an unexpected error occurs)
 *
 * TODO: Later on add order summaries for each customer also.
 */
export const getAllUsers = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    // Fetch all users from the database
    const users = await User.find();

    // Create a detailed summary of user profiles
    const userSummaries = users.map((user) => ({
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
      lastLogin: user.lastLogin,
      cartSummary: user.cart
        ? user.cart.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.price,
          }))
        : [],
      addressSummary: user.addresses
        ? user.addresses.map((address) => ({
            alias: address.alias,
            city: address.city,
            country: address.country,
          }))
        : [],
      metadataSummary: user.metadata || {},
    }));

    res.status(200).json({
      status: 'success',
      message: 'Users fetched successfully.',
      data: userSummaries,
    });
  } catch (error: unknown) {
    console.error('Error fetching users:', error);

    res.status(500).json({
      status: 'error',
      message: 'An error occurred while fetching users.',
      details: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

export const updateUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const userId = req.user?.id;
  const { name, email, phoneNumber, bio } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      res.status(404).json({
        status: 'error',
        message: 'User not found.',
      });
      return;
    }

    // Update allowed fields
    user.name = name ?? user.name;
    user.email = email ?? user.email;
    user.phoneNumber = phoneNumber ?? user.phoneNumber;
    user.bio = bio ?? user.bio;

    const updatedUser = await user.save();

    res.status(200).json({
      status: 'success',
      message: 'User updated successfully.',
      data: updatedUser,
    });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({
      status: 'error',
      message: 'An error occurred while updating the user.',
    });
  }
};

export const deleteUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const userId = req.user?.id;

  try {
    const user = await User.findById(userId);
    if (!user) {
      res.status(404).json({
        status: 'error',
        message: 'User not found.',
      });
      return;
    }

    // Soft delete the user
    user.deletedAt = new Date();
    await user.save();

    res.status(200).json({
      status: 'success',
      message: 'User account deleted successfully.',
    });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({
      status: 'error',
      message: 'An error occurred while deleting the user.',
    });
  }
};
