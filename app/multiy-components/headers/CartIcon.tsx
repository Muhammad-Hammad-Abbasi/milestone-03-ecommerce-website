"use client"

import React from "react";
import { useSelector } from "react-redux";
import { selectCartTotalQuantity } from "@/app/store/orderform/carticons"; // Correct path to your Redux slice
import Link from "next/link";
import { FiShoppingCart } from "react-icons/fi"; // Import your new cart icon
import select
export default function CartIcon() {
  // Fetch total quantity from Redux store
  const totalQuantity = useSelector(selectCartTotalQuantity);
  console.log("total",totalQuantity)
  const cartItem = useSelector(selectCartItems);  
  // const cartItemCount = useSelector(selectCartItemCount);
  const cart = JSON.parse(localStorage.getItem("cart")) || []; // Agar cart exist nahi karta to empty array set karo
  console.log("cart",cart?.length)
  return (
    <div className="relative">
      {/* Cart Icon (FiShoppingCart) wrapped with Link to navigate to the cart page */}
      <Link href="/cart">
        <FiShoppingCart size={24} className="text-[#23A6F0] cursor-pointer" />
      </Link>

      {/* Quantity Badge */}
      {cart && (
        <span className="absolute -top-2 -right-2 bg-[#23A6F0] text-white text-xs rounded-full px-2 py-1">
          {cart.length + cartItem}
        </span>
      )}
    </div>
  );
}
