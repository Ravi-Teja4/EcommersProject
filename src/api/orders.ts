import { API_BASE_URL } from "./config";

export const createOrder = async (data: {
  userId: string;
  items: any[];
}) => {
  const res = await fetch(`${API_BASE_URL}/orders`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  return res.json();
};

export const getOrdersByUser = async (userId: string) => {
  const res = await fetch(`${API_BASE_URL}/orders/${userId}`);
  return res.json();
};
