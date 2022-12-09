export default async function getAppointments() {
  const urlGuest = '/api/appointments';
  const requestOptions = {
    method: 'GET'
  };

  try {
    const responseGuest = await fetch(urlGuest, requestOptions);
    const data = await responseGuest.json();

    return data;
  } catch (err) {
    console.log(err);
  }
}
