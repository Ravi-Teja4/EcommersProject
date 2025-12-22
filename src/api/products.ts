import { API_BASE_URL } from "./config";

export const getProducts = async () => {
  const res = await fetch(`${API_BASE_URL}/products`);

  if (!res.ok) {
    throw new Error("Failed to load products");
  }

  return res.json();
};

export const getProductById = async (id: string) => {
  const res = await fetch(`${API_BASE_URL}/products/${id}`);

  if (!res.ok) {
    throw new Error("Failed to load product");
  }

  return res.json();
};

