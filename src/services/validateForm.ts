import { Schema } from "joi";

interface Data {
  [key: string]: string;
}

export function validateAll(schema: Schema, data: Data) {
  const options = { abortEarly: false };

  const { error } = schema.validate(data, options);
  return error;
}

export function validateProperty(
  schema: Schema,
  { name, value }: { name: string; value: string }
) {
  const { error } = schema.extract(name).validate(value);
  return !error ? null : error.details[0].message;
}
