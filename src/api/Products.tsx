import { useEffect, useState } from "react";
import { getProductById } from "@/api/products";

useEffect(() => {
  getProducts().then(setProducts);
}, []);
