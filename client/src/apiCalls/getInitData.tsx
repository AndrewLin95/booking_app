export default async function getInitData() {
  const urlGuest = '/api/guests';
  const urlStaff = '/api/staffs';
  const urlService = '/api/services';
  const requestOptions = {
    method: 'GET'
  };

  try {
    const responseGuest = await fetch(urlGuest, requestOptions);
    const dataGuest = await responseGuest.json();

    const responseStaff = await fetch(urlStaff, requestOptions);
    const dataStaff = await responseStaff.json();

    const responseService = await fetch(urlService, requestOptions);
    const dataService = await responseService.json();

    return { dataGuest, dataStaff, dataService };
  } catch (err) {
    console.log(err);
  }
}
