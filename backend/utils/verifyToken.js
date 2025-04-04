import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;

  if (!token) {
    return res.status(401).json({ success: false, message: 'Unauthorized' });
  }

  // if token is valid, verify it
  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(403).json({ success: false, message: 'Token is invalid' });
    }
    req.user = user;
    next(); // don't forget to call next
  });
};

export const verifyUser = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id == req.params.id || req.user.role === 'admin') {
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