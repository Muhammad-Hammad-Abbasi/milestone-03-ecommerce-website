"use client";

import React from "react";
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { incrementQuantity, decrementQuantity, removeFromCart } from "@/app/multiy-components/orderform/cart";
import { RootState } from "@/app/store/store";
import { Button } from "@/components/ui/button";
import Image from "next/image";

// Define the CartItem interface
interface CartItem {
  id: number;
  title: string;
  price: number;
  quantity?: number; // Optional quantity
  image: string;
}

export default function CartPage() {
  const cartItems: CartItem[] = useSelector((state: RootState) => state.cart.items); // Fetch cart items from Redux
  const dispatch = useDispatch();

  // Increment item quantity
  const handleIncrement = (id: number) => {
    dispatch(incrementQuantity(id));
  };

  // Decrement item quantity
  const handleDecrement = (id: number) => {
    dispatch(decrementQuantity(id));
  };

  // Remove an item from the cart
  const handleRemove = (id: number) => {
    dispatch(removeFromCart(id));
  };

  // Calculate total price
  const calculateTotal = () => {
    return cartItems
      .reduce((total: number, item: CartItem) => total + item.price * (item.quantity ?? 1), 0) // Use a fallback for optional quantity
      .toFixed(2); // Format as 2 decimal places
  };

  return (
    <main className="p-6">
      <h1 className="text-2xl font-serif font-bold mb-4">Cart Items</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {/* Render cart items */}
          {cartItems.map((item: CartItem) => (
            <div
              key={item.id}
              className="flex items-center justify-around py-4 border-b"
            >
              <Image
                src={item.image}
                alt={item.title}
                className="w-20 h-20 object-cover"
              />
              <div className="space-y-3 pl-5">
                <h2 className="font-semibold font-serif text-2xl">{item.title}</h2>
                <p className="font-semibold font-serif text-2xl">${item.price}</p>
                <div className="flex items-center gap-2 text-lg">
                  <button
                    onClick={() => handleDecrement(item.id)}
                    className="px-2 bg-gray-200"
                  >
                    -
                  </button>
                  <p>{item.quantity || 0}</p> {/* Fallback for optional quantity */}
                  <button
                    onClick={() => handleIncrement(item.id)}
                    className="px-2 bg-gray-200"
                  >
                    +
                  </button>
                </div>
              </div>
              <button
                onClick={() => handleRemove(item.id)}
                className="text-red-500 flex"
              >
               <p>Remove</p> 
                <MdDelete size={20}/>
              </button>
            </div>
          ))}

          {/* Total Cost */}
          <div className="flex flex-col justify-center items-center">
          <div className="mt-6 text-center w-[300px] bg-[#FAFAFA] ">
            <h3 className="text-3xl font-bold font-mono border border-b-8 border-[#5c5c5c] space-y-4">Order Summary</h3>
            <h2 className="flex  items-center text-xl font-light font-mono gap-20 py-2 px-4">Discount:
              <p>
                -$0
              </p>
            </h2><hr />
            <h2 className="flex  items-center text-xl font-light font-mono gap-10 py-2 px-4">
              Delivery Fee:
              <p>
                -$0
              </p>
            </h2><hr />
            <h2 className="flex border border-opacity-10 border-[#5c5c5c] bg-[#dddddd] items-center py-2 px-4 text-2xl font-light font-mono gap-20">
              Total:
              <p>
                ${calculateTotal()}
              </p>
            </h2>
           
          </div>
          <Button className="bg-blue-500 px-[108px] py-5  text-white hover:text-black text-lg border hover:border-blue-500">Check Out</Button>
        </div>
        </div>
      )}
    </main>
  )
}