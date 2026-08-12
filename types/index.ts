export type UserRole = "ADMIN" | "CUSTOMER";

export type OrderStatus =
  | "PENDING"
  | "PROCESSING"
  | "SHIPPED"
  | "DELIVERED"
  | "CANCELLED";

export type PaymentMethod =
  | "COD"
  | "EASYPAISA"
  | "JAZZCASH";

export type PaymentStatus =
  | "PENDING"
  | "PAID"
  | "FAILED";