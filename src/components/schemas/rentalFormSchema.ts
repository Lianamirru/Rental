import Joi from "joi";

const schema = Joi.object({
  customerName: Joi.string().required().min(1).label("Name"),
  instrumentId: Joi.string().required().label("Instrument"),
  phone: Joi.string().required().length(12).label("Phone number"),
});

export default schema;
