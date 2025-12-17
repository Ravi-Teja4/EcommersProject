import { useEffect, useState } from "react";
import { getProducts } from "@/api/products";

useEffect(() => {
  getProducts().then(setProducts);
}, []);
