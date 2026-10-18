export interface GridSlot {
  id: string;
  row: number;
  col: number;
  mealName: string | null;
}

export interface MenuItem {
  name: string;
  options?: string[];
}