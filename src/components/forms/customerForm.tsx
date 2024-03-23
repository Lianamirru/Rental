import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { E164Number } from "libphonenumber-js";

import PhoneInput from "../common/form-elements/phoneInput";
import Button from "../common/form-elements/formButton";

import { getCurrentUser } from "../../services/authService";
import {
  CustomerType,
  editCustomer,
  getCustomer,
  saveCustomer,
} from "../../services/userService";
import {
  validateAll,
  validateInput,
} from "../../services/helper-functions/validateForm";
import { renderInput } from "../../services/helper-functions/renderInput";

import schema from "../schemas/customerFormSchema";

type DataType = {
  customerName: string;
  phoneNumber: string;
};
type DataTypeKeys = keyof DataType;

type CustomerFormProps = {
  customer: CustomerType | null;
};

const user = getCurrentUser();
const userId = user?._id;

const CustomerForm = ({ customer }: CustomerFormProps) => {
  const [data, setData] = useState<DataType>({
    customerName: "",
    phoneNumber: "",
  });
  const { customerName, phoneNumber } = data;

  const [errors, setErrors] = useState({
    customerName: "",
    phoneNumber: "",
  });

  useEffect(() => {
    if (customer) {
      setData((prev) => ({
        ...prev,
        customerName: customer?.name,
        phoneNumber: customer?.phone,
      }));
    }
  }, [customer?._id]);

  const handleChange = ({
    target,
  }: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = target;
    const nameKey = name as DataTypeKeys;
    const updatedData = { ...data };
    updatedData[nameKey] = value;

    setData(updatedData);
    setErrors(validateInput(errors, schema, name, value));
  };

  const handlePhoneChange = (value: E164Number | undefined) => {
    setData((data) => ({ ...data, phoneNumber: value || "" }));
    setErrors(
      validateInput(errors, schema, "phoneNumber", value?.toString() || "")
    );
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { data: customer } = await getCustomer(user?._id);
    try {
      if (!customer) {
        await saveCustomer(user?._id, customerName, phoneNumber);
      } else {
        if (JSON.stringify(customer) !== JSON.stringify(data)) {
          await editCustomer(customer._id, userId, customerName, phoneNumber);
          window.location.reload();
        }
      }
    } catch (ex) {}
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Customer Form</h2>
      {renderInput("customerName", "Name", "text", data, handleChange, errors)}
      <PhoneInput
        phone={phoneNumber}
        onChange={(value) => handlePhoneChange(value)}
        error={errors["phoneNumber"]}
      />
      <Button label="Save" disabled={!!validateAll(schema, data)} />
    </form>
  );
};

export default CustomerForm;
