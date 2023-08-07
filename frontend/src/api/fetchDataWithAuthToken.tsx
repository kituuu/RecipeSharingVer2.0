import axios from "axios";

export async function getDataWithAuthToken(url: string, authtoken: string) {
  try {
    const response = await axios.get(url, {
      headers: {
        accept: "application/json",
        Authorization: `Token ${authtoken}`,
      },
    });
    return response.status === 200;
  } catch (error) {
    console.log(error);
    return false;
  }
}
