import { Request, Response } from 'express';

// Dummy data for demonstration
const users = [
  { id: 1, name: 'Alice', email: 'alice@example.com' },
  { id: 2, name: 'Bob', email: 'bob@example.com' },
];

export const getAllUsers = async (
  req: Request,
  res: Response
): Promise<void> => {
  res.json(users);
};

export const getUserProfile = async (
  req: Request,
  res: Response
): Promise<void> => {
  const userId = parseInt(req.params.id, 10);

  const user = users.find((u) => u.id === userId);
  if (!user) {
    res.status(404).json({ error: 'User not found' });
    return;
  }

  res.json(user);
};
