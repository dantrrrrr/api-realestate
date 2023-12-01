import jwt from "jsonwebtoken";

import { errorHandler } from "./error.js";
export const verifyToken = (req, res, next) => {
  console.log(req.params.id);
  const token = req.cookies.access_token;
  console.log("🚀 ~ file: verifyUser.js:7 ~ verifyToken ~ token:", token)
  if (!token) {
    return next(errorHandler(401, "Unauthorized"));
  }
  jwt.verify(token, process.env.JWT_SECRET, (error, user) => {
    if (error) {
      return next(errorHandler(403, "Forbidden"));
    }

    req.user = user;
    console.log("🚀 ~ file: verifyUser.js:17 ~ jwt.verify ~ user:", user)
    next();
  });
};
