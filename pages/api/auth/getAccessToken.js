import {
  getAccessToken,
  getSession,
  withApiAuthRequired,
} from "@auth0/nextjs-auth0";

export default async function tokenHandler(req, res) {
  const session = await getSession(req, res);
  //const token = session?.accessToken;
  const token = await getAccessToken(req, res);

  // const response = await fetch("http://localhost:3001/survey/getSurveys", {
  //   method: "GET",
  //   headers: {
  //     Authorization: `Bearer ${token}`,
  //   },
  // });
  // const data = await response.json();
  res.status(200).json({ token });
}
