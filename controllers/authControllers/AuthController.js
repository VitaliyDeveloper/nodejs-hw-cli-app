const jwt = require("jsonwebtoken");
require("dotenv").config();
const secret = process.env.SECRET;
const User = require("../../schemas/user");

class AuthController {
  static async login(req, res, next) {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user || !user.validPassword(password)) {
      return res.status(400).json({
        status: "error",
        code: 400,
        message: "Incorrect login or password",
        data: "Bad request",
      });
    }

    const { _id: id, username } = user;

    const token = await jwt.sign({ id, username }, secret, { expiresIn: "1h" });

    res.json({
      status: "success",
      code: 200,
      data: {
        token,
      },
    });

    // console.log(token);
  }

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
      await newUser.save();

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
