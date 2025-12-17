import { API_BASE_URL } from "./config";

export const getProducts = async () => {
  const res = await fetch(`${API_BASE_URL}/products`);
  return res.json();
};

export const getProductById = async (id: string) => {
  const res = await fetch(`${API_BASE_URL}/products/${id}`);
  return res.json();
};
