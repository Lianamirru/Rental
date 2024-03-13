import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import PhoneInput from "../common/form-elements/phoneInput";
import Modal from "../common/modal";
import Button from "../common/form-elements/formButton";

import { getCurrentUser } from "../../services/authService";
import {
  CustomerType,
  editCustomer,
  getCustomer,
  getCustomerById,
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
  console.log(customer?.name);

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

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    window.location.reload();
    const { data: customer } = await getCustomer(user?._id);
    if (JSON.stringify(customer) !== JSON.stringify(data)) {
      try {
        await editCustomer(customer._id, userId, customerName, phoneNumber);
      } catch (ex) {}
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Customer Form</h2>
      {renderInput("customerName", "Name", "text", data, handleChange, errors)}
      <PhoneInput
        phone={data.phoneNumber}
        onChange={(value) => {
          setData((prev) => ({ ...prev, phoneNumber: value || "" }));
          validateInput(errors, schema, "phoneNumber", value?.toString() || "");
        }}
        error={errors["phoneNumber"]}
      />
      <Button label="Save" disabled={!!validateAll(schema, data)} />
    </form>
  );
};

export default CustomerForm;
