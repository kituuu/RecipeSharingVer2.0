"use client";
import { createNewProfile } from "@/utilites/createNewProfile";
import getLoginStatus from "@/utilites/getLoginStatus";
import React from "react";
import { useState, useEffect, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
const CreateProfilePage = () => {
  const [name, setName] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [bio, setBio] = useState<string>();
  const [photo, setPhoto] = useState<File | null>();
  const router = useRouter();
  const onClickSubmit = async (event: any) => {
    event.preventDefault();
    try {
      let data = {
        name: event.target.name.value,
        profilePhoto: photo,
        bio: event.target.bio.value,
        emailId: event.target.email.value,
      };
      let body = JSON.stringify(data);
      let response = await createNewProfile(body);
      router.push("/user");
    } catch (e) {
      console.log(e);
    }
  };
  const [loginStatus, setLoginStatus] = useState(false);

  const checkLogin = async () => {
    const response = await getLoginStatus();
    if (!response) {
      console.log("bullshit");
    }
  };

  useEffect(() => {
    checkLogin();
  }, [loginStatus]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setPhoto(files[0]);
    } else {
      setPhoto(null);
    }
  };
  const tag = "";
  return (
    <div className="bg-gradient-to-r from-pink-200 to-white w-100 h-screen p-0.5 justify-center items-center">
      <h1 className="text-black text-bold p-2 mx-auto text-2xl">
        Create Profile
      </h1>
      <div className="block max-w-md rounded-lg bg-white p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
        <form onSubmit={onClickSubmit}>
          <div className="relative mb-6" data-te-input-wrapper-init>
            <h1>Name</h1>
            <input
              type="text"
              className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
              id="exampleInput7"
              placeholder="Name"
              name="name"
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
              name="email"
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
              required
              name="bio"
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
            data-te-ripple-init
            data-te-ripple-color="light"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateProfilePage;
