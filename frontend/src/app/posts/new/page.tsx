"use client";
import React, { ChangeEvent } from "react";
import axios from "axios";
import getLoginStatus from "@/utilites/getLoginStatus";
import { useRouter } from "next/navigation";
import { Cloudinary } from "cloudinary-core";
import { env } from "process";
const NewPostPage = () => {
  const router = useRouter();

  const checkLogin = async () => {
    const response = await getLoginStatus();
    if (!response) {

      router.push("/home");
    }
  };

  checkLogin(); //checks if user is logged in

  const [dishName, setDishName]:[string,Function] = React.useState("");
  const [dishBio, setDishBio]: [string, Function] = React.useState("");
  const [dishCuisine, setDishCuisine]: [string, Function] = React.useState("");
  const [dishTime, setDishTime]:[string,Function] = React.useState("");
  const [dishPic, setDishPic] = React.useState<File | string>(" "); //this is used to upload the pic to cloudinary

  const upload = async () => {
    try {
      const token = sessionStorage.getItem("auth-token");

      const formData = new FormData();
      formData.append("file", dishPic);
      formData.append("upload_preset", "nextjs_upload_preset");
      console.log(formData);
      const response_cloud = await axios.post(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUD_NAME}/upload`,
        formData,

        {
          headers: { "X-Requested-With": "XMLHttpRequest" },
        }
      );

      // Handle the response from Cloudinary
      console.log(response_cloud.data);

      const dishPhoto = response_cloud.data.secure_url;

      const data = {
        dishName,
        dishBio,
        dishCuisine,
        dishTime,
        dishPhoto,
      };

      console.log(data);

      const response = await axios.post(
        "http://127.0.0.1:8000/post/create",
        data,
        {
          headers: {
            Authorization: `Token ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      // console.log(response.data)
      router.push("/home");
    } catch (error) {
      console.log(error);
      throw new Error("Post failed");
    }
  };

  return (
    <div>
      {" "}
      {/* this is going to be the page where user can upload a new post */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          upload();
        }}
      >
        <input
          type="text"
          name="dish Name"
          value={dishName}
          placeholder="Title of your dish"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          onChange={(e) => setDishName(e.target.value)}
          required
        />
        <input
          type="text"
          name="dish Bio"
          value={dishBio}
          placeholder="Put your content here"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          onChange={(e) => setDishBio(e.target.value)}
          required
        />
        <input
          type="text"
          name="dish Cuisine"
          value={dishCuisine}
          placeholder="Cuisine of your dish"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          onChange={(e) => setDishCuisine(e.target.value)}
          required
        />
        <input
          type="number"
          name="dish time"
          value={dishTime}
          placeholder="time it would take to prepare this dish"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          onChange={(e) => setDishTime(e.target.value)}
          required
        />
        <input
          type="file"
          name="dish Photo"
          // value={dishPhoto}
          placeholder="Upload image of your dish"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setDishPic(e.target.files? e.target.files[0] : " ");
          }}
          required
        />
        <button
          className="px-4 py-2 bg-blue-950 hover:bg-blue-800 text-white rounded-xl flex items-center gap-2"
          type="submit"
        >
          CREATE NEW POST
        </button>
      </form>
    </div>
  );
};

export default NewPostPage;
