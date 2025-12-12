import { Layers, Smartphone, ShoppingBag, Footprints, Home, Dumbbell, User } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

const categoryIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  "All": Layers,
  "Electronics": Smartphone,
  "Bags": ShoppingBag,
  "Footwear": Footprints,
  "Home": Home,
  "Fitness": Dumbbell,
  "About Me": User,
};

interface CategorySidebarProps {
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

export function CategorySidebar({ categories, selectedCategory, onSelectCategory }: CategorySidebarProps) {
  const allCategories = [...categories, "About Me"];

  return (
    <Sidebar className="border-r border-border">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Categories
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {allCategories.map((category) => {
                const Icon = categoryIcons[category] || Layers;
                const isActive = selectedCategory === category;
                
                return (
                  <SidebarMenuItem key={category}>
                    <SidebarMenuButton
                      onClick={() => onSelectCategory(category)}
                      isActive={isActive}
                      className={cn(
                        "w-full justify-start gap-3 transition-all",
                        isActive && "bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground"
                      )}
                    >
                      <Icon className="h-4 w-4" />
                      <span>{category}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
