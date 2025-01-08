const incrementDateByDays = (days = 0) => {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date;
};

module.exports = { incrementDateByDays };
