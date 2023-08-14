const Joi = require("joi");

const schema = (req, res, next) => {
  const { error } = Joi.object({
    firstname : Joi.string().min(4).max(30).required(),
    lastname : Joi.string().min(4).max(30).required(),
    email: Joi.string().email().min(3).max(60).required(),
    phone_number:Joi.string().max(30),
    postal_code:Joi.string().max(30),
    profile_picture:Joi.string(),
    adress:Joi.string().max(50),
    city:Joi.string().max(30),
    is_producer: Joi.bool(),
    password: Joi.string()
      .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
      .min(12)
      .required(),
  }).validate(req.body, { abortEarly: false });
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  } else {
    next();
  }
};

module.exports = schema;
