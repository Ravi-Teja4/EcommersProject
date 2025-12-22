import { Link } from "react-router-dom";
import { ShoppingCart, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";

const Header = () => {
  const { items } = useCart();
  const { isAuthenticated, logout } = useAuth();

  return (
    <header className="border-b bg-background">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="text-xl font-bold">
          ShopFlow
        </Link>

        <nav className="flex items-center gap-4">
          <Link to="/cart">
            <Button variant="outline" size="icon">
              <ShoppingCart className="h-5 w-5" />
              {items.length > 0 && (
                <span className="ml-1 text-sm">{items.length}</span>
              )}
            </Button>
          </Link>

          {isAuthenticated ? (
            <>
              <Link to="/profile">
                <Button variant="ghost">
                  <User className="h-5 w-5 mr-1" />
                  Profile
                </Button>
              </Link>

              <Button variant="destructive" onClick={logout}>
                Logout
              </Button>
            </>
          ) : (
            <Link to="/auth">
              <Button>Login</Button>
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;

