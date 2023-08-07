"use-client";
import React from "react";
import { postLogin } from "@/api/postLogin";
import { useRouter } from "next/navigation";
import toast, { Toaster } from 'react-hot-toast';
import Cookies from 'js-cookie';


const LoginForm = () => {
  // const router = useRouter ();

  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const router = useRouter();

  const login = async () => {
    try {
      const token = await postLogin(username,password)
      Cookies.set('auth-token', token);
      toast.success("emu auth")
      router.push('/user')
      router.refresh();
       
            //code to update the login button and close the modal

    } catch (error) {
      console.error(error);
      toast.error("Login failed");

      router.push("/")
      router.refresh();

    }
  };

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          login();
        }}
      >
        <input
          type="text"
          name="username"
          value={username}
          placeholder="username"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          onChange={(e) => setUsername(e.target.value)}
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

export default LoginForm;
