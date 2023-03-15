const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");
require("dotenv").config();
const secret = process.env.SECRET;
const emailFrom = process.env.EMAIL_FROM;
const sgMail = require("@sendgrid/mail");
const { nanoid } = require("nanoid");

const User = require("../../models/user");
const { schema } = require("../../validator/schemsJoiUsers");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

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
        const verificationToken = nanoid();
        const verificationLink = `users/verify/${verificationToken}`;
        const avatarURL = gravatar.url(email, {
          s: "250",
          r: "pg",
          d: "identicon",
        });
        const newUser = new User({ email, avatarURL, verificationToken });
        const { subscription } = newUser;
        newUser.setPassword(password);
        await newUser.save();
        await sgMail.send({
          to: email,
          from: emailFrom,
          subject: "Email Verification",
          text: `Please click on this link to verify your email: ${verificationLink}`,
        });

        res.status(201).json({
          code: 201,
          message: "success",
          data: {
            user: {
              email,
              subscription,
              avatarURL,
            },
          },
        });
      } catch (error) {
        next(error);
      }
    }
  }

  static async verify(req, res, next) {
    try {
      const { email } = req.body;
      if (!email) {
        return res
          .status(400)
          .json({ message: "missing required field email" });
      }
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      if (user.verify) {
        return res
          .status(400)
          .json({ message: "Verification has already been passed" });
      }
      const verificationToken = nanoid();
      const verificationLink = `users/verify/${verificationToken}`;
      user.verificationToken = verificationToken;
      await user.save();

      await sgMail.send({
        to: email,
        from: emailFrom,
        subject: "Email Verification",
        text: `Please click on this link to verify your email: ${verificationLink}`,
      });
      return res.json({ message: "Verification email sent successfully" });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Server Error" });
    }
  }

  static async verifyToken(req, res) {
    try {
      const user = await User.findOne({
        verificationToken: req.params.verificationToken,
      });
      if (!user) {
        return res.status(404).json({ error: "Not Found" });
      }
      user.verificationToken = null;
      user.verify = true;
      await user.save();
      return res.json({ message: "Verification Successful" });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Server Error" });
    }
  }
}

module.exports = AuthController;
