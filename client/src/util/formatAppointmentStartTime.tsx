const formatAppointmentStartTime = (start: string) => {
  // array of [hour, minute]
  const startArray = start.split(':');
  let formattedStartTime;
  let amPM;

  if (startArray[0] > '12' && startArray[0] < '24') {
    amPM = 'PM';
    formattedStartTime = parseInt(startArray[0]) - 12;
    startArray.splice(0, 1, formattedStartTime.toString());
  } else if (startArray[0] < '12') {
    amPM = 'AM';
  }

  const startTime = `${startArray[0]}:${startArray[1]} ${amPM}`;

  return startTime;
};

export default formatAppointmentStartTime;
