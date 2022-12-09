const formatAppointmentEndTime = (start: number, duration: number) => {
  // assumes your appointment cannot be overnight to the next day

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

  // converts duration to hours and minutes
  const durationToHours = Math.floor(duration / 60);
  const durationToMinutes = duration % 60;

  // add back to original time

  // minutes
  const endMinutes = parseInt(startArray[1]) + durationToMinutes;
  startArray.splice(1, 1, endMinutes.toString());

  // hours
  const endHour = parseInt(startArray[0]) + durationToHours;
  startArray.splice(0, 1, endHour.toString());

  let amPM;
  // convert back to 12 hour time
  if (startArray[0] > '12' && startArray[0] < '24') {
    amPM = 'PM';
    const endHour = parseInt(startArray[0]) - 12;
    startArray.splice(0, 1, endHour.toString());
  } else if (startArray[0] < '12') {
    amPM = 'AM';
  }

  const endTime = `${startArray[0]}:${startArray[1]}${amPM}`;

  return endTime;
};

export default formatAppointmentEndTime;
