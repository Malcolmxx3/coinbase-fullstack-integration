<<<<<<< codex/implement-global-error-handling-middleware
const app = require('./app');

const PORT = process.env.PORT || 3000;
=======
const express = require('express');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());
app.use(cookieParser());

const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || 'replace-me-in-production';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1h';

// Simple in-memory data store for demo purposes.
// Replace with a real database in production.
const users = new Map();

const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const generateToken = (payload) => jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

app.post('/api/auth/register', async (req, res) => {
  try {
    const { email, password, name } = req.body;

    if (!email || !password || !name) {
      return res.status(400).json({
        error: 'name, email, and password are required',
      });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({ error: 'invalid email format' });
    }

    if (typeof password !== 'string' || password.length < 8) {
      return res.status(400).json({ error: 'password must be at least 8 characters long' });
    }

    const normalizedEmail = email.toLowerCase();

    if (users.has(normalizedEmail)) {
      return res.status(409).json({ error: 'user already exists' });
    }

    const passwordHash = await bcrypt.hash(password, 12);
    const user = {
      id: users.size + 1,
      name,
      email: normalizedEmail,
      passwordHash,
      createdAt: new Date().toISOString(),
    };

    users.set(normalizedEmail, user);

    const token = generateToken({ sub: user.id, email: user.email });

    return res.status(201).json({
      message: 'registration successful',
      token,
    });
  } catch (error) {
    return res.status(500).json({ error: 'internal server error' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'email and password are required' });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({ error: 'invalid email format' });
    }

    const normalizedEmail = email.toLowerCase();
    const user = users.get(normalizedEmail);

    if (!user) {
      return res.status(401).json({ error: 'invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);

    if (!isMatch) {
      return res.status(401).json({ error: 'invalid credentials' });
    }

    const token = generateToken({ sub: user.id, email: user.email });

    res.cookie('token', token, {
      httpOnly: true,
      sameSite: 'strict',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 1000,
    });

    return res.status(200).json({
      message: 'login successful',
      token,
    });
  } catch (error) {
    return res.status(500).json({ error: 'internal server error' });
  }
});

app.use((req, res) => res.status(404).json({ error: 'not found' }));
>>>>>>> main

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
