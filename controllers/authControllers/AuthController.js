const jwt = require("jsonwebtoken");
require("dotenv").config();
// const SECRET = process.env.SECRET;
const { token } = require("morgan");
const User = require("../../schemas/user");

class AuthController {
  static async login(req, res, next) {}

  static async registration(req, res, next) {
    const { email, password, username } = req.body;

    const user = await User.findOne({ email });

    if (user) {
      return res.status(409).json({
        status: "error",
        code: 409,
        message: "Email is already in use",
        data: "Conflict",
      });
    }
    try {
      const newUser = new User({ username, email });
      newUser.setPassword(password);
      const { _id: id } = await newUser.save();
      jwt.sign({ id, username }, process.env.SECRET, { expiresIn: "3h" });
      console.log(token);

      res.status(201).json({
        status: "success",
        code: 201,
        data: {
          message: "Registration successful",
        },
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = AuthController;
