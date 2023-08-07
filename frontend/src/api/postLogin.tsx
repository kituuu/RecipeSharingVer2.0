import axios from "axios";

export async function postLogin (username : string, password:string) {
    try {
        const response = await axios.post('http://localhost:8000/auth/login' , {
            username:username,
            password:password,
        });
      return response.data.token;
    } catch (error) {
      console.log(error);
      throw new Error ('error signing in');
    }
  }