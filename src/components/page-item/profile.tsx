import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import CustomerForm from "../forms/customerForm";
import Modal from "../common/modal";

import { getCurrentUser } from "../../services/authService";
import {
  CustomerType,
  getCustomer,
  getCustomerById,
} from "../../services/userService";

const user = getCurrentUser();

const Profile = () => {
  const [customer, setCustomer] = useState<CustomerType | null>(null);
  const [modalActive, setModalActive] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    (async () => {
      if (id) {
        const { data: customer } = await getCustomerById(id);
        setCustomer(customer);
      } else {
        const { data: customer } = await getCustomer(user?._id);
        setCustomer(customer);
      }
    })();
  }, [id]);

  return (
    <div className="profile-section">
      {customer ? (
        <>
          <div>Name: {customer?.name}</div>
          <div>Phone Number: {customer?.phone}</div>
        </>
      ) : null}

      <div>Email: {user?.email}</div>
      <button
        onClick={() => {
          setModalActive(!modalActive);
        }}
        className="btn"
      >
        Edit Profile Information
      </button>
      <Modal
        active={modalActive}
        handleClick={() => setModalActive(!modalActive)}
      >
        <CustomerForm customer={customer} />
      </Modal>
    </div>
  );
};

export default Profile;
