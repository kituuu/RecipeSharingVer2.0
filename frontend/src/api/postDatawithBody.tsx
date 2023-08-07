import axios from "axios";

export async function postData(
  url: string,
  token: string | null,
  body: string
) {
  try {
    const response = await axios.post(url, {
      headers: {
        Authorization: `Token ${token}`,
        "Content-Type": "application/json",
      },
      body: body,
    });
    return response;
  } catch (error) {
    console.log(error);
  }
}
