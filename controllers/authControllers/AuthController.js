const jwt = require("jsonwebtoken");
require("dotenv").config();
const secret = process.env.SECRET;
const User = require("../../models/user");
const { schema } = require("../../validator/schemsJoiUsers");

class AuthController {
  static async login(req, res, next) {
    const { email, password } = req.body;

    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({
        code: 400,
        status: "Bad Request",
        data: { error },
      });
    } else {
      try {
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
        await User.findByIdAndUpdate(user._id, { token });

        res.status(200).json({
          code: 200,
          message: "success",
          data: {
            token,
            user: {
              email,
              subscription,
            },
          },
        });
      } catch (error) {
        console.error(error);
        return res
          .status(500)
          .json({ code: 500, message: "Internal Server Error" });
      }
    }
  }

  static async logout(req, res, next) {
    const { id } = req.user;
    // console.log(id);

    try {
      const user = await User.findById(id);
      if (!user) {
        return res.status(401).json({ message: "Not authorized" });
      }
      user.token = "";
      await user.save();
      return res.status(204).send();
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  static async registration(req, res, next) {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({
        code: 400,
        message: "Bad Request",
        data: { error },
      });
    } else {
      if (user) {
        return res.status(409).json({
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
          code: 201,
          message: "success",
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
