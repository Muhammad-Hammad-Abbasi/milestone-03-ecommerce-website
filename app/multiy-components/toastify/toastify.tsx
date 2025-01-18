

import { Button } from '@/components/ui/button';
import React, { useEffect, useState } from 'react';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../store/orderform/cart';
import { client } from '@/sanity/lib/client';




function App({ id }: { id: any }) {

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

  const [posts, setPosts] = useState<ProductCardProps[] | null>(null);
  //  const [loading, setLoading] = useState(true);
  //  const params = useParams();

  useEffect(() => {
    fetchCards()
      .then((data) => {
        setPosts(data);

      })
      .catch(() => console.log("error"));
  }, []);

  //  const id = parseInt(params?.id as string, 10);
  const card = posts?.find((p) => p.id === id);
  console.log(card)


  const dispatch = useDispatch();
  const notify = () => toast.success('✅Product added to successfully!', {
    position: "bottom-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Bounce,
  });




  useEffect(() => {
    const cartItem = localStorage.getItem("cartItem")
    if (cartItem) {
      console.log("items", cartItem)
    }
  }, [])

  const handleAddToCart = () => {
    if (card) {
      // Pehle se cart ko localStorage se uthao
    let cart = JSON.parse(localStorage.getItem("cart")) || []; // Agar cart exist nahi karta to empty array set karo

    // Naya item cart array me push karo
    cart.push(card);

    // Updated cart ko dobara localStorage me save karo
    localStorage.setItem("cart", JSON.stringify(cart));
      dispatch(
        addToCart(card) );
    }
  };



  // const handleAddToCart = () => {
  //   let cartItems: any = localStorage.getItem("cartItems");
  //   cartItems = cartItems ? JSON.parse(cartItems) : [];
  //   cartItems.push(product.id);
  //   dispatch(addToCart(product.id));
  //   localStorage.setItem("cartItems", JSON.stringify(cartItems));
  // }

  // const handleAdd = () => {
  //   if (card) {
  //     alert("function call")
  //     localStorage.setItem("cartItem",JSON.stringify(card))


  //   }
  // };

  return (
    <div>

      <Button onClick={handleAddToCart} className="bg-blue-500 py-6 px-7 rounded-xl text-white hover:bg-white hover:text-black">
        Add to Cart
      </Button>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </div>
  );
}

export default App;