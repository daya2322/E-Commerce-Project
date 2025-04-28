const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  const token = req.header('auth-token'); // Bearer <token>
  console.log(process.env.JWT_SECRET)

  if (!token) return res.status(401).json({ message: 'Access denied' });

  try {
    const decoded = jwt.verify(token, 'secret_ecom');
    req.userId = decoded.userId;
    console.log(req.userId)
    next();
  } catch (err) {
    return res.status(400).json({ message: 'Invalid token' });
  }
};

module.exports = auth;
