import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

interface RegisterInput {
  name: string;
  email: string;
  password: string;
}

interface AuthResult {
  user: {
    id: string;
    name: string;
    email: string;
    role: 'admin' | 'staff';
  };
  token: string;
}

const createToken = (userId: string): string => {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error('JWT_SECRET is not configured');
  }

  return jwt.sign({ sub: userId }, secret, { expiresIn: '1h' });
};

export const registerUser = async (
  input: RegisterInput
): Promise<AuthResult> => {
  const name = input.name.trim();
  const email = input.email.trim().toLowerCase();

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new Error('An account with this email already exists');
  }

  const hashedPassword = await bcrypt.hash(input.password, 12);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    role: 'staff'
  });

  const token = createToken(user.id);

  return {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role
    },
    token
  };
};

export const authenticateUser = async (
  emailInput: string,
  password: string
): Promise<AuthResult> => {
  const email = emailInput.trim().toLowerCase();

  const user = await User.findOne({ email }).select('+password');

  if (!user || !user.isActive) {
    throw new Error('Invalid email or password');
  }

  const passwordMatches = await bcrypt.compare(password, user.password);

  if (!passwordMatches) {
    throw new Error('Invalid email or password');
  }

  const token = createToken(user.id);

  return {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role
    },
    token
  };
};
