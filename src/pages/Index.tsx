import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { ProductCard } from "@/components/ProductCard";
import { products, categories } from "@/data/products";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

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
          </div>
        </section>

        {/* Search Results */}
        {searchQuery && (
          <div className="mb-6 text-center">
            <p className="text-muted-foreground">
              Showing results for "<span className="font-medium text-foreground">{searchQuery}</span>"
            </p>
          </div>
        )}

        {/* Products Grid */}
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
      </div>
    </Layout>
  );
};

export default Index;
