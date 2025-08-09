import { NextApiRequest, NextApiResponse } from 'next';

// Define a type for users
interface User {
  name: string;
  email: string;
  password: string;
  role: 'patient' | 'healthworker' | 'admin';
}

// Dummy user database (replace with DB logic)
const users: User[] = [];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  const { name, email, password, role } = req.body as Partial<User>;

  // Validate
  if (!name || !email || !password || !role) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  // Check if user already exists
  const existing = users.find((user) => user.email === email);
  if (existing) {
    return res.status(400).json({ message: 'User already exists' });
  }

  // Save user (replace with DB logic)
  const newUser: User = { name, email, password, role };
  users.push(newUser);

  // Generate a fake JWT (replace with real logic)
  const token = `${email}-token`;

  return res.status(200).json({ token, role });
}
