import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { useState, useRef, useEffect } from "react";

import { format, endOfYear } from "date-fns";
import { DateRange } from "react-date-range";

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
    document.addEventListener("keydown", hideOnEscape, true);
    document.addEventListener("click", hideOnClickOutside, true);
  }, []);

  function hideOnEscape(event: globalThis.KeyboardEvent) {
    if (event.key === "Escape") {
      setOpen(false);
    }
  }

  const hideOnClickOutside = (event: globalThis.MouseEvent) => {
    const target = event.target as HTMLElement;
    if (refOne.current && !refOne.current.contains(target)) {
      setOpen(false);
    }
  };

  return (
    <>
      <div className="form-group">
        <label htmlFor="daterange"> Rental period </label>
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
          id="daterange"
        />
      </div>

      <div
        style={{ display: "inline-block", position: "absolute" }}
        ref={refOne}
      >
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
