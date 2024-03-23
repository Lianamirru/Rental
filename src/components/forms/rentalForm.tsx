import { useState, useEffect, FormEvent, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { E164Number } from "libphonenumber-js";

import Button from "../common/form-elements/formButton";
import Calendar, { RangeType } from "../common/calendar/calendar";
import PhoneInput from "../common/form-elements/phoneInput";

import {
  editCustomer,
  getCustomer,
  saveCustomer,
} from "../../services/userService";
import { getInstruments } from "../../services/instrumentService";
import { saveRental } from "../../services/rentalService";
import { getCurrentUser } from "../../services/authService";
import { deleteFromCart } from "../../services/cartServise";

import {
  validateAll,
  validateInput,
} from "../../services/helper-functions/validateForm";
import {
  renderInput,
  renderSelectInput,
} from "../../services/helper-functions/renderInput";
import { useRentedDates } from "../../services/customHooks/getRentedDates";

import schema from "../schemas/rentalFormSchema";
import { InstrumentType } from "../../types/instrumentType";

const RentalForm = ({ instrument }: { instrument: InstrumentType }) => {
  const curInstrumentId = instrument._id;

  const [instruments, setInstruments] = useState<InstrumentInRental[]>([]);

  const [customerData, setCustomerData] = useState({
    customerName: "",
    phoneNumber: "",
    instrumentId: "",
  });
  const { customerName, phoneNumber, instrumentId } = customerData;

  const [errors, setErrors] = useState({
    customerName: "",
    phoneNumber: "",
    instrumentId: "",
  });

  const [isSaved, setIsSaved] = useState(false);
  const userId = getCurrentUser()?._id;

  const { rentedDates, range, setRange } = useRentedDates(instrumentId);

  useEffect(() => {
    (async () => {
      const { data: instrumentsData } = await getInstruments();
      const instruments: InstrumentInRental[] = [];
      instrumentsData.forEach((instrument) =>
        instruments.push({
          _id: instrument._id.toString(),
          name: instrument.maker + " " + instrument.model,
        })
      );
      setInstruments(instruments);

      const { data: customer } = await getCustomer(userId);
      if (customer) {
        const { name: customerName, phone: phoneNumber } = customer;
        setCustomerData((data) => ({ ...data, customerName }));
        setCustomerData((data) => ({ ...data, phoneNumber }));
      }
    })();
    setCustomerData((data) => ({ ...data, instrumentId: curInstrumentId }));
  }, [curInstrumentId]);

  const handleChange = ({
    target,
  }: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = target;
    const nameKey = name as InputKeys;

    const updatedData = { ...customerData };
    updatedData[nameKey] = value;

    setCustomerData(updatedData);
    setErrors(validateInput(errors, schema, name, value));
  };

  const handlePhoneChange = (value: E164Number | undefined) => {
    setCustomerData((data) => ({ ...data, phoneNumber: value || "" }));
    setErrors(
      validateInput(errors, schema, "phoneNumber", value?.toString() || "")
    );
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { data: customer } = await getCustomer(userId);
    let customerId: string;
    if (!customer) {
      const { data } = await saveCustomer(userId, customerName, phoneNumber);
      customerId = data;
    } else {
      if (JSON.stringify(customer) !== JSON.stringify(customerData)) {
        await editCustomer(customer._id, userId, customerName, phoneNumber);
      }
      customerId = customer._id;
    }
    const { startDate: dateOut, endDate: dateReturned } = range[0];
    try {
      await saveRental(customerId, instrumentId, dateOut, dateReturned);
      await deleteFromCart(instrumentId);
      setIsSaved(true);
    } catch (ex) {}
  };

  const handleDateSelect = (item: { selection: RangeType }) => {
    const range = [item.selection];
    setRange(range);
  };

  const navigate = useNavigate();
  const handleRefresh = () => {
    navigate("/");
  };

  if (isSaved)
    return (
      <>
        <p>Rental saved successfully!</p>
        <button className="btn" onClick={handleRefresh}>
          Continue
        </button>
      </>
    );

  return (
    <form onSubmit={handleSubmit}>
      <h2>Rental Form</h2>
      {renderSelectInput(
        "instrumentId",
        "Instrument",
        instruments as [],
        customerData,
        handleChange,
        errors
      )}
      <Calendar
        range={range}
        onChange={handleDateSelect}
        disabledDates={rentedDates}
      />
      {renderInput(
        "customerName",
        "Name",
        "text",
        customerData,
        handleChange,
        errors
      )}
      <PhoneInput
        phone={customerData.phoneNumber}
        onChange={(value) => handlePhoneChange(value)}
        error={errors["phoneNumber"]}
      />
      <Button label="Save" disabled={!!validateAll(schema, customerData)} />
    </form>
  );
};

export default RentalForm;

type InputKeys = keyof {
  customerName: string;
  phoneNumber: string;
  instrumentId: string;
};

type InstrumentInRental = { _id: string; name: string };
