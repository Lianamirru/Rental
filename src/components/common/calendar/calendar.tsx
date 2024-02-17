import { useState, useRef, useEffect, KeyboardEvent, MouseEvent } from "react";

import { format, endOfYear } from "date-fns";
import { DateRange } from "react-date-range";

import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

export type RangeType = {
  startDate: Date;
  endDate: Date;
  key: string;
};

const Calendar = ({
  range,
  onChange,
  disabledDates,
}: {
  range: RangeType[];
  onChange: (item: any) => void;
  disabledDates: Date[];
}) => {
  const [open, setOpen] = useState(false);
  const refOne: React.MutableRefObject<null | HTMLInputElement> = useRef(null);

  useEffect(() => {
    // @ts-ignore
    document.addEventListener("keydown", hideOnEscape, true);
    //@ts-ignore
    document.addEventListener("click", hideOnClickOutside, true);
  }, []);

  function hideOnEscape(e: KeyboardEvent<Document>) {
    if (e.key === "Escape") {
      setOpen(false);
    }
  }

  const hideOnClickOutside = (e: MouseEvent<Document>) => {
    const target = e.target as HTMLElement;
    if (refOne.current && !refOne.current.contains(target)) {
      setOpen(false);
    }
  };

  return (
    <>
      <div className="form-group">
        <label htmlFor={"daterange"}> Rental period </label>
        <input
          value={
            range
              ? `${format(range[0].startDate, "dd/MM/yyyy")} to ${format(
                  range[0].endDate,
                  "dd/MM/yyyy"
                )}`
              : ""
          }
          readOnly
          className="inputBox form-control"
          onClick={() => setOpen((open) => !open)}
        />
      </div>

      <div style={{ display: "inline-block" }} ref={refOne}>
        {open && (
          <DateRange
            onChange={onChange}
            editableDateInputs={true}
            moveRangeOnFirstSelection={false}
            ranges={range}
            months={1}
            minDate={new Date()}
            maxDate={endOfYear(new Date())}
            disabledDates={disabledDates}
          />
        )}
      </div>
    </>
  );
};

export default Calendar;
