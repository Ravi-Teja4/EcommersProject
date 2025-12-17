import React, {
  createContext,
  useContext,
  useState,
  useCallback,
} from "react";
import { CartItem, Product } from "@/types";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";

/* =========================
   TYPES
========================= */
interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  checkout: () => Promise<boolean>;
  total: number;
  itemCount: number;
}

/* =========================
   CONFIG
========================= */
const API_BASE_URL =
  "https://wcldx9f5u0.execute-api.us-east-1.amazonaws.com";

/* =========================
   CONTEXT
========================= */
const CartContext = createContext<CartContextType | undefined>(undefined);

/* =========================
   PROVIDER
========================= */
export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const { user, isAuthenticated } = useAuth();

  /* =========================
     ADD TO CART
  ========================= */
  const addToCart = useCallback((product: Product) => {
    setItems((prev) => {
      const existing = prev.find(
        (item) => item.product.id === product.id
      );

      if (existing) {
        toast.success(`Updated ${product.name} quantity`);
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      toast.success(`${product.name} added to cart`);
      return [...prev, { product, quantity: 1 }];
    });
  }, []);

  /* =========================
     REMOVE FROM CART
  ========================= */
  const removeFromCart = useCallback((productId: string) => {
    setItems((prev) => {
      const item = prev.find((i) => i.product.id === productId);
      if (item) toast.info(`${item.product.name} removed from cart`);
      return prev.filter((item) => item.product.id !== productId);
    });
  }, []);

  /* =========================
     UPDATE QUANTITY
  ========================= */
  const updateQuantity = useCallback(
    (productId: string, quantity: number) => {
      if (quantity < 1) {
        removeFromCart(productId);
        return;
      }

      setItems((prev) =>
        prev.map((item) =>
          item.product.id === productId
            ? { ...item, quantity }
            : item
        )
      );
    },
    [removeFromCart]
  );

  /* =========================
     CLEAR CART
  ========================= */
  const clearCart = useCallback(() => {
    setItems([]);
    toast.info("Cart cleared");
  }, []);

  /* =========================
     CHECKOUT → AWS LAMBDA
  ========================= */
  const checkout = async (): Promise<boolean> => {
    if (!isAuthenticated || !user) {
      toast.error("Please login to place order");
      return false;
    }

    if (items.length === 0) {
      toast.error("Cart is empty");
      return false;
    }

    try {
      const res = await fetch(`${API_BASE_URL}/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.userId,
          items: items.map((item) => ({
            productId: item.product.id,
            name: item.product.name,
            price: item.product.price,
            quantity: item.quantity,
          })),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Order failed");
        return false;
      }

      toast.success("Order placed successfully");
      clearCart();
      return true;
    } catch (err) {
      console.error("Checkout error:", err);
      toast.error("Something went wrong");
      return false;
    }
  };

  /* =========================
     TOTALS
  ========================= */
  const total = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const itemCount = items.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        checkout,
        total,
        itemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

/* =========================
   HOOK
========================= */
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
};
