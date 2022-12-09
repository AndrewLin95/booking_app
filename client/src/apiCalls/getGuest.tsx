export default async function getInitData() {
  const urlGuest = '/api/guests';
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
