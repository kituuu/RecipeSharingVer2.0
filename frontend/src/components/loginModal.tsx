"use client";

// import SignupForm from '@/components/signupForm';
import styled, { css } from "styled-components";
import * as React from "react";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { postLogin } from "@/api/postLogin";
import { postSignup } from "@/api/postSignup";
import Link from "next/link";
const LoginModal = () => {
  const [modalShown, setModalShown] = React.useState("login");
  const [isOpen, setOpen] = React.useState(false);
  const router = useRouter();
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const handleLoginClick = () => {
    setModalShown("login");
  };
  const handleRegClick = () => {
    setModalShown("reg");
  };
  const handleCloseClick = () => {
    setOpen(false);
  };
  const LoginForm = () => {
    // const router = useRouter ();

    const login = async (event: any) => {
      try {
        const token = await postLogin(
          event.target.username.value,
          event.target.password.value
        );
        sessionStorage.setItem("auth-token", token);
        handleCloseClick();
        toast.success("emu auth");
        router.push("/user");

        //code to update the login button and close the modal
      } catch (error) {
        console.error(error);
        toast.error("Login failed");
      }
    };

    return (
      <div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            login(e);
          }}
        >
          <input
            type="text"
            name="username"
            placeholder="username"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
          <br />
          <input
            type="text"
            name="password"
            placeholder="password"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
          <br />
          <button type="submit">Login</button>
        </form>
      </div>
    );
  };
  const SignupForm = () => {
    const signup = async (e: any) => {
      try {
        const token = await postSignup(
          e.target.username.value,
          e.target.password.value
        );
        sessionStorage.setItem("auth-token", token);
        handleCloseClick();
        router.push("/createProfile");
      } catch (error) {
        console.error(error);
        toast.error("err");
      }
    };

    return (
      <div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            signup(e);
          }}
        >
          <input
            type="text"
            name="username"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="username"
            required
          />
          <br />
          <input
            type="text"
            name="password"
            placeholder="password"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
          <br />

          <button type="submit">Sign up</button>
        </form>
      </div>
    );
  };

  return (
    <div className="container">
     3 <Link href="#" onClick={() => setOpen(!isOpen)}>
        SIGN UP
      </Link>
      {isOpen && (
        <>
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-90">
            <div className="bg-black absolute top-[30vh] right-20vw border   p-6 min-h-200 rounded-xl">
              <button
                className="absolute top-0 right-0 m-2 text-2xl "
                onClick={handleCloseClick}
              >
                &times;
              </button>
              {modalShown === "login" && (
                <div className="my-4">
                  <LoginForm />
                  <button
                    onClick={handleRegClick}
                    className="mx-4 text-sm mt-4 text-slate-500"
                  >
                    Don't have an account yet ? click to register
                  </button>
                </div>
              )}
              {modalShown === "reg" && (
                <div className="my-4">
                  <SignupForm />
                  <button
                    onClick={handleLoginClick}
                    className="mx-4 text-sm mt-4 text-slate-500"
                  >
                    Already have an account ? click to login
                  </button>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default LoginModal;
