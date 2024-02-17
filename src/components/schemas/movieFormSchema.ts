import Joi from "joi";

const schema = Joi.object({
  _id: Joi.string(),
  title: Joi.string().required().label("Title").min(5),
  genreId: Joi.string().required().label("Genre"),
  numberInStock: Joi.number()
    .required()
    .min(0)
    .max(100)
    .label("Number In Stock"),
  dailyRentalRate: Joi.number().required().min(0).max(10).label("Rate"),
});

export default schema;
