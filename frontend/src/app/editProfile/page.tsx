"use client";
import Navbar from "@/components/Navbar";
import axios from "axios";
import { useRouter } from "next/navigation";
import React from "react";
import { useState, useEffect, ChangeEvent } from "react";
const EditProfilePage = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [bio, setBio] = useState<string>("");
  const [photo, setPhoto] = useState<File | null>(null);
  const previousProfile = async () => {
    // let profile:profileI;

    let authtoken = sessionStorage.getItem("auth-token");
    let response1 = await axios.get(`http://127.0.0.1:8000/auth/test_token`, {
      headers: {
        accept: "application/json",
        Authorization: `Token ${authtoken}`,
      },
    });
    let data1 = await response1.data;
    console.log(data1[0]);
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
    console.log("data2");
    console.log(data2);
    setName(data2.user_profile.name);
    setEmail(data2.user_profile.emailId);
    setBio(data2.user_profile.bio);
    console.log(data2.user_profile);
  };
  useEffect(() => {
    previousProfile();
  }, []);
  const router = useRouter();
  const onClickSubmit = async () => {
    
      // console.log("cloudinary");
      // const response_cloud = await axios.post(
      //   `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUD_NAME}/upload`,
      //   {
      //     file: photo,
      //     upload_preset: "nextjs_upload_preset",
      //   },

      //   {
      //     headers: { "X-Requested-With": "XMLHttpRequest" },
      //   }
      // );
      // console.log(response_cloud);
      // // Handle the response from Cloudinary
      // console.log(response_cloud.data);

      // const dishPhoto = response_cloud.data.secure_url;
      try {
        let data = {
          name: name,
          profilePhoto: photo,
          bio: bio,
          emailId: email,
        };
        let body = JSON.stringify(data);
        let authtoken = sessionStorage.getItem("auth-token");
        let response1 = await axios.put(
          `http://localhost:8000/userProfile/updateProfile`,
          {
            method: "PUT", // *GET, POST, PUT, DELETE, etc.
            mode: "cors",
            headers: {
              accept: "application/json",
              Authorization: `Token ${authtoken}`,
            },
            body: body,
          }
        );
        console.log(response1)
        let data1 = await response1.data;
        console.log(data1);
      } catch (e) {
        console.log(e);
      }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setPhoto(files[0]);
    } else {
      setPhoto(null);
    }
  };

  return (
    <div className="bg-gradient-to-r from-pink-200 to-white w-100 h-screen p-0.5 justify-center items-center">
      <h1 className="text-black text-bold p-2 mx-auto text-2xl">
        Edit Profile
      </h1>
      <div className="block max-w-md rounded-lg bg-white p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
        <form>
          <div className="relative mb-6" data-te-input-wrapper-init>
            <h1>Name</h1>
            <input
              type="text"
              className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
              id="exampleInput7"
              placeholder="Name"
              required
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <label
              htmlFor="exampleInput7"
              className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
            ></label>
          </div>

          <div className="relative mb-6" data-te-input-wrapper-init>
            <h1>Email id</h1>
            <input
              type="email"
              className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
              id="exampleInput8"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
            />

            <label
              htmlFor="exampleInput8"
              className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
            ></label>
          </div>

          <div className="relative mb-6" data-te-input-wrapper-init>
            <h1>Bio</h1>
            <textarea
              className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
              id="exampleFormControlTextarea13"
              // rows="3"
              required
              value={bio}
              onChange={(e) => {
                setBio(e.target.value);
              }}
              placeholder="Message"
            ></textarea>
            <label
              htmlFor="exampleFormControlTextarea13"
              className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
            ></label>
          </div>

          <div className="relative mb-6" data-te-input-wrapper-init>
            <h1>ProfilePhoto</h1>
            <input
              type="file"
              className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
              id="exampleInput7"
              required
              onChange={handleFileChange}
              placeholder="Name"
            />
            <label
              htmlFor="exampleInput7"
              className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
            ></label>
          </div>

          <button
            type="submit"
            className="dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]] inline-block w-full rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
            // data-te-ripple-init
            onClick={onClickSubmit}
            // data-te-ripple-color="light"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProfilePage;
