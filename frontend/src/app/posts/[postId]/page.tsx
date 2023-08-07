"use client";
import Image from "next/image";
import AddToCookBook from "@/components/addToCookbook";
import { getPostWithId } from "@/api/fetchPostWithId";
import { useEffect, useState } from "react";

import { dish } from "@/utilites/interface";

const PostPage = ({
  params,
}: {
  params: { postId: string; searchParams: string };
}) => {
  // console.log("hello params print kar raha hu");
  // console.log(params);
  const [data, setData]: [dish, Function] = useState({
    dishName: "Dish Not Found",
    dishId: "",
    dishBio: "Simple Samosa are the best",
    dishTime: -1,
    dishPhoto: "",
    userId: "",
    dishCuisine: "",
    createdAt: "",
  });
  // console.log("hello");
  useEffect(() => {
    getPost();
  }, []);

  // const { postId } = useParams();
  const getPost = async () => {
    try {
      // console.log("samosa");
      const response = await getPostWithId(params.postId);
      console.log("ping");
      setData(response.message);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(params.postId);

  console.log(data);

  // getPost()  //need to change this but abhi nahi ho raha hai

  return (
    <div className="bg-gradient-to-r from-pink-200 to-white w-full px-8 md:px-auto text-black h-screen">
      <div className="header text-white bg-slate-800 rounded-2xl h-1/2 p-20">
        <div className=" grid grid-cols-4">
          <div className="col-span-1">
            <div className="Image-circle w-64 h-64 rounded-full border-4 border-red-800 overflow-hidden ">
              <Image 
                src={data ? data.dishPhoto : ""}
                alt=""
                width={256}
                height={256}
                id="Image"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="save-button pt-16">
              <AddToCookBook />
            </div>
          </div>
          <div className="col-span-3">
            <div className="grid grid-rows-3 gap-6">
              <div className="uppercase text-5xl row-auto text-center">
                {data ? data.dishName : "hey"}
              </div>
              <div className="row-auto">
                <div className="grid grid-cols-3">
                  <div className="col-span-1">SERVINGS</div>
                  <div className="col-span-1">RATINGS</div>
                  <div className="col-span-1">
                    COOKING TIME : {data ? data.dishTime : "hey"} mins
                  </div>
                </div>
                <div>
                  <div className="row-auto">
                    {" "}
                    {data ? data.dishBio : "hey"}{" "}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostPage;
