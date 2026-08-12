"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import type { Product } from "@/types/product";
import type { CartItem } from "@/types/cart";


interface CartContextType {
  cart: CartItem[];
  loading: boolean;
  totalItems: number;
  subtotal: number;
  mounted: boolean;

  open: boolean;
  setOpen: (value: boolean) => void;

  addToCart: (
    product: Product,
    quantity?: number
  ) => void;

  removeFromCart: (id: string) => void;

  increaseQuantity: (id: string) => void;

  decreaseQuantity: (id: string) => void;

  clearCart: () => void;
}


const CartContext = createContext<
  CartContextType | undefined
>(undefined);



export function CartProvider({
  children,
}: {
  children: React.ReactNode;
}) {


  const [mounted, setMounted] = useState(false);

  const [open, setOpen] = useState(false);

  const [cart, setCart] = useState<CartItem[]>([]);

  const loading = false;



  useEffect(() => {

    setMounted(true);

    try {

      const stored = localStorage.getItem("cart");

      if (stored) {
        setCart(JSON.parse(stored));
      }

    } catch {

      setCart([]);

    }

  }, []);




  useEffect(() => {

    if (mounted) {

      localStorage.setItem(
        "cart",
        JSON.stringify(cart)
      );

    }

  }, [cart, mounted]);





  function addToCart(
    product: Product,
    quantity = 1
  ) {

    setCart((prev) => {

      const existing = prev.find(
        (item) => item.id === product.id
      );


      if (existing) {

        return prev.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity:
                  item.quantity + quantity,
              }
            : item
        );

      }


      return [
        ...prev,
        {
          ...product,
          quantity,
        },
      ];

    });

  }





  function removeFromCart(id: string) {

    setCart((prev) =>
      prev.filter(
        (item) => item.id !== id
      )
    );

  }





  function increaseQuantity(id: string) {

    setCart((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      )
    );

  }





  function decreaseQuantity(id: string) {

    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item
        )
        .filter(
          (item) => item.quantity > 0
        )
    );

  }





  function clearCart() {

    setCart([]);

  }





  const subtotal = useMemo(

    () =>
      cart.reduce(
        (sum, item) =>
          sum +
          Number(item.price) *
          item.quantity,
        0
      ),

    [cart]

  );





  const totalItems = useMemo(

    () =>
      cart.reduce(
        (sum, item) =>
          sum + item.quantity,
        0
      ),

    [cart]

  );





  return (

    <CartContext.Provider

      value={{

        cart,
        loading,
        totalItems,
        subtotal,
        mounted,

        open,
        setOpen,

        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,

      }}

    >

      {children}

    </CartContext.Provider>

  );

}





export function useCartContext() {

  const context =
    useContext(CartContext);


  if (!context) {

    throw new Error(
      "useCartContext must be used inside CartProvider."
    );

  }


  return context;

}