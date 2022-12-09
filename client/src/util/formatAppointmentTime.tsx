const formatAppointmentTime = (start: string, duration: number) => {
  // assumes your appointment cannot be overnight to the next day

  const arrayTranform1 = start.split(' ');
  const arrayTransform2 = arrayTranform1[0].split(':');

  // array of [hour, minute, pm]
  const startArray = [...arrayTransform2, arrayTranform1[1]];

  // converts the hour to 24 hour time. Easier to add minutes
  if (startArray[2] === 'PM') {
    const newHour = parseInt(startArray[0]) + 12;
    startArray.splice(0, 1, newHour.toString());
  }

  // converts duration to hours and minutes
  const durationToHours = Math.floor(duration / 60);
  const durationToMinutes = duration % 60;

  // add back to original time
  const sumHour = parseInt(startArray[0]) + durationToHours;
  const endMinutes = parseInt(startArray[1]) + durationToMinutes;

  startArray.splice(0, 1, sumHour.toString());
  startArray.splice(1, 1, endMinutes.toString());

  // convert back to 12 hour time
  if (startArray[0] > '12' && startArray[0] < '24') {
    const endHour = parseInt(startArray[0]) - 12;
    startArray.splice(0, 1, endHour.toString());
  }

  const endTime = `${startArray[0]}:${startArray[1]} ${startArray[2]}`;

  return endTime;
};

export default formatAppointmentTime;
