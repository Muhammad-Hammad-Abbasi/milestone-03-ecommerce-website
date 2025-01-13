import React from "react";
import Image from "next/image";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Green_Header from "../headers/green-header";
import Header from "../headers/header";
import { client } from "@/sanity/lib/client";
import JustForYou from "./shop-cart";
import Link from "next/link";

interface ProductCardProps {
  id: number,
  image: string;
  title: string;
  description: string,
  price: number;
  priceStrikeThrough?: number;
}

// Fetch data at build time
const getProduct = async () => {
  const query = `
    *[_type == "card"] | order(_createdAt asc){
      id,
      title,
      description,
      priceStrikeThrough,
      price,
      "image": image.asset->url
    }
  `;

  // Fetch data from Sanity API
  const cards: ProductCardProps[] = await client.fetch(query);
  return cards;
};

async function Shop() {
  const cards = await getProduct();
  return (
    <main>
      <Green_Header />
      <Header />
      <div className="bg-[#FAFAFA] space-y-4 font-sans font-semibold">
        {/* Section one */}
        <div className="flex justify-between items-center md:px-9">
          <div className="my-8 mx-6 md:flex">
            <h1 className="font-bold text-lg">SHOP</h1>
          </div>

          <div className="flex flex-col md:flex-row lg:flex-row md:p-7">
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
        </div>

        {/* Section two */}
        <div className="flex justify-center items-center flex-col py-6">
          <div className="grid grid-cols md:grid-cols-5 gap-4">
            {/* Static Images */}
            {["shopimg1.png", "shop-img2.png", "shop-img3.png", "shop-img4.png", "shop-img5.png"].map((img, index) => (
              <div key={index}>
                <Image src={`/${img}`} alt={`Shop ${index + 1}`} width={206} height={223} />
              </div>
            ))}
          </div>
        </div>

        {/* Section five: Product Cards */}
        <div className="flex justify-center py-5 bg-white">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {cards && cards.length > 0 ? (
              cards.map((card) => (
                <Link key={card.id} href={`/productpage/${card.id}`}>
                  <JustForYou

                    title={card.title}
                    description={card.description}
                    image={card.image}
                    price={card.price}
                    priceStrikeThrough={card.priceStrikeThrough}
                    id={card.id}
                  />
                </Link>
              ))
            ) : (
              <p className="text-gray-600 text-center col-span-full">
                Product not available at the moment.
              </p>
            )}
          </div>
        </div>

      </div>
    </main>
  );
}

export default Shop;
