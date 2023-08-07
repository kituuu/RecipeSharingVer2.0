"use client";
import { useState, useEffect, ChangeEvent } from "react";
import Link from "next/link";
import Postcards from "@/components/Postcards";
import { useRouter } from "next/navigation";
import axios from "axios";
import getLoginStatus from "@/utilites/getLoginStatus";
import Cookies from "js-cookie";
interface postCards {
  dishName: string;
  dishId: string;
  createdAt: string;
  userId: string;
  dishPhoto: string;
  id: string;
}
interface profileI {
  userId: string;
  name: string;
  bio: string;
  emailId: string;
  profilePhoto: string;
}
const ProfilePage = () => {
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

  const [profilePhotoExists, setProfilePhotoExists] = useState(false);

  const [profilePhoto, setProfilePhoto] = useState<File | null>();

  const getProfile = async () => {
    let authtoken;
    try {
      authtoken = Cookies.get("auth-token");
    } catch (err) {
      console.log(err);
    }
    let response1 = await axios.get(`http://127.0.0.1:8000/auth/test_token`, {
      headers: {
        accept: "application/json",
        Authorization: `Token ${authtoken}`,
      },
    });
    let data1 = await response1.data;
    let response2 = await axios.get(
      `http://127.0.0.1:8000/userProfile/getProfile/${data1[0]}`,
      {
        headers: {
          accept: "application/json",
          Authorization: `Token ${authtoken}`,
        },
      }
    );
    let data2 = await response2.data;
    if (data2.user_profile.profilePhoto) {
      setProfilePhotoExists(true);
    }
    let response3 = await axios.get(
      `http://127.0.0.1:8000/post/getUserPost/${data1[0]}`,
      {
        headers: {
          accept: "application/json",
          Authorization: `Token ${authtoken}`,
        },
      }
    );
    let data3 = await response3.data;

    console.log("response 3 " + authtoken);
    console.log("response 3 ", data3.message);
    setPosts(data3.message);
  };

  useEffect(() => {
    getProfile();
  }, []);

  const uploadProfilePhoto = async () => {
    try {
      const token = Cookies.get("auth-token");
      const data = {
        profilePhoto,
      };

      const response = await axios.put(
        "http://127.0.0.1:8000/userProfile/updateProfilePicture",
        data,
        {
          headers: {
            Authorization: `Token ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-gradient-to-r from-pink-200 to-white w-100  px-40 justify-center items-center h-full">
      <div className="bg-sky-950 w-6/7 m-auto h-1/2 rounded-lg flex flex-row">
        <div className="w-1/4 h-5/6 grid place-items-center p-5">
          {profilePhotoExists ? (
            <div>
              <img
              width={400}
              height={400}
              src="https://res.cloudinary.com/dkjuwu1ia/image/upload/v1689434856/blank-profile-picture_egsloo.png"
              alt="profilePhoto"
              className="object-cover rounded-lg border-white border-solid border-2 mx-auto p-2 my-2"
            />
            </div>
            
          ) : (
            <div>
              {/* // put  image svg here showing blank profile photo and an edit button to add the profile photo  */}
            </div>
          )}

          {/* <form onSubmit={(e) => {
          e.preventDefault();
            uploadProfilePhoto()
         }}>
           <input 
        type="file" 
        name="profile Photo" 
        placeholder="Upload profile picture"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
        onChange={(e:ChangeEvent<HTMLInputElement>)=>{setProfilePhoto(e.target.files[0])}}
        required
        />
        <button
          className="px-4 py-2 bg-blue-950 hover:bg-blue-800 text-white rounded-xl flex items-center gap-2"
          type="submit"
        >
         UPLOAD NEW PROFILE PICTURE
        </button>
         

         </form> */}
        </div>
        <div className="w-2/4 grid place-items-center">
          <h1 className="text-white text-2xl font-bold p-1 mx-auto my-2">
            userId: {profile.userId}
          </h1>
          <h1 className="text-white text-2xl font-bold p1 mx-auto my-2">
            userName: {profile.name}
          </h1>
          <h1 className="text-white text-2xl font-bold p-1 mx-auto my-2">
            EmailId: {profile.emailId}
          </h1>
        </div>
        <div className="w-1/4">
          <h1 className="text-white text-3xl font-extrabold mx-auto">Bio:</h1>
          <h1 className="text+white text-1xl font-bold mx-auto">
            {profile.bio}
          </h1>
        </div>
      </div>
      <Link
        className="text-black bg-blue-500 hower:bg-slate-500 p-2 rounded-full m-2"
        href={"/editProfile"}
      >
        Edit Profile
      </Link>
      <button
        onClick={() => router.push("/posts/new")}
        className="px-4 py-2 bg-blue-950 hover:bg-blue-800 text-white rounded-xl flex items-center gap-2"
      >
        CREATE NEW POST
      </button>
      <h1 className="text-4xl font-extrabold text-black p-1 mx-auto text-center">
        MY RECIPES
      </h1>
      <div className="flex flex-row p-2 ">
        {posts.map((Element: postCards) => {
          console.log(Element, "hello world");
          // return<h1>hello</h1>
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

export default ProfilePage;
