const jwt = require("jsonwebtoken");

const secret = "mysecretsshhhhh";
const expiration = "2h";

function authMiddleware(req, res, next) {
  let token = req.query.token || req.headers.authorization;

  if (req.headers.authorization) {
    token = token.split(" ").pop().trim();
  }

  if (!token) {
    return res.status(400).json({ message: "You have no token!" });
  }

  try {
    const { data } = jwt.verify(token, secret, { maxAge: expiration });
    req.user = data;
  } catch {
    console.log("Invalid token");
    return res.status(400).json({ message: "invalid token!" });
  }

  next();
}

function signToken({ username, email, _id }) {
  const payload = { username, email, _id };
  return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
}

module.exports = { authMiddleware, signToken };
