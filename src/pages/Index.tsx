import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { ProductCard } from "@/components/ProductCard";
import { products, categories } from "@/data/products";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import aboutMeImage from "@/assets/about-me.jpg";

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

        {/* About Me Section */}
        <section className="mt-16 py-12 border-t border-border">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">About Me</h2>
          <div className="flex flex-col lg:flex-row gap-10 items-center lg:items-start">
            {/* Profile Image */}
            <div className="flex-shrink-0">
              <img 
                src={aboutMeImage} 
                alt="Profile" 
                className="w-48 h-48 md:w-64 md:h-64 rounded-full object-cover border-4 border-primary shadow-elevated"
              />
            </div>
            
            {/* Bio Content */}
            <div className="flex-1 space-y-6">
              <p className="text-muted-foreground leading-relaxed">
                I am a passionate and motivated <span className="font-semibold text-foreground">DevOps & Cloud Engineer (Fresher)</span> with hands-on experience in designing, deploying, and automating cloud-native applications on AWS. I enjoy working at the intersection of development, operations, and automation, and I'm constantly learning new tools and best practices to build scalable and reliable systems.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                I have worked on real-time projects involving CI/CD pipelines, Docker, Kubernetes (Amazon EKS), and Infrastructure as Code (Terraform). My experience includes deploying containerized applications, configuring Auto Scaling, Load Balancers, VPC networking, and implementing monitoring using Prometheus and Grafana.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                I am comfortable with Linux, AWS services (EC2, VPC, IAM, RDS, ELB, ASG, Transit Gateway), and scripting/automation using GitHub Actions and Boto3. I value clean architecture, security best practices, and automation-driven workflows.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Currently, I am seeking an opportunity where I can contribute to a dynamic team, grow as a DevOps engineer, and work on challenging problems that improve system performance, reliability, and scalability.
              </p>
              
              {/* Skills */}
              <div className="pt-4">
                <h3 className="font-semibold text-lg mb-3">Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {["AWS", "DevOps", "Docker", "Kubernetes (EKS)", "Terraform", "CI/CD", "GitHub Actions", "Linux", "Networking", "Monitoring", "Automation"].map((skill) => (
                    <Badge key={skill} variant="secondary" className="text-sm">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Index;
