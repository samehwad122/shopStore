import { useState, useEffect, createContext } from "react";
import { createClient } from "@supabase/supabase-js";

export const apiContext = createContext();

const supabaseUrl = "https://jjakrlnnflootsgdzwpb.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpqYWtybG5uZmxvb3RzZ2R6d3BiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMyNTcwMjYsImV4cCI6MjA2ODgzMzAyNn0.97AFydLJk3NgsHk2Q6cOndlAIMMw4LtQHaB7H9yIoAM";
const supabase = createClient(supabaseUrl, supabaseKey);

export const ApiContextProvider = ({ children }) => {
  const [allProductsShop, setAllProductsShop] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const storedCart = localStorage.getItem("cartItems");
    const storedWishlist = localStorage.getItem("wishlist");
    if (storedCart) setCartItems(JSON.parse(storedCart));
    if (storedWishlist) setWishlist(JSON.parse(storedWishlist));
  }, []);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  const addToCart = (product) => {
    setCartItems((prev) => {
      const exist = prev.find((item) => item.id === product.id);
      if (exist) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      } else {
        return [...prev, { ...product, qty: 1 }];
      }
    });
  };

  const increaseQty = (id) => {
    setCartItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, qty: item.qty + 1 } : item
      )
    );
  };

  const decreaseQty = (id) => {
    setCartItems((items) =>
      items.map((item) =>
        item.id === id && item.qty > 1 ? { ...item, qty: item.qty - 1 } : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
  };

  const toggleWishlist = (id) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const total = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);

  const getAllProductsShop = async () => {
    try {
      const { data, error } = await supabase.from("productsShop").select("*");
      if (error) throw error;
      setAllProductsShop(data);
    } catch (error) {
      console.error("❌ Error fetching productsShop:", error.message);
      setAllProductsShop([]);
    }
  };

  useEffect(() => {
    getAllProductsShop();
  }, []);

  return (
    <apiContext.Provider
      value={{
        allProductsShop,
        cartItems,
        wishlist,
        addToCart,
        increaseQty,
        decreaseQty,
        removeItem,
        toggleWishlist,
        total,
      }}
    >
      {children}
    </apiContext.Provider>
  );
};
