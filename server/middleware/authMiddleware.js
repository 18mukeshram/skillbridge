import jwt from "jsonwebtoken";
import { User } from "../models/User.js";

export const authRequired = async (req, res, next) => {
  const header = req.headers.authorization;

  if (!header || !header.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  const token = header.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;

    // optional: fetch user object
    req.user = await User.findById(decoded.userId).select("-passwordHash");

    next();
  } catch (err) {
    return res.status(401).json({ message: "Token is not valid" });
  }
};
