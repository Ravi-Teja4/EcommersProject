import { Link } from "react-router-dom";
import { Package, ArrowRight } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Order } from "@/types";

// Sample orders for demo
const sampleOrders: Order[] = [
  {
    id: "ORD-001",
    items: [],
    total: 478.99,
    status: "delivered",
    createdAt: "2024-01-15",
    shippingAddress: {
      street: "123 Main St",
      city: "New York",
      state: "NY",
      zipCode: "10001",
      country: "USA",
    },
  },
  {
    id: "ORD-002",
    items: [],
    total: 129.00,
    status: "shipped",
    createdAt: "2024-01-20",
    shippingAddress: {
      street: "456 Oak Ave",
      city: "Los Angeles",
      state: "CA",
      zipCode: "90001",
      country: "USA",
    },
  },
  {
    id: "ORD-003",
    items: [],
    total: 89.00,
    status: "processing",
    createdAt: "2024-01-22",
    shippingAddress: {
      street: "789 Pine Rd",
      city: "Chicago",
      state: "IL",
      zipCode: "60601",
      country: "USA",
    },
  },
];

const statusColors: Record<Order["status"], string> = {
  pending: "bg-warning/10 text-warning border-warning/20",
  processing: "bg-primary/10 text-primary border-primary/20",
  shipped: "bg-accent text-accent-foreground border-accent",
  delivered: "bg-success/10 text-success border-success/20",
};

const Orders = () => {
  const orders = sampleOrders;

  if (orders.length === 0) {
    return (
      <Layout>
        <div className="container py-16 text-center">
          <div className="max-w-md mx-auto animate-fade-in">
            <Package className="h-16 w-16 mx-auto mb-6 text-muted-foreground" />
            <h1 className="text-2xl font-semibold mb-2">No orders yet</h1>
            <p className="text-muted-foreground mb-6">
              When you place an order, it will appear here.
            </p>
            <Link to="/">
              <Button size="lg">Start Shopping</Button>
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container py-8 max-w-4xl">
        <h1 className="text-3xl font-bold mb-8">My Orders</h1>

        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-card rounded-xl p-6 shadow-card animate-fade-in"
            >
              <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                <div>
                  <p className="font-semibold">{order.id}</p>
                  <p className="text-sm text-muted-foreground">
                    Ordered on {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <Badge
                  variant="outline"
                  className={statusColors[order.status]}
                >
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </Badge>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Total Amount</p>
                  <p className="text-lg font-semibold">${order.total.toFixed(2)}</p>
                </div>

                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Ship to</p>
                  <p className="text-sm">
                    {order.shippingAddress.city}, {order.shippingAddress.state}
                  </p>
                </div>

                <Button variant="ghost" size="sm" className="gap-2">
                  View Details
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Orders;
