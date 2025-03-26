// backend/utils/verifyToken.js
import jwt from 'jsonwebtoken';

export const verifyUser = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    // Replace 'your_jwt_secret' with your actual secret key
    const decoded = jwt.verify(token, "your_jwt_secret");
    // Ensure that decoded contains user information, e.g., decoded.id or decoded._id
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Token is not valid" });
  }
};
