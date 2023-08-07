"use client";
import Image from "next/image";
import * as React from "react";
import { useState, useEffect } from "react";
import Postcards from "@/components/Postcards";
import cookPhoto from "../../../public/cook.svg";
import foodPhoto1 from "../../../public/header_food_frame.svg";
import { BsSearch } from "react-icons/bs";
import toast, { Toaster } from "react-hot-toast";
import { dish } from "@/utilites/interface";
import axios from "axios";
import Link from "next/link";

// interface postCards{
//   id: string,
//   dishName:string,
//   dishId:string,
//   createdAt:string,
//   userId:string,
//   dishPhoto:string
// }

const HomePage = () => {
  const [posts, setPosts] = useState<dish[]>([]);
  const [searchTerm, setSearchTerm]: [string, Function] = useState("");
  const [isSearch, setIsSearch]: [boolean, Function] = useState(false);
  const [searchDishes, setSearchDishes] = useState<dish[]>([]);
  const search = () => {
    setIsSearch(true);
    let temp: dish[] = [];
    posts.map((post) => {
      if (
        post.dishName
          .toLowerCase()
          .trim()
          .includes(searchTerm.toLowerCase().trim()) ||
        post.dishBio
          .toLowerCase()
          .trim()
          .includes(searchTerm.toLowerCase().trim())
      ) {
        console.log("inside if", post.dishName);
        temp.push(post);
      }
    });
    setSearchDishes(temp);
    setSearchTerm("");

    console.log("inside search function", searchTerm);
  };

  const getAllReciepes = async () => {
    try {
      const response: any = await axios.get(
        "http://127.0.0.1:8000/post/getAllPost"
      );
      const posts: dish[] = await response.data.message;
      console.log(`posts response are ${response}`, posts);
      setPosts(posts);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllReciepes();
  }, []);
  return (
    <div className="bg-gradient-to-r from-pink-200 to-white w-100 h-100 px-40 justify-center items-center h-full">
      <div className="bg-sky-950 w-18/19 h-1/2 items-center justify-around p-10 rounded-3xl mx-auto flex-row flex">
        <Toaster />

        <div className="grid grid-cols-2 gap-10">
          <div className="col-span-1 p-2">
            <div className="font-extrabold text-5xl">Discover Simple</div>
            <div className="font-extrabold text-5xl ">Delicious, And</div>
            <div className="font-extrabold text-5xl text-pink-600">
              Fast Recipes
            </div>
            <h1 className="text-1xl pt-2 ">
              A recipe is soulless. The essence of the recipe
            </h1>
            <h1 className="text-1xl pb-2">A must come from you, the cook.</h1>
            <div className="py-2">
              <button className="bg-white rounded-lg hover:bg-slate-50 p-2 text-black m-2">
                Read more
              </button>
            </div>
            <div className="flex-row flex pt-5">
              <Image src={foodPhoto1} alt="" />
            </div>
          </div>
          <div className="col-span-1">
            <Image src={cookPhoto} alt="cook photo" width={500} height={400} />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4 pt-10">
        <div className="col-span-1">
          <h1 className="font-extrabold text-4xl p-2 text-black w-1/2  m-auto">
            Cuisines
          </h1>
          <div className="grid-rows-4 pl-24">
            <div className="block text-black rounded-full   w-1/2 bg-transparent p-1  m-1   border-solid border-2 text-center hover:bg-sky-950 hover:text-white">
              <Link href="#">Indian Cuisine</Link>
            </div>

            <div className="block text-black rounded-full   w-1/2 bg-transparent p-1  m-1   border-solid border-2 text-center hover:bg-sky-950 hover:text-white">
              <Link href="#">Indian Cuisine</Link>
            </div>
            <div className="block text-black rounded-full   w-1/2 bg-transparent p-1  m-1   border-solid border-2 text-center hover:bg-sky-950 hover:text-white">
              <Link href="#">Indian Cuisine</Link>
            </div>
            <div className="block text-black rounded-full   w-1/2 bg-transparent p-1  m-1   border-solid border-2 text-center hover:bg-sky-950 hover:text-white">
              <Link href="#">Indian Cuisine</Link>
            </div>
            <div className="block text-black rounded-full   w-1/2 bg-transparent p-1  m-1   border-solid border-2 text-center hover:bg-sky-950 hover:text-white">
              <Link href="#">Indian Cuisine</Link>
            </div>
          </div>
        </div>
        <div className="col-span-1 mx-20">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              search();
            }}
            className="w-full max-w-md"
          >
            <div className="relative flex items-center text-gray-400 focus-within:text-gray-600">
              <BsSearch className="w-5 h-5 absolute ml-3 pointer-events-none" />
              <input
                type="text"
                name="search"
                placeholder="Search recipes"
                className="w-full pr-3 pl-10 py-2 font-semibold placeholder-gray-500 text-black rounded-2xl border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2"
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                }}
              />
            </div>
          </form>
        </div>
        <div className="col-span-1">
          <h1 className="text-2xl text-blue-950">Get top dishes here</h1>
        </div>
      </div>

      <h1 className="text-4xl font-extrabold text-black p-1 mx-auto text-center">
        Recipes
      </h1>

      <div className="grid grid-cols-3 gap-4 p-2 ">
        {" "}
        {isSearch
          ? searchDishes.map((post: dish) => {
              return (
                <Postcards
                  key={post.dishId}
                  id={post.dishId}
                  dishName={post.dishName}
                  dishId={post.dishId}
                  dishPhoto={post.dishPhoto}
                  createdAt={post.createdAt}
                  userId={post.userId}
                />
              );
            })
          : posts.map((post: dish) => {
              return (
                <Postcards
                  key={post.dishId}
                  id={post.dishId}
                  dishName={post.dishName}
                  dishId={post.dishId}
                  dishPhoto={post.dishPhoto}
                  createdAt={post.createdAt}
                  userId={post.userId}
                />
              );
            })}{" "}
      </div>
    </div>
  );
};

export default HomePage;
