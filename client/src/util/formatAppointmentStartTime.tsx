const formatAppointmentStartTime = (start: number) => {
  // array of [hour, minute]
  const tempArray = start.toString().split('');

  let startArray;
  if (tempArray.length === 4) {
    startArray = [
      `${tempArray[0]}${tempArray[1]}`,
      `${tempArray[2]}${tempArray[3]}`
    ];
  } else {
    startArray = [`${tempArray[0]}`, `${tempArray[1]}${tempArray[2]}`];
  }

  let formattedStartTime;
  let amPM;

  if (startArray[0] > '12' && startArray[0] < '24') {
    amPM = 'PM';
    formattedStartTime = parseInt(startArray[0]) - 12;
    startArray.splice(0, 1, formattedStartTime.toString());
  } else if (startArray[0] < '12') {
    amPM = 'AM';
  }

  const startTime = `${startArray[0]}:${startArray[1]}${amPM}`;

  return startTime;
};

export default formatAppointmentStartTime;
