export function getFirstFreeDay(rentedDates: Date[]) {
  const currentDay = new Date();
  currentDay.setHours(0, 0, 0, 0);
  while (true) {
    const occupied = rentedDates.some((date) => {
      return date.getTime() === currentDay.getTime();
    });

    if (!occupied) return currentDay;
    currentDay.setDate(currentDay.getDate() + 1);
  }
}
