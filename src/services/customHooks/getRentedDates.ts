import { useEffect, useState } from "react";
import { getRentedDates } from "../rentalService";
import { getDisabledDates } from "../../components/common/calendar/getDisabledDates";
import { getFirstFreeDay } from "../../components/common/calendar/getFirstFreeDay";
import { RangeType } from "../../components/common/calendar/calendar";

export const useRentedDates = (instrumentId: string) => {
  const [rentedDates, setRentedDates] = useState<Date[]>([]);
  const [range, setRange] = useState<RangeType[]>([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  useEffect(() => {
    (async () => {
      const { data } = await getRentedDates(instrumentId);
      const rentedPeriods = data.map((rental) => {
        const startDate = new Date(rental.dateOut);
        startDate.setHours(0, 0, 0, 0);
        const endDate = new Date(rental.dateReturned);
        endDate.setHours(0, 0, 0, 0);
        return { startDate, endDate };
      });
      const rentedDates = getDisabledDates(rentedPeriods);
      setRentedDates(rentedDates);

      const firstFreeDay = getFirstFreeDay(rentedDates);
      setRange([
        {
          startDate: firstFreeDay,
          endDate: firstFreeDay,
          key: "selection",
        },
      ]);
    })();
  }, [instrumentId]);

  return { rentedDates, range, setRange };
};
