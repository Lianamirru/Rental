import { ObjectSchema, Schema } from "joi";

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

export function validateInput<T extends Data>(
  errors: T,
  schema: ObjectSchema,
  name: string,
  value: string
) {
  const nameKey = name as keyof T;
  const updatedErrors = { ...errors };
  const errorMessage = validateProperty(schema, { name, value });
  if (errorMessage) updatedErrors[nameKey] = errorMessage as T[keyof T];
  else delete updatedErrors[nameKey];
  return updatedErrors;
}
