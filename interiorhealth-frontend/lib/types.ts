export type InventoryItem = {
  id: number | string;
  name: string;
  description?: string;
  category?: string;
  dosage_form?: string;
  strength?: string;
  quantity_available?: number;
  price?: number;
  is_active?: boolean;
};

export type OrderItem = {
  id?: number | string;
  inventory_item: InventoryItem;
  quantity: number;
  price: number;
};

export type Order = {
  id: number | string;
  patient_id?: number | string;
  status: string;
  total_amount: number;
  address?: string;
  created_at?: string;
  items: OrderItem[];
};