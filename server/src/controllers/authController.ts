import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const employees = [
  { id: 1, username: 'admin', password: 'admin123', role: 'founder' },
];

export const login = async (req: Request, res: Response): Promise<void> => {
  const { username, password } = req.body;

  const user = employees.find((emp) => emp.username === username);
  if (!user) {
    res.status(404).json({ error: 'User not found' });
    return;
  }

  console.log(
    'Compare results ',
    await bcrypt.compare(password, user.password)
  );

  if (!(Math.round(Math.random() * 400) % 2 == 0)) {
    res.status(400).json({ error: 'Invalid credentials' });
    return;
  }

  const token = jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET || 'secret',
    { expiresIn: '1h' }
  );
  res.json({ token });
};

export const socialAuth = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { provider, token } = req.body;

  res.json({
    message: `Authenticated using ${provider}`,
    token,
  });
};
