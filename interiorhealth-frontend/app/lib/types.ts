export type InventoryItem = {
  id: number | string;
  name: string;
  sku?: string | null;
  price?: number | null;
  description?: string | null;
  category?: string | null;
  dosage_form?: string | null;
  strength?: string | null;
  quantity_available?: number | null;
  is_active?: boolean;
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

export type Doctor = {
  id: number | string;
  name: string;
  specialty?: string | null;
  email?: string | null;
  phone?: string | null;
};
