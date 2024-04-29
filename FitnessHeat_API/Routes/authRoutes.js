const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

// Dummy user data for illustration purposes
const users = [
  { id: 1, username: 'user1', password: 'password1' },
];

// POST /auth/login to authenticate a user and issue a JWT
router.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);

  if (!user) {
    return res.status(401).json({ message: 'Invalid username or password' });
  }

  const token = jwt.sign(
    { userId: user.id, role: 'user' }, 
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );

  return res.json({ token });
});

module.exports = router;