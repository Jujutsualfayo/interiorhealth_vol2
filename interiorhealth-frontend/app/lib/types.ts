export type InventoryItem = {
  id: number | string;
  name: string;
  sku?: string | null;
  price?: number | null;
  description?: string | null;
};

export type OrderItem = {
  id: number | string;
  inventory_item: InventoryItem;
  quantity: number;
  price: number;
};

export type Order = {
  id: number | string;
  status: string;
  address?: string | null;
  total_amount?: number | null;
  items: OrderItem[];
  created_at?: string | null;
};
