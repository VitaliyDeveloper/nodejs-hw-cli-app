const jwt = require("jsonwebtoken");
require("dotenv").config();
const secret = process.env.SECRET;
const User = require("../../schemas/user");
const { schema } = require("../../validator/schemsJoiUsers");

class AuthController {
  static async login(req, res, next) {
    const { email, password } = req.body;

    const { error } = schema.validate(req.body);
    if (error) {
      return res.json({
        code: 400,
        status: "Bad Request",
        data: { error },
      });
    } else {
      const user = await User.findOne({ email });
      const { subscription } = user;
      if (!user || !user.validPassword(password)) {
        return res.status(400).json({
          status: "error",
          code: 400,
          message: "Incorrect login or password",
          data: "Bad request",
        });
      }

      const { _id: id } = user;
      const token = await jwt.sign({ id }, secret, {
        expiresIn: "1h",
      });

      res.json({
        status: "success",
        code: 200,
        data: {
          token,
          user: {
            email,
            subscription,
          },
        },
      });
    }
  }

  static async logout(req, res, next) {
    const user = await User.findById(req.user._id);
    console.log(user);

    if (!user) {
      return res.json({
        code: 401,
        status: "Unauthorized",
        message: "Not authorized",
      });
    }

    user.token = null;
    await user.save();

    res.status(204).send();
  }

  static async registration(req, res, next) {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    const { error } = schema.validate(req.body);
    if (error) {
      return res.json({
        code: 400,
        status: "Bad Request",
        data: { error },
      });
    } else {
      if (user) {
        return res.status(409).json({
          status: "error",
          code: 409,
          message: "Email is already in use",
          data: "Conflict",
        });
      }
      try {
        const newUser = new User({ email });
        newUser.setPassword(password);
        await newUser.save();
        const { subscription } = newUser;
        res.status(201).json({
          status: "success",
          code: 201,
          data: {
            user: {
              email,
              subscription,
            },
          },
        });
      } catch (error) {
        next(error);
      }
    }
  }
}

module.exports = AuthController;
