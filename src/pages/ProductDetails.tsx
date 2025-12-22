import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { getProductById } from "@/api/products";
import { Product } from "@/types";
import { useCart } from "@/context/CartContext";

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { addItem } = useCart();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    getProductById(id)
      .then((data) => {
        setProduct({
          id: data.product_id,
          name: data.name,
          description: data.description || "",
          price: Number(data.price),
          image: data.image || "",
          category: data.category,
          rating: Number(data.rating) || 4.5,
          reviews: data.reviews || 0,
          inStock: data.in_stock ?? true,
        });
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center py-20">
          <Loader2 className="h-10 w-10 animate-spin text-primary" />
        </div>
      </Layout>
    );
  }

  if (!product) {
    return (
      <Layout>
        <div className="text-center py-20">
          <p>Product not found</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container py-10 max-w-5xl grid md:grid-cols-2 gap-10">
        <img
          src={product.image}
          alt={product.name}
          className="rounded-xl w-full object-cover"
        />

        <div>
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-muted-foreground mb-4">
            {product.description}
          </p>

          <p className="text-2xl font-semibold mb-6">
            ₹{product.price.toLocaleString("en-IN")}
          </p>

          <Button
            size="lg"
            onClick={() => addItem(product)}
            disabled={!product.inStock}
          >
            {product.inStock ? "Add to Cart" : "Out of Stock"}
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;

