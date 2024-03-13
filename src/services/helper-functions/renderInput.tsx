import { ChangeEvent } from "react";
import InputComponent from "../../components/common/form-elements/input";
import SelectInput from "../../components/common/form-elements/selectInput";

interface Data {
  [key: string]: string;
}

export function renderInput<T extends Data>(
  name: keyof T,
  label: string,
  type: "text" | "number" | "tel" | "password",
  data: T,
  handleChange: ({
    target,
  }: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void,
  errors: T
) {
  const nameKey = name as string;
  return (
    <InputComponent
      type={type}
      name={nameKey}
      label={label}
      value={data[name]}
      onChange={handleChange}
      error={errors[name]}
    />
  );
}

export function renderSelectInput<T extends Data>(
  name: keyof Data,
  label: string,
  options: [],
  data: T,
  handleChange: ({
    target,
  }: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void,
  errors: T
) {
  const nameKey = name as string;
  return (
    <SelectInput
      name={nameKey}
      label={label}
      value={data[name]}
      onChange={handleChange}
      error={errors[name]}
      options={options}
    />
  );
}
