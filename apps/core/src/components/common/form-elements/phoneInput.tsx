import Input from "react-phone-number-input/input";
import { E164Number } from "libphonenumber-js";

const PhoneInput = ({
  phone,
  onChange,
  error,
}: {
  phone: string;
  onChange: (value: E164Number | undefined) => void;
  error: string;
}) => {
  return (
    <div className="form-group">
      <label htmlFor="phone"> Phone number </label>
      <Input
        id="phone"
        className="form-control"
        defaultCountry="RU"
        value={phone}
        placeholder="+7 ___ ___-__-__"
        onChange={onChange}
      />
      {error && <div className="alert">{error}</div>}
    </div>
  );
};

export default PhoneInput;
