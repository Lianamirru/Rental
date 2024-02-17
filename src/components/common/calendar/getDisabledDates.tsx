import moment from "moment";

type DisabledPeriodType = { startDate: Date; endDate: Date };

export function getDisabledDates(disabledPeriods: DisabledPeriodType[]) {
  const disabledDates = [];
  for (let disabledPeriod of disabledPeriods) {
    let currentDate = moment(disabledPeriod.startDate);
    const lastDate = moment(disabledPeriod.endDate);

    while (currentDate <= lastDate) {
      disabledDates.push(currentDate.toDate());
      currentDate = currentDate.add(1, "days");
    }
  }
  return disabledDates;
}
