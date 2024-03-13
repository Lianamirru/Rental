import { useState, FormEvent, ChangeEvent } from "react";
import { Link } from "react-router-dom";

import Button from "../common/form-elements/formButton";

import {
  validateProperty,
  validateAll,
} from "../../services/helper-functions/validateForm";
import schema from "../schemas/loginFormSchema";

import { login } from "../../services/authService";
import { renderInput } from "../../services/helper-functions/renderInput";

type DataType = { username: string; password: string };

const LoginForm = () => {
  const [state, setState] = useState<{ data: DataType; errors: DataType }>({
    data: { username: "", password: "" },
    errors: { username: "", password: "" },
  });

  const { data, errors } = state;

  const handleChange = ({
    target,
  }: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const updatedErrors = { ...errors };
    const updatedData = { ...data };
    const { name, value } = target;

    const errorMessage = validateProperty(schema, { name, value });

    if (errorMessage) updatedErrors[name as keyof DataType] = errorMessage;
    else delete updatedErrors[name as keyof DataType];
    updatedData[name as keyof DataType] = value;
    setState({ data: updatedData, errors: updatedErrors });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await login(data.username, data.password);
    } catch (ex: any) {
      if (ex.response && ex.response.status === 400) {
        const updatedErrors = { ...errors };
        updatedErrors.username = ex.response.data;
        setState({ ...state, errors: updatedErrors });
      }
    }
    window.location.replace("/");
  };

  return (
    <div>
      <h2>Log in</h2>
      <form onSubmit={handleSubmit}>
        {renderInput(
          "username",
          "Username",
          "text",
          data,
          handleChange,
          errors
        )}
        {renderInput(
          "password",
          "Password",
          "password",
          data,
          handleChange,
          errors
        )}
        <Button label="Log in" disabled={!!validateAll(schema, data)} />
        <Link to={"/register"}>Register</Link>
      </form>
    </div>
  );
};

export default LoginForm;
