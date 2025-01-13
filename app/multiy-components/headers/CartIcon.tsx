"use client"

import React from "react";
import { useSelector } from "react-redux";
import { selectCartTotalQuantity } from "@/app/multiy-components/orderform/carticons"; // Correct path to your Redux slice
import Link from "next/link";
import { FiShoppingCart } from "react-icons/fi"; // Import your new cart icon

export default function CartIcon() {
  // Fetch total quantity from Redux store
  const totalQuantity = useSelector(selectCartTotalQuantity);

  return (
    <div className="relative">
      {/* Cart Icon (FiShoppingCart) wrapped with Link to navigate to the cart page */}
      <Link href="/cart">
        <FiShoppingCart size={24} className="text-[#23A6F0] cursor-pointer" />
      </Link>

      {/* Quantity Badge */}
      {totalQuantity > 0 && (
        <span className="absolute -top-2 -right-2 bg-[#23A6F0] text-white text-xs rounded-full px-2 py-1">
          {totalQuantity}
        </span>
      )}
    </div>
  );
}
