import jwt from 'jsonwebtoken';

const { JWT_SECRET } = process.env;

export const signJwt = (payload) => {


  const token = jwt.sign(payload.toJSON(), JWT_SECRET, {expiresIn: "1h"});
  return token;
};

const jwtUtil = {
  signJwt,
};

export default jwtUtil;
