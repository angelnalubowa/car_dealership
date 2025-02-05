import React, { createContext, useContext, useState } from "react";

// Create context
const ListingsContext = createContext();

// Custom hook to use the context
export const useListings = () => useContext(ListingsContext);

// ListingsProvider component
export const ListingsProvider = ({ children }) => {
  const [listings, setListings] = useState({
    cars: [],
    carSales: [],
    trips: [],
    accessories: [],
  });
  
  // Function to refresh listings data
  const refreshListings = async () => {
    try {
      const [cars, carSales, trips, accessories] = await Promise.all([
        fetch("/cars").then((res) => res.json()),
        fetch("/sales").then((res) => res.json()),
        fetch("/trips").then((res) => res.json()),
        fetch("/accessories").then((res) => res.json()),
      ]);
      setListings({ cars, carSales, trips, accessories });
    } catch (error) {
      console.error("Error fetching listings:", error);
    }
  };

  const updateListings = (category, newItem) => {
    setListings((prevListings) => ({
      ...prevListings,
      [category]: [...prevListings[category], newItem],
    }));
  };

  
  return (
    <ListingsContext.Provider value={{ listings, refreshListings, setListings, updateListings }}>
      {children}
    </ListingsContext.Provider>
  );
};
