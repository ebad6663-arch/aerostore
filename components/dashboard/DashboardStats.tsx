"use client";

import StatsCard from "@/components/admin/StatsCard";

import {
  Wallet,
  ShoppingCart,
  Package,
  Users,
  CalendarDays,
  TrendingUp,
} from "lucide-react";

interface Props {
  revenue: number;
  todayRevenue: number;
  monthRevenue: number;

  totalProducts: number;
  totalCustomers: number;
  totalOrders: number;

  todayOrders: number;
  monthOrders: number;
}

export default function DashboardStats({
  revenue,
  todayRevenue,
  monthRevenue,

  totalProducts,
  totalCustomers,
  totalOrders,

  todayOrders,
  monthOrders,
}: Props) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
      <StatsCard
        title="Total Revenue"
        value={`PKR ${revenue.toLocaleString()}`}
        icon={<Wallet size={24} />}
      />

      <StatsCard
        title="Today's Revenue"
        value={`PKR ${todayRevenue.toLocaleString()}`}
        icon={<TrendingUp size={24} />}
      />

      <StatsCard
        title="Monthly Revenue"
        value={`PKR ${monthRevenue.toLocaleString()}`}
        icon={<CalendarDays size={24} />}
      />

      <StatsCard
        title="Total Orders"
        value={totalOrders}
        icon={<ShoppingCart size={24} />}
      />

      <StatsCard
        title="Today's Orders"
        value={todayOrders}
        icon={<ShoppingCart size={24} />}
      />

      <StatsCard
        title="Monthly Orders"
        value={monthOrders}
        icon={<ShoppingCart size={24} />}
      />

      <StatsCard
        title="Products"
        value={totalProducts}
        icon={<Package size={24} />}
      />

      <StatsCard
        title="Customers"
        value={totalCustomers}
        icon={<Users size={24} />}
      />
    </div>
  );
}