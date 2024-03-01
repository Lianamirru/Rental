import { useState, FormEvent, ChangeEvent } from "react";

import Input from "../common/form-elements/input";
import Button from "../common/form-elements/formButton";

import { validateProperty, validateAll } from "../../services/validateForm";
import schema from "../schemas/loginFormSchema";

import { getCurrentUser, login } from "../../services/authService";
import { Link } from "react-router-dom";

type DataType = { username: string; password: string };

const LoginForm = () => {
  const [state, setState] = useState<{ data: DataType; errors: DataType }>({
    data: { username: "", password: "" },
    errors: { username: "", password: "" },
  });

  const { data, errors } = state;

  const handleChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
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
      if (getCurrentUser()?.isAdmin) {
        // redirect admins to movie form they have been to
        window.location.replace("/");
      } else {
        window.location.replace("/");
      }
    } catch (ex: any) {
      if (ex.response && ex.response.status === 400) {
        const updatedErrors = { ...errors };
        updatedErrors.username = ex.response.data;
        setState({ ...state, errors: updatedErrors });
      }
    }
  };

  const renderInput = (
    type: "text" | "password",
    name: keyof DataType,
    label: string
  ) => {
    return (
      <Input
        type={type}
        name={name}
        label={label}
        value={data[name]}
        onChange={handleChange}
        error={errors[name]}
      />
    );
  };

  return (
    <div>
      <h1>Log in</h1>
      <form onSubmit={handleSubmit}>
        {renderInput("text", "username", "Username")}
        {renderInput("password", "password", "Password")}
        <Button label="Log in" disabled={!!validateAll(schema, data)} />
        <Link to={"/register"}>Register</Link>
      </form>
    </div>
  );
};

export default LoginForm;
