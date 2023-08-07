"use client";
import { postData } from "@/api/postDatawithBody";
import Cookies from "js-cookie";

export async function createNewProfile(body: string) {
  try {
    const authtoken = Cookies.get("auth-token");
    const response = await postData(
      "http://127.0.0.1:8000/userProfile/create",
      authtoken,
      body
    );
    console.log(authtoken);
    console.log("chal gya");
  } catch (error) {
    console.log(error);
  }
}
