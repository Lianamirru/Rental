import Joi from "joi";

const schema = Joi.object({
  customerName: Joi.string().required().min(1).label("Name"),
  instrumentId: Joi.string().required().label("Instrument"),
  phoneNumber: Joi.string().required().length(12).label("Phone"),
});

export default schema;
