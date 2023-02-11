export const getClientAccessToken = async () => {
  const resToken = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/getAccessToken`
  );
  let dataJsoned = await resToken.json();
  console.log(dataJsoned.token.accessToken);
  return dataJsoned.token.accessToken;
};
