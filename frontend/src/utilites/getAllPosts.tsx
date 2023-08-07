import { getDataWithoutAuthToken } from "@/api/fetchDataWithoutAuthToken";

export default async function getAllPost() {
  try {
    const response = await getDataWithoutAuthToken(
      "http://127.0.0.1:8000/post/getAllPost"
    );
    // console.log(data);
    return response?.data;
  } catch (e) {
    console.log(e);
  }
}
