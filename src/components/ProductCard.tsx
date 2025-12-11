import { Link } from "react-router-dom";
import { ShoppingCart, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Product } from "@/types";
import { useCart } from "@/context/CartContext";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();

  return (
    <div className="group relative bg-card rounded-xl overflow-hidden shadow-card hover:shadow-product transition-all duration-300 animate-fade-in">
      <Link to={`/product/${product.id}`}>
        <div className="aspect-square overflow-hidden bg-muted">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
      </Link>

      {!product.inStock && (
        <div className="absolute top-3 left-3 bg-muted text-muted-foreground text-xs font-medium px-2 py-1 rounded-md">
          Out of Stock
        </div>
      )}

      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded">
            ID: {product.id}
          </span>
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-warning text-warning" />
            <span className="text-sm font-medium">{product.rating}</span>
            <span className="text-sm text-muted-foreground">({product.reviews})</span>
          </div>
        </div>

        <Link to={`/product/${product.id}`}>
          <h3 className="font-medium text-foreground group-hover:text-primary transition-colors line-clamp-2 mb-1">
            {product.name}
          </h3>
        </Link>

        <p className="text-sm text-muted-foreground mb-3">{product.category}</p>

        <div className="flex items-center justify-between">
          <span className="text-lg font-semibold">₹{product.price.toLocaleString('en-IN')}</span>
          <Button
            size="sm"
            variant="default"
            onClick={() => addToCart(product)}
            disabled={!product.inStock}
            className={cn(!product.inStock && "opacity-50")}
          >
            <ShoppingCart className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};
