import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { ProductCard } from "@/components/ProductCard";
import { products, categories } from "@/data/products";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import aboutMePic from "@/assets/about-me-pic.jpg";

const Index = () => {
  const [searchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const searchQuery = searchParams.get("search") || "";

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
  }, [selectedCategory, searchQuery]);

  return (
    <Layout>
      <div className="container py-8">
        {/* Hero Section */}
        <section className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-slide-up">
            Discover Premium Products
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: "0.1s" }}>
            Curated collection of high-quality products for modern lifestyle
          </p>
        </section>

        {/* Categories */}
        <section className="mb-8">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "secondary"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className={cn(
                  "rounded-full transition-all",
                  selectedCategory === category && "shadow-elevated"
                )}
              >
                {category}
              </Button>
            ))}
            <Button
              variant={selectedCategory === "About Me" ? "default" : "secondary"}
              size="sm"
              onClick={() => setSelectedCategory("About Me")}
              className={cn(
                "rounded-full transition-all",
                selectedCategory === "About Me" && "shadow-elevated"
              )}
            >
              About Me
            </Button>
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
              <p className="mt-2 text-muted-foreground max-w-md">
                Welcome to my store! I'm passionate about curating the best products for you.
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
          {filteredProducts.length > 0 ? (
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
