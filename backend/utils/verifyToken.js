import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
  // Expecting token in the Authorization header in the format: "Bearer <token>"
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ success: false, message: 'Unauthorized' });
  }

  const token = authHeader.split(" ")[1]; // Extract token from header

  if (!token) {
    return res.status(401).json({ success: false, message: 'Unauthorized' });
  }

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(403).json({ success: false, message: 'Token is invalid' });
    }
    req.user = user;
    next();
  });
};

export const verifyUser = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user._id == req.params.id) { // Check if the user id in the token matches the user id in the request
      next();
    } else {
      res.status(403).json({ success: false, message: 'Unauthorized' });
    }
  });
};

export const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.role === 'admin') {
      next();
    } else {
      res.status(403).json({ success: false, message: 'Unauthorized' });
    }
  });
};