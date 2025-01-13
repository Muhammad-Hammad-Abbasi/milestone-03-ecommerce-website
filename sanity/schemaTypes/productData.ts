// Example Sanity Schema for Card
export default {
  name: "card",
  title: "Card",
  type: "document",
  fields: [
    { name: "id", title: "ID", type: "number" },

    { name: "title", title: "Title", type: "string" },

    { name: "description", title: "Description", type: "string" },

    { name: "price", title: "Price", type: "number" },

    { name: "priceStrikeThrough", title: "Price Strike Through", type: "number" },
    
    {
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
    },
  ],
};
