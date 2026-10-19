import type { CategoryColorToken } from "../components/category-box/CategoryColors";

export interface GridSlot {
  id: string;
  row: number;
  col: number;
  meals: MealItem[];
}

export interface MenuItem {
  name: string;
  options?: string[];
  categoryColor?: CategoryColorToken;
}

export interface MealItem {
  name: string;
  option?: string;
  categoryColor?: CategoryColorToken;
}