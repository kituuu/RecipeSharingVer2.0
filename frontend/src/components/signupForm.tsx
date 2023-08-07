"use-client"
import React from "react";
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { postSignup } from "@/api/postSignup";
// import LoginModal from "@/components/loginModal"

const SignupForm = () => {
    
  const router = useRouter();

    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    

    const signup = async () => {
        try {
            const token = await postSignup(username,password)
            sessionStorage.setItem('auth-token' ,token)
            router.push('/createProfile')
            } catch (error) {
            console.error(error);
            throw new Error('Signup failed');
        }  
        }


  return (
    <div>
      <form  onSubmit={(e) => {
          e.preventDefault();
          signup();
        }}
      >
        <input 
        type="text" 
        name="username" 
        value={username} 
        placeholder="username"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
        onChange={(e) => setUsername(e.target.value)}
        required
        />
        <br />
        <input 
        type="text" 
        name="password" 
        placeholder="password" 
        value={password}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
        onChange={(e) => setPassword(e.target.value)}
        required
        />
        <br />
      
        <button type="submit">Sign up</button>
      </form>
    </div>
    
  )
}

export default SignupForm