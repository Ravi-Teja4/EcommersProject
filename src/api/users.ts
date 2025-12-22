import { API_BASE_URL } from "./config";

export const signupUser = async (
  name: string,
  email: string,
  password: string
) => {
  const res = await fetch(`${API_BASE_URL}/users/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, password }),
  });

  if (!res.ok) {
    throw new Error("Signup failed");
  }

  return res.json();
};

export const loginUser = async (
  email: string,
  password: string
) => {
  const res = await fetch(`${API_BASE_URL}/users/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    throw new Error("Login failed");
  }

  return res.json();
};

