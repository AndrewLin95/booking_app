const retrieveTodayDate = () => {
  const today = new Date();
  const dd = String(today.getDate()).padStart(2, '0');
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const yyyy = today.getFullYear();
  const formattedDate = yyyy + '-' + mm + '-' + dd;

  return formattedDate;
};

export default retrieveTodayDate;
