const jwt = require("jsonwebtoken");

const checkToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
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
