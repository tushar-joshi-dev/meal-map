export interface GridSlot {
  id: string;
  row: number;
  col: number;
  meals: MealItem[];
}

export interface MenuItem {
  name: string;
  options?: string[];
}

export interface MealItem {
  name: string;
  option?: string;
}