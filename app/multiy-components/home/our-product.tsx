
import { client } from "@/sanity/lib/client";
import JustForYou, { ProductCardProps } from "../productlistpage/shop-cart";

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

export default async function Our_Product() {
  const cards = await getProduct();

  return (
    <main className="overflow-hidden">
      {/* Section Browse The Range */}
      <div className="my-20 text-[#1d1d1d]">

        {/* Section Our Products */}
        <div>
          <p className="text-lg text-center font-sans font-semibold text-[#5e5d5d]">Featured Products</p>
          <h1 className="text-3xl text-center font-sans font-bold my-5">BESTSELLER PRODUCTS</h1>
          <p className="text-lg text-center font-sans font-semibold text-[#5e5d5d] px-3">Problems trying to resolve the conflict between</p>

          {/* Section five: Product Cards */}
          <div className="flex justify-center py-5 ">
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 ">
              {cards && cards.length > 0 ? (
                cards.map((card) => (
                  <JustForYou
                    key={card.id}
                    title={card.title}
                    description={card.description}
                    image={card.image}
                    price={card.price}
                    priceStrikeThrough={card.priceStrikeThrough}
                    id={card.id}
                  />
                ))
              ) : (
                <p className="text-gray-600 text-center col-span-full">
                  Product not available at the moment.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
