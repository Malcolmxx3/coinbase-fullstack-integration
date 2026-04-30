const bcrypt = require('bcrypt');
const { generateToken } = require('../utils/token.util');

/**
 * Build controller with injected user access function.
 * @param {{findUserByEmail: (email: string) => Promise<{id:string|number,email:string,role?:string,password:string}|null>}} deps
 */
const buildAuthController = ({ findUserByEmail }) => {
  const login = async (req, res, next) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required.' });
      }

      const user = await findUserByEmail(email);
      if (!user) {
        return res.status(401).json({ message: 'Invalid credentials.' });
      }

      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        return res.status(401).json({ message: 'Invalid credentials.' });
      }

      const token = generateToken(user);

      res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: Number(process.env.JWT_COOKIE_MAX_AGE_MS || 24 * 60 * 60 * 1000),
      });

      return res.status(200).json({
        message: 'Login successful.',
        user: {
          id: user.id,
          email: user.email,
          role: user.role,
        },
      });
    } catch (error) {
      return next(error);
    }
  };

  return {
    login,
  };
};

module.exports = {
  buildAuthController,
};
