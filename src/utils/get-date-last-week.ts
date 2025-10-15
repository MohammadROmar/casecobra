export function getDateLastWeek() {
  const today = new Date();
  const lastWeek = new Date(today);

  lastWeek.setDate(today.getDate() - 7);

  return lastWeek;
}

export function getDateLastMonth() {
  const today = new Date();
  const lastMonth = new Date(today);

  lastMonth.setDate(today.getDate() - 30);

  return lastMonth;
}
