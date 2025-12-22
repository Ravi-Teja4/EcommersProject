import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import {
  Menu,
  X,
  Smartphone,
  ShoppingBag,
  Footprints,
  Home,
  Dumbbell,
  User,
  Loader2,
  Layers,
} from "lucide-react";

import { Layout } from "@/components/layout/Layout";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Product } from "@/types";
import { getProducts } from "@/api/products";

import aboutMePic from "@/assets/about-me-pic.jpg";
import heroProfilePic from "@/assets/hero-profile.jpg";

/* =========================
   Typing Effect Hook
========================= */
const useTypingEffect = (text: string, speed: number = 80) => {
  const [displayedText, setDisplayedText] = useState("");
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    setDisplayedText("");
    setIsComplete(false);
    let index = 0;

    const timer = setInterval(() => {
      if (index < text.length) {
        setDisplayedText(text.slice(0, index + 1));
        index++;
      } else {
        setIsComplete(true);
        clearInterval(timer);
      }
    }, speed);

    return () => clearInterval(timer);
  }, [text, speed]);

  return { displayedText, isComplete };
};

/* =========================
   Category Icons
========================= */
const categoryIcons: Record<string, React.ComponentType<{ className?: string }>> =
  {
    All: Layers,
    Electronics: Smartphone,
    Bags: ShoppingBag,
    Footwear: Footprints,
    Home: Home,
    Fitness: Dumbbell,
    "About Me": User,
  };

const Index = () => {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search") || "";

  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const { displayedText, isComplete } = useTypingEffect(
    "Discover Premium Products",
    70
  );

  /* =========================
     FETCH PRODUCTS (API)
  ========================= */
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (err) {
        console.error("Failed to load products", err);
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts();
  }, []);

  /* =========================
     FILTER PRODUCTS
  ========================= */
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory =
        selectedCategory === "All" || product.category === selectedCategory;

      const matchesSearch =
        !searchQuery ||
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description
          .toLowerCase()
          .includes(searchQuery.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [products, selectedCategory, searchQuery]);

  const menuCategories = [
    "All",
    "Electronics",
    "Bags",
    "Footwear",
    "Home",
    "Fitness",
    "About Me",
  ];

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setMenuOpen(false);
  };

  return (
    <Layout>
      <div className="container py-8">
        {/* =========================
            MENU BUTTON
        ========================= */}
        <div className="mb-6 relative">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X /> : <Menu />}
          </Button>

          {menuOpen && (
            <div className="absolute z-50 mt-2 w-56 rounded-xl border bg-background shadow-lg">
              <ul className="py-2">
                {menuCategories.map((category) => {
                  const Icon = categoryIcons[category];
                  return (
                    <li key={category}>
                      <button
                        onClick={() => handleCategorySelect(category)}
                        className={cn(
                          "flex w-full items-center gap-3 px-4 py-2 text-sm hover:bg-muted",
                          selectedCategory === category &&
                            "bg-primary/10 text-primary"
                        )}
                      >
                        <Icon className="h-4 w-4" />
                        {category}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </div>

        {/* =========================
            HERO SECTION
        ========================= */}
        <section className="mb-12 flex flex-col md:flex-row items-center gap-8">
          <div>
            <h1 className="text-4xl font-bold mb-4">
              {displayedText}
              <span
                className={cn(
                  "inline-block w-[3px] h-[1em] bg-primary ml-1",
                  isComplete ? "animate-pulse" : "animate-[blink_0.7s_infinite]"
                )}
              />
            </h1>
            <p className="text-muted-foreground">
              Curated collection of premium products
            </p>
          </div>

          <img
            src={heroProfilePic}
            className="w-36 h-36 rounded-full object-cover"
          />
        </section>

        {/* =========================
            ABOUT ME
        ========================= */}
        {selectedCategory === "About Me" && (
          <section className="text-center py-12">
            <img
              src={aboutMePic}
              className="w-56 h-56 rounded-full mx-auto"
            />
            <h2 className="text-2xl font-bold mt-4">About Me</h2>
            <p className="text-muted-foreground mt-2 max-w-lg mx-auto">
              Aspiring Cloud & DevOps Engineer working with AWS, Docker,
              Kubernetes, and CI/CD pipelines.
            </p>
          </section>
        )}

        {/* =========================
            PRODUCTS GRID
        ========================= */}
        {selectedCategory !== "About Me" && (
          <section>
            {isLoading ? (
              <div className="flex justify-center py-20">
                <Loader2 className="h-10 w-10 animate-spin text-primary" />
              </div>
            ) : filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <p className="text-center text-muted-foreground">
                No products found
              </p>
            )}
          </section>
        )}
      </div>
    </Layout>
  );
};

export default Index;

