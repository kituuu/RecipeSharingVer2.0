import axios from "axios";

export async function getPostWithId(postId: string) {
  try {
    const response = await axios.get(
      `http://127.0.0.1:8000/post/getPost/${postId}`
    );
    console.log(response);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}
