"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { IoMdStar } from "react-icons/io";
import { FaRegStar } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { CiHeart } from "react-icons/ci";
import { PiShoppingCartSimpleThin } from "react-icons/pi";
import { IoEye } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { addToCart } from "@/app/multiy-components/orderform/cart";
import { client } from "@/sanity/lib/client";
import Green_Header from "@/app/multiy-components/headers/green-header";
import Header from "@/app/multiy-components/headers/header";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";

// Interface for product card props
interface ProductCardProps {
  id: number;
  image: string;
  title: string;
  description: string;
  price: number;
  priceStrikeThrough?: number;
  quantity: number;
}

// Fetch Cards from Sanity
const fetchCards = async (): Promise<ProductCardProps[]> => {
  const query = `
    *[_type == "card"] | order(_createdAt asc) {
      id,
      title,
      description,
      priceStrikeThrough,
      price,
      "image": image.asset->url
    }
  `;
  return client.fetch(query);
};

export default function CardDetail() {
  const [posts, setPosts] = useState<ProductCardProps[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState<string | null>(null); // State for success message
  const params = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    fetchCards()
      .then((data) => {
        setPosts(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const id = parseInt(params?.id as string, 10);
  const card = posts?.find((p) => p.id === id);

  // Handle Add to Cart and display success message
  const handleAddToCart = () => {
    if (card) {
      dispatch(
        addToCart({
          id: card.id,
          title: card.title,
          price: card.price,
          image: card.image,
        })
      );
      setSuccessMessage("Product added to cart successfully!"); // Show success message
      setTimeout(() => setSuccessMessage(null), 3000); // Clear message after 3 seconds
    }
  };

  if (loading) {
    return <div className="h-[600px] text-center mt-20 font-bold text-3xl font-serif">Loading...</div>;
  }

  if (!card) {
    return <div>No product found for the given ID.</div>;
  }

  return (
    <main>
      <Green_Header />
      <Header />
      <div className="flex flex-col font-sans font-semibold bg-[#FAFAFA] gap-6 py-2">
        {/* Breadcrumb section */}
        <div className="flex flex-col md:flex-row lg:flex-row px-6 md:p-7">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Shop</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        {/* Notification Banner */}
        {successMessage && (
          <div className="bg-green-100 text-green-800 border border-green-500 px-4 py-2 rounded-md mx-6">
            {successMessage}
          </div>
        )}

        {/* Product details */}
        <div className="flex flex-col md:flex-row py-4 justify-center items-center md:p-9 font-sans font-semibold">
          <div className="md:w-1/2 w-full flex flex-col gap-3 items-center">
            <Image src={card.image} alt={card.title} width={400} height={350} className="object-cover" />
          </div>
          <div className="md:w-1/2 w-full text-[#858585] space-y-5 py-10 md:py-6 lg:py-1 px-9">
            <h1 className="text-2xl text-black">{card.title}</h1>
            <div className="flex items-center gap-3">
              <p className="flex items-center text-yellow-500">
                <IoMdStar size={22} />
                <IoMdStar size={22} />
                <IoMdStar size={22} />
                <FaRegStar />
                <FaRegStar />
              </p>
              <p className="text-black">10 Reviews</p>
            </div>
            <p className="font-bold font-serif text-2xl text-black">${card.price.toFixed(2)}</p>
            <p className="">{card.description}</p>
            <p className="border-b border-gray-500 pb-4">Additional product information can be here.</p>

            <div className="flex gap-4 py-4">
              <p className="w-[30px] h-[30px] rounded-full bg-blue-500"></p>
              <p className="w-[30px] h-[30px] rounded-full bg-[#23856D]"></p>
              <p className="w-[30px] h-[30px] rounded-full bg-[#E77C40]"></p>
              <p className="w-[30px] h-[30px] rounded-full bg-[#252B42]"></p>
            </div>

            {/* Add to Cart Button */}
            <div className="flex gap-5 py-4 items-center">
              <Button onClick={handleAddToCart} className="bg-blue-500 py-6 px-7 rounded-xl text-white hover:bg-white hover:text-black">
                Add to Cart
              </Button>
              <div className="flex gap-3">
                <CiHeart size={40} className="bg-white p-2 rounded-full text-black" />
                <PiShoppingCartSimpleThin size={40} className="bg-white p-2 rounded-full text-black" />
                <IoEye size={30} className="bg-white p-2 rounded-full text-black" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
