import Joi from "joi";

const schema = Joi.object({
  customerName: Joi.string().required().min(1).label("Name"),
  movieId: Joi.string().required().label("Movie"),
  phone: Joi.string().required().length(12).label("Phone number"),
});

export default schema;
