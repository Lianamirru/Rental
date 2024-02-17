import { ChangeEventHandler } from "react";

type InputProps = {
  name: string;
  label: string;
  error: string;
  type: string;
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  placeholder?: string;
};

const Input = ({ name, label, error, onChange, ...rest }: InputProps) => {
  return (
    <div className="form-group">
      <label htmlFor={name}> {label} </label>
      <input
        {...rest}
        onChange={onChange}
        id={name}
        name={name}
        className="form-control"
      />
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Input;
