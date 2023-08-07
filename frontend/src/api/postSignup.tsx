import axios from "axios";
export async function postSignup(username: string, password: string) {
  try {
    console.log("trying to signup");
    const response = await axios.post("http://127.0.0.1:8000/auth/signup", {
      username: username,
      password: password,
    });
    return response.data.token;
  } catch (error) {
    console.log(error);
    throw new Error("error signing in");
  }
}
