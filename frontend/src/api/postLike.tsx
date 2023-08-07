import axios from "axios";

export async function postLike(
  postId: string | number,
  data: string,
  token: string | null
) {
  try {
    const response = await axios.post(
      `http://127.0.0.1:8000/likes/onClick/${postId}`,
      data,
      {
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response;
  } catch (error) {
    console.log(error);
  }
}
