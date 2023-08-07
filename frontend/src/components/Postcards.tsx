"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import "@/components/postcard.css";
interface postCards {
  id: string;
  dishName: string;
  dishId: string;
  createdAt: string;
  userId: string;
  dishPhoto: string;
}
const Postcards = ({
  dishName,
  id,
  dishId,
  createdAt,
  userId,
  dishPhoto,
}: postCards) => {
  const pic = dishPhoto;

  // console.log(pic)
  return (
    <div
      className="pt-4 pb-4 flex flex-col items-center bg-sky-950    m-1 h-18"
      id="postcard"
    >
      <h1 className="font-bold text-2xl p-1 m-1 text-center uppercase">
        {dishName}
      </h1>
      <Image
        src={`${pic}`}
        alt={dishName}
        width={400}
        height={400}
        style={{ objectFit: "cover", borderRadius: "30px", minHeight: "400px" }}
      />

      <p className="flex items-center text-1xl text- p1">By {userId}</p>

      <Link
        href={`posts/${dishId}`}
        className="text-black bg-white rounded-xl p-2 mt-2 hover:bg-blue-400 hover:text-white hover:shadow"
      >
        Read more
      </Link>
    </div>
  );
};

export default Postcards;
