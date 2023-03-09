const jwt = require("jsonwebtoken");
const secret = process.env.SECRET;

const checkToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, secret, (err, user) => {
      if (err) {
        return res.status(401).json({ message: "Not authorized" });
      }
      req.user = user;
      next();
    });
  } else {
    res.status(401).json({ message: "Not authorized" });
  }
};

module.exports = checkToken;
