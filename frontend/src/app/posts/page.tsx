"use client";
import { useState, useEffect } from "react";
import Postcards from "@/components/Postcards";
import { useRouter } from "next/navigation";
import getLoginStatus from "@/utilites/getLoginStatus";
import axios from "axios";
import Cookies from "js-cookie";
interface postCards {
  id: string;
  dishName: string;
  dishId: string;
  createdAt: string;
  userId: string;
  dishPhoto: string;
}
interface profileI {
  userId: string;
  name: string;
  bio: string;
  emailId: string;
  profilePhoto: string;
}
const PostsPage = () => {
  const router = useRouter();
  const checkLogin = async () => {
    const response = await getLoginStatus();
    if (!response) {
      router.push("/home");
    }
  };

  checkLogin();

  let [profile, setProfile] = useState<profileI>({
    userId: "",
    name: "",
    bio: "",
    emailId: "",
    profilePhoto: "",
  });
  const [posts, setPosts] = useState<postCards[]>([]);
  // let profile:profileI;
  const getProfile = async () => {
    let authtoken;
    try {
      authtoken = Cookies.get("auth-token");
    } catch (err) {
      console.log(err);
    }
    console.log(authtoken);
    let response1 = await axios.get(`http://127.0.0.1:8000/auth/test_token`, {
      headers: {
        accept: "application/json",
        Authorization: `Token ${authtoken}`,
      },
    });
    let data1 = await response1.data;
    let response2 = await axios(
      `http://127.0.0.1:8000/userProfile/getProfile/${data1[0]}`,
      {
        method: "GET", // *GET, POST, PUT, DELETE, etc.
        // mode: "cors",
        headers: {
          accept: "application/json",
          Authorization: `Token ${authtoken}`,
        },
      }
    );
    let data2 = await response2.data;
    setProfile(data2.user_profile);
    let response3 = await axios(
      `http://127.0.0.1:8000/post/getUserLikedPost/${data1[0]}`,
      {
        method: "GET", // *GET, POST, PUT, DELETE, etc.

        headers: {
          accept: "application/json",
          Authorization: `Token ${authtoken}`,
        },
      }
    );
    let data3 = await response3.data;
    setPosts(data3.message);
  };
  useEffect(() => {
    getProfile();
  }, []);

  return (
    <div className="bg-gradient-to-r from-pink-200 to-white w-100 h-screen p-0.5 justify-center items-center">
      <h1 className="text-4xl font-extrabold text-black p-1 mx-auto text-center">
        SAVED RECIPES
      </h1>
      <div className="grid grid-cols-3 gap-4 p-2 ">
        {posts.map((Element: postCards) => {
          console.log(Element, "hello world");
          return (
            <Postcards

              key={Element.dishId}
              createdAt={Element.createdAt}
              dishId={Element.dishId}
              dishName={Element.dishName}
              userId={Element.userId}
              dishPhoto={Element.dishPhoto}
              id={Element.id}
            />
          );
        })}
      </div>
    </div>
  );
};

export default PostsPage;
