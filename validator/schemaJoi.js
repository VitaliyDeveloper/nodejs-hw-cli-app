const Joi = require("joi");

const schema = Joi.object({
  name: Joi.string().min(3).max(30).required(),

  email: Joi.string()
    .email({
      tlds: { allow: ["com", "net", "ru"] },
    })
    .required(),

  phone: Joi.string().min(10).max(20).required(),

  favorite: Joi.boolean().default(false),
});

module.exports = {
  schema,
};
