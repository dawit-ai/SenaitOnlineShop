export const fetchAvailableProducts = async () => {
  // Mock data
  return [
    {
      id: 1,
      name: "Stainless Steel Cookware Set",
      price: 2500,
      image: "https://via.placeholder.com/300x200?text=Cookware",
      description: "High-quality stainless steel cookware set.",
    },
    {
      id: 2,
      name: "Glassware Set",
      price: 1500,
      image: "https://via.placeholder.com/300x200?text=Glassware",
      description: "Elegant glassware set for your home.",
    },
    {
      id: 3,
      name: "Kitchen Utensils",
      price: 800,
      image: "https://via.placeholder.com/300x200?text=Utensils",
      description: "Complete kitchen utensils for everyday use.",
    },
  ];
};
