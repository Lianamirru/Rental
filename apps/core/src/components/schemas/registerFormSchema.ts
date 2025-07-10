import Joi from "joi";

const schema = Joi.object({
  username: Joi.string()
    .required()
    .label("Username")
    .email({ tlds: { allow: false } })
    .min(5),
  password: Joi.string().required().label("Password").min(5),
});

export default schema;
