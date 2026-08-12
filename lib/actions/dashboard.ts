"use server";

import { prisma } from "@/lib/prisma";

export async function getDashboardStats() {
  const today = new Date();

  const startOfToday = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  );

  const startOfMonth = new Date(
    today.getFullYear(),
    today.getMonth(),
    1
  );

  const [
    totalProducts,
    totalCustomers,
    totalOrders,

    revenue,
    todayRevenue,
    monthRevenue,

    todayOrders,
    monthOrders,

    lowStockProducts,
    recentOrders,
    recentCustomers,
  ] = await Promise.all([

    prisma.product.count({
      where: {
        deletedAt: null,
      },
    }),

    prisma.user.count({
      where: {
        role: "CUSTOMER",
      },
    }),

    prisma.order.count(),

    prisma.order.aggregate({
      _sum: {
        total: true,
      },
      where: {
        paymentStatus: "PAID",
      },
    }),

    prisma.order.aggregate({
      _sum: {
        total: true,
      },
      where: {
        paymentStatus: "PAID",
        createdAt: {
          gte: startOfToday,
        },
      },
    }),

    prisma.order.aggregate({
      _sum: {
        total: true,
      },
      where: {
        paymentStatus: "PAID",
        createdAt: {
          gte: startOfMonth,
        },
      },
    }),

    prisma.order.count({
      where: {
        createdAt: {
          gte: startOfToday,
        },
      },
    }),

    prisma.order.count({
      where: {
        createdAt: {
          gte: startOfMonth,
        },
      },
    }),

    prisma.product.findMany({
      where: {
        deletedAt: null,
        stock: {
          lte: 5,
        },
      },
      include: {
        category: true,
        images: {
          take: 1,
        },
      },
      orderBy: {
        stock: "asc",
      },
      take: 5,
    }),

    prisma.order.findMany({
      take: 5,
      orderBy: {
        createdAt: "desc",
      },
      include: {
        user: true,
      },
    }),

    prisma.user.findMany({
      where: {
        role: "CUSTOMER",
      },
      take: 5,
      orderBy: {
        createdAt: "desc",
      },
    }),

  ]);

  return {
    stats: {
      revenue: Number(revenue._sum.total ?? 0),

      todayRevenue: Number(
        todayRevenue._sum.total ?? 0
      ),

      monthRevenue: Number(
        monthRevenue._sum.total ?? 0
      ),

      totalProducts,

      totalCustomers,

      totalOrders,

      todayOrders,

      monthOrders,
    },

    lowStockProducts,

    recentOrders,

    recentCustomers,
  };
}