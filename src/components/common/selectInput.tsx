import { ChangeEventHandler } from "react";

type SelectInputProps<T> = {
  name: string;
  label: string;
  error: string;
  value: string;
  onChange: ChangeEventHandler<HTMLSelectElement>;
  options: T[];
};

const SelectInput = <T extends { _id: string; name: string }>({
  name,
  label,
  error,
  options,
  ...rest
}: SelectInputProps<T>) => {
  return (
    <div className="form-group">
      <label htmlFor={name}> {label} </label>
      <select className="form-control" id={name} name={name} {...rest}>
        <option value="" />
        {options.map((item) => (
          <option key={item._id} value={item._id}>
            {item.name}
          </option>
        ))}
      </select>
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default SelectInput;
