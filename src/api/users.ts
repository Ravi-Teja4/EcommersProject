import { API_BASE_URL } from "./config";

export const registerUser = async (data: {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}) => {
  const res = await fetch(`${API_BASE_URL}/users/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  return res.json();
};

export const loginUser = async (data: {
  email: string;
  password: string;
}) => {
  const res = await fetch(`${API_BASE_URL}/users/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  return res.json();
};
