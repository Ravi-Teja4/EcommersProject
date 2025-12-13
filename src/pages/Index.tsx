import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { Menu, X, Smartphone, ShoppingBag, Footprints, Home, Dumbbell, User, Loader2, Layers } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { ProductCard } from "@/components/ProductCard";
import { useProducts } from "@/hooks/useProducts";
import { Button } from "@/components/ui/button";
import aboutMePic from "@/assets/about-me-pic.jpg";
import heroProfilePic from "@/assets/hero-profile.jpg";
import { cn } from "@/lib/utils";
import { Product } from "@/types";

const categoryIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  "All": Layers,
  "Electronics": Smartphone,
  "Bags": ShoppingBag,
  "Footwear": Footprints,
  "Home": Home,
  "Fitness": Dumbbell,
  "About Me": User,
};

const Index = () => {
  const [searchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [menuOpen, setMenuOpen] = useState(false);
  const searchQuery = searchParams.get("search") || "";
  
  const { data: dbProducts, isLoading } = useProducts();

  // Transform database products to frontend Product type
  const products: Product[] = useMemo(() => {
    if (!dbProducts) return [];
    return dbProducts.map((p) => ({
      id: p.product_id,
      name: p.name,
      description: p.description || "",
      price: Number(p.price),
      image: p.image || "",
      category: p.category,
      rating: Number(p.rating) || 4.5,
      reviews: p.reviews || 0,
      inStock: p.in_stock ?? true,
    }));
  }, [dbProducts]);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory =
        selectedCategory === "All" || product.category === selectedCategory;
      const matchesSearch =
        !searchQuery ||
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [products, selectedCategory, searchQuery]);

  const menuCategories = ["All", "Electronics", "Bags", "Footwear", "Home", "Fitness", "About Me"];

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setMenuOpen(false);
  };

  return (
    <Layout>
      <div className="container py-8">
        {/* Hamburger Menu Button */}
        <div className="mb-6 relative">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>

          {/* Dropdown Menu */}
          {menuOpen && (
            <div className="absolute z-50 mt-2 w-56 rounded-lg border border-border bg-background shadow-lg animate-fade-in">
              <ul className="py-2">
                {menuCategories.map((category) => {
                  const Icon = categoryIcons[category];
                  return (
                    <li key={category}>
                      <button
                        onClick={() => handleCategorySelect(category)}
                        className={cn(
                          "flex w-full items-center gap-3 px-4 py-3 text-sm transition-colors hover:bg-muted",
                          selectedCategory === category && "bg-primary/10 text-primary font-medium"
                        )}
                      >
                        <Icon className="h-4 w-4" />
                        <span>{category}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </div>

        {/* Hero Section */}
        <section className="mb-12">
          <div className="flex flex-col md:flex-row items-center justify-center gap-8">
            <div className="text-center md:text-left">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-slide-up">
                Discover Premium Products
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl animate-slide-up" style={{ animationDelay: "0.1s" }}>
                Curated collection of high-quality products for modern lifestyle
              </p>
            </div>
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden shadow-elevated border-4 border-primary/20 flex-shrink-0 animate-slide-up" style={{ animationDelay: "0.2s" }}>
              <img
                src={heroProfilePic}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </section>

        {/* About Me Section */}
        {selectedCategory === "About Me" && (
          <section className="flex justify-center py-12">
            <div className="text-center">
              <div className="w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden mx-auto shadow-elevated border-4 border-primary/20">
                <img
                  src={aboutMePic}
                  alt="About Me"
                  className="w-full h-full object-cover"
                />
              </div>
              <h2 className="mt-6 text-2xl font-bold text-foreground">About Me</h2>
              <h3 className="mt-2 text-lg font-semibold text-primary">Aspiring Cloud & DevOps Engineer</h3>
              <p className="mt-4 text-muted-foreground max-w-lg leading-relaxed">
                Aspiring Cloud & DevOps Engineer working on real-time projects, deploying applications using Kubernetes and AWS Cloud. Hands-on experience with containerized deployments, CI/CD pipelines, and Linux systems. Continuously learning and building scalable, automated cloud solutions.
              </p>
            </div>
          </section>
        )}

        {/* Search Results */}
        {searchQuery && (
          <div className="mb-6 text-center">
            <p className="text-muted-foreground">
              Showing results for "<span className="font-medium text-foreground">{searchQuery}</span>"
            </p>
          </div>
        )}

        {/* Products Grid */}
        {selectedCategory !== "About Me" && (
          <section>
            {isLoading ? (
              <div className="flex justify-center py-16">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map((product, index) => (
                  <div key={product.id} style={{ animationDelay: `${index * 0.05}s` }}>
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-muted-foreground text-lg">No products found</p>
                <Button
                  variant="link"
                  onClick={() => setSelectedCategory("All")}
                  className="mt-2"
                >
                  View all products
                </Button>
              </div>
            )}
          </section>
        )}
      </div>
    </Layout>
  );
};

export default Index;
