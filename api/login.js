const jwt = require('jsonwebtoken');

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { password } = req.body;
  const adminPassword = process.env.ADMIN_PASSWORD || 'KemperAdmin2026';
  const jwtSecret = process.env.JWT_SECRET || 'dev-secret-key-change-in-production';

  if (password === adminPassword) {
    const token = jwt.sign({ admin: true }, jwtSecret, { expiresIn: '24h' });
    return res.status(200).json({ token });
  }

  return res.status(401).json({ error: 'Invalid password' });
}
