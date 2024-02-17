import Joi from "joi";

const schema = Joi.object({
  username: Joi.string()
    .required()
    .label("Username")
    .email({ tlds: { allow: false } })
    .min(5),
  password: Joi.string().required().label("Password").min(5),
  name: Joi.string().required().label("Name").min(2),
});

export default schema;
