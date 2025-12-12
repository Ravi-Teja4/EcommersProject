import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { ProductCard } from "@/components/ProductCard";
import { products, categories } from "@/data/products";
import { Button } from "@/components/ui/button";
import aboutMePic from "@/assets/about-me-pic.jpg";
import heroProfilePic from "@/assets/hero-profile.jpg";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { CategorySidebar } from "@/components/CategorySidebar";

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
      <SidebarProvider defaultOpen={true}>
        <div className="flex min-h-[calc(100vh-4rem)] w-full">
          <CategorySidebar
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
          
          <main className="flex-1 overflow-auto">
            <div className="container py-8">
              {/* Sidebar Toggle */}
              <div className="mb-4">
                <SidebarTrigger className="md:hidden" />
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
          </main>
        </div>
      </SidebarProvider>
    </Layout>
  );
};

export default Index;
