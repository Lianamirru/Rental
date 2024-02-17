import Joi from "joi";

const schema = Joi.object({
  username: Joi.string()
    .required()
    .label("Username")
    .min(5)
    .email({ tlds: { allow: false } }),
  password: Joi.string().required().label("Password").min(5),
});

export default schema;
