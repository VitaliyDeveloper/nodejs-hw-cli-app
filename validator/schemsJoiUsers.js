const Joi = require("joi");

const schema = Joi.object({
  username: String,

  email: Joi.string()
    .email({
      tlds: { allow: ["com", "net", "ru"] },
    })
    .required(),

  password: Joi.string().min(8).max(20).required(),

  subscription: Joi.string()
    .valid("starter", "pro", "business")
    .default("starter"),

  token: Joi.string(),

  owner: Joi.string(),

  avatarURL: Joi.string(),

  verify: Joi.string(),

  verificationToken: Joi.string(),
});

module.exports = {
  schema,
};
