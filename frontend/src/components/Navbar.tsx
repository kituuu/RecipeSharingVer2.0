"use client";
import React from "react";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import LoginModal from "./loginModal";
import getLoginStatus from "@/utilites/getLoginStatus";
import Cookies from "js-cookie";

const Navbar = () => {
  const [loginStatus, setLoginStatus] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const router = useRouter();

  const LoginStatus = async () => {
    const response = await getLoginStatus();
    console.log(`response is ${response}`);
    response ? setLoginStatus(true) : setLoginStatus(false);
  };

  const handleAlert = () => {
    setShowAlert(true);
  };

  useEffect(() => {
    LoginStatus();
  }, [loginStatus]);

  useEffect(() => {
    if (showAlert) {
      alert("You need to login or register first!");
      setShowAlert(false);
    }
  }, [showAlert]);

  return (
    <>
      <nav className="bg-gradient-to-r from-pink-200 to-white w-100 px-8 md:px-auto">
        <div className="md:h-16 h-28 mx-auto md:px-4 container flex items-center justify-between flex-wrap md:flex-nowrap">
          {/* <Image width={80} src={logo} alt="logo" height={60} /> */}
          <div className="text-gray-500 order-3 w-full md:w-auto md:order-2">
            {loginStatus ? (
              <ul className="flex font-semibold justify-between">
                <li className="md:px-4 md:py-2 hover:text-black ">
                  <Link href="/home">Home </Link>
                </li>
                <li className="md:px-4 md:py-2 hover:text-black">
                  <Link href="/user">Profile </Link>
                </li>
                <li className="md:px-4 md:py-2 hover:text-black">
                  <Link href="/posts">MyCookBook </Link>
                </li>
                <li className="md:px-4 md:py-2 hover:text-black">
                  <Link href="/posts/new">Add Recipes </Link>
                </li>
              </ul>
            ) : (
              <ul className="flex font-semibold justify-between">
                <li className="md:px-4 md:py-2 text-black ">
                  <Link href="/home">Home </Link>
                </li>
                <li className="md:px-4 md:py-2 hover:text-black">
                  <Link href="#" onClick={handleAlert}>
                    {" "}
                    Profile
                  </Link>
                </li>
                <li className="md:px-4 md:py-2 hover:text-black">
                  <Link href="#" onClick={handleAlert}>
                    MyCookBook
                  </Link>
                </li>
                <li className="md:px-4 md:py-2 hover:text-black">
                  <Link href="#" onClick={handleAlert}>
                    Add Recipes
                  </Link>
                </li>
              </ul>
            )}
          </div>
          <div className="order-2 md:order-3 ">
            <div className="px-4 py-2 bg-blue-950 hover:bg-blue-800 text-white rounded-xl flex items-center gap-2">
              {loginStatus ? (
                <Link
                  href={"/"}
                  onClick={() => {
                    try {
                      Cookies.remove("auth-token");
                      LoginStatus();
                      router.push("/");
                    } catch (e) {
                      console.log(e);
                    }
                  }}
                >
                  LOGOUT
                </Link>
              ) : (
                <LoginModal />
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
