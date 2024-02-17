import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { CustomerType, getCustomerById } from "../services/userService";

const Customer = () => {
  const [customer, setCustomer] = useState<CustomerType | null>(null);
  const { id } = useParams();

  useEffect(() => {
    (async () => {
      if (id) {
        const { data: customer } = await getCustomerById(id);
        setCustomer(customer);
      }
    })();
  }, [id]);

  return (
    <>
      <div>Customer Name: {customer?.name} </div>
      <div> Customer Phone: {customer?.phone}</div>
    </>
  );
};

export default Customer;
