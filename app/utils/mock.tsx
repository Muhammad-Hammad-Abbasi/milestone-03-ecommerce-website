import { client } from "@/sanity/lib/client";

// Sanity se data fetch function
export const fetchProducts = async () => {
  const query = `*[_type == "card"] {
    id,
    title,
    description,
    price,
    "image": image.asset->url
  }`;

  const data = await client.fetch(query);
  console.log(data)
  return data;
};



