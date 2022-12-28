export const getClientAccessToken = async () => {
  const resToken = await fetch(`http://localhost:3002/api/auth/getAccessToken`);
  let dataJsoned = await resToken.json();
  console.log(dataJsoned.token.accessToken);
  return dataJsoned.token.accessToken;
};
