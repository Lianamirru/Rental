import { useState, FormEvent, ChangeEvent } from "react";

import Input from "../common/form-elements/input";
import Button from "../common/form-elements/formButton";

import { validateProperty, validateAll } from "../../services/validateForm";
import schema from "../schemas/registerFormSchema";

import { login } from "../../services/authService";
import * as userService from "../../services/userService";
import { logger } from "../../services/logService";

import { RegisterUserType } from "../../types/userType";
import { Link } from "react-router-dom";

type RegisterUserTypeKeys = keyof RegisterUserType;

const RegisterForm = () => {
  const [state, setState] = useState<{
    data: RegisterUserType;
    errors: RegisterUserType;
  }>({
    data: { username: "", password: "" },
    errors: { username: "", password: "" },
  });

  const { data, errors } = state;

  const handleChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const updatedErrors = { ...errors };
    const updatedData = { ...data };
    const { name, value } = target;

    const errorMessage = validateProperty(schema, { name, value });

    const nameKey = name as RegisterUserTypeKeys;

    if (errorMessage) updatedErrors[nameKey] = errorMessage;
    else delete updatedErrors[nameKey];
    updatedData[nameKey] = value;
    setState({ data: updatedData, errors: updatedErrors });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await userService.register(data);
      await login(data.username, data.password);
      window.location.replace("/");
    } catch (ex: any) {
      if (ex.response && ex.response.status === 400) {
        const updatedErrors = { ...errors };
        updatedErrors.username = ex.response.data;
        setState({ ...state, errors: updatedErrors });
      } else {
        logger(ex);
      }
    }
  };

  const renderInput = (
    type: "text" | "password",
    name: RegisterUserTypeKeys,
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
      <h1>Register form</h1>
      <form onSubmit={handleSubmit}>
        {renderInput("text", "username", "Username")}
        {renderInput("password", "password", "Password")}
        <Button label="Sign in" disabled={!!validateAll(schema, data)} />
        <Link to={"/login"}>Log in</Link>
      </form>
    </div>
  );
};

export default RegisterForm;
