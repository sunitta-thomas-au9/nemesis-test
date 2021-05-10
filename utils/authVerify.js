import jwt from 'jsonwebtoken'
import config from '../config.js';
export const authverify = (req, res, next) => {
  let token = req.headers["x-access-token"];
  console.log("token",token)
  if (!token) {
    return res.send({ err: "No token provided!" });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.send({ err });
    }
    req.email = decoded.email;
    next();
  });
}