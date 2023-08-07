import axios from "axios";

export async function getDataWithoutAuthToken(url: string) {
  try {
    const response = await axios(url, {
      headers: {
        accept: "application/json",
      },
    });
    return response;
  } catch (e) {
    console.log(e);
  }
}
