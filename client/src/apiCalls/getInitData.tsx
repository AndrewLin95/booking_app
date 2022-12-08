export default async function getInitData() {
  const urlGuest = '/api/guests';
  const urlStaff = '/api/staffs';
  const requestOptions = {
    method: 'GET'
  };

  try {
    const responseGuest = await fetch(urlGuest, requestOptions);
    const dataGuest = await responseGuest.json();

    const responseStaff = await fetch(urlStaff, requestOptions);
    const dataStaff = await responseStaff.json();

    return { dataGuest, dataStaff };
  } catch (err) {
    console.log(err);
  }
}
