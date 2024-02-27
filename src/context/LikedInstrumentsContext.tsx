import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { getRentals, RentalType } from "../services/rentalService";
import { getCurrentUser } from "./../services/authService";

const RentalsContext = createContext<{
  rentals: RentalType[];
  updateRentals: (newRental: RentalType) => void;
}>({
  rentals: [],
  updateRentals: () => {},
});

const RentalsProvider = ({ children }: { children: ReactNode }) => {
  const [rentals, setRentals] = useState<RentalType[]>([]);
  const user = useMemo(() => getCurrentUser(), []);

  useEffect(() => {
    (async () => {
      if (user)
        try {
          const { data: initRentals } = await getRentals();
          setRentals(initRentals);
        } catch (ex) {}
    })();
  }, [user]);

  const updateRentals = (newRental: RentalType) => {
    const updatedRentals = [...rentals];
    updatedRentals.push(newRental);
    setRentals(updatedRentals);
  };

  return (
    <RentalsContext.Provider value={{ rentals, updateRentals }}>
      {children}
    </RentalsContext.Provider>
  );
};

export const useRentals = () => useContext(RentalsContext);
export default RentalsProvider;
