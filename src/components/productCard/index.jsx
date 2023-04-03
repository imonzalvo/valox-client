import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";

export default function ProductCard({ product, fullWidthProduct }) {
  const thumbnailImageUrl = useMemo(() => {
    const firstImage = product.images[0].image;
    const thumbnailImageUrl = firstImage.sizes["thumbnail"].url;
    return thumbnailImageUrl.includes("localhost")
      ? `${thumbnailImageUrl}`
      : `${process.env.NEXT_PUBLIC_API_URL}${thumbnailImageUrl}`;
  }, [product]);
  return (
    <Link
      href={`/products/${product.id}`}
      className={`" 
      min-w-[200px] bg-white shadow-md shadow rounded-3xl p-2 mx-3 my-3 cursor-pointer" ${
        fullWidthProduct ? "w-[50%]" : ""
      }
      `}
    >
      <div className="overflow-x-hidden rounded-2xl relative">
        <Image
          alt={product.title}
          className={`rounded-2xl object-cover ${
            fullWidthProduct ? "w-full h-[400px]" : "w-[230px] h-[230px]"
          }`}
          priority
          src={thumbnailImageUrl}
          width={220}
          height={220}
        />
        <p
          style={{ top: "4px", right: "4px" }}
          className="absolute bg-white rounded-full p-2 cursor-pointer group"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 group-hover:opacity-50 opacity-70"
            fill="none"
            viewBox="0 0 24 24"
            stroke="black"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
        </p>
      </div>
      <div className="mt-8 pl-2 mb-2 flex justify-between ">
        <div>
          <p className="text-lg font-semibold text-gray-900 mb-0">
            {product.title}
          </p>
          <p className="text-md text-gray-800 mt-0">{`$ ${product.price}`}</p>
        </div>
        <div className="flex flex-col-reverse mb-1 mr-4 group cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 group-hover:opacity-70"
            fill="none"
            viewBox="0 0 24 24"
            stroke="gray"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        </div>
      </div>
    </Link>
  );
}
