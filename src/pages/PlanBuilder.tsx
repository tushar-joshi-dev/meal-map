import CategoryBox from "../components/category-box/CategoryBox";
import type { CategoryColorToken } from "../components/category-box/CategoryColors";
import { useMealGrid } from '../context/MealGridContext';

interface FoodCategory {
    title: string;
    colorToken: CategoryColorToken; // Typed explicitly instead of plain string
    items: {
        name: string;
        options?: string[];
    }[];
}

const PlanBuilderPage = () => {
    const { slots, addMealToGrid } = useMealGrid();

    // Mocking 6 categories
    const foodData: FoodCategory[] = [
        {
            title: "Breakfast Classics",
            colorToken: "yellow", // Yellow Theme
            items: [
                { name: "Avocado Toast" },
                { name: "Oatmeal Bowl" },
                { name: "Pancakes", options: ["Maple Syrup", "Blueberries", "Chocolate Chips"] }
            ]
        },
        {
            title: "Salads & Greens",
            colorToken: "emerald", // Green Theme
            items: [
                { name: "Caesar Salad", options: ["Chicken", "Salmon", "Tofu"] },
                { name: "Greek Salad" },
                { name: "Cobb Salad" }
            ]
        },
        {
            title: "Hearty Soups",
            colorToken: "orange", // Orange Theme
            items: [
                { name: "Tomato Basil" },
                { name: "Chicken Noodle" },
                { name: "Lentil Soup" }
            ]
        },
        {
            title: "Main Course",
            colorToken: "indigo", // Cyan Theme
            items: [
                { name: "Thai Green Curry", options: ["White Rice", "Jasmine Rice", "Brown Rice"] },
                { name: "Sirloin Steak", options: ["French Fries", "Mashed Potatoes"] },
                { name: "Pasta Primavera" }
            ]
        },
        {
            title: "Sides & Snacks",
            colorToken: "purple", // Amber Theme
            items: [
                { name: "French Fries" },
                { name: "Sweet Potato Fries" },
                { name: "Garlic Bread" }
            ]
        },
        {
            title: "Desserts",
            colorToken: "rose", // Rose Theme
            items: [
                { name: "Chocolate Brownie", options: ["With Ice Cream", "Plain"] },
                { name: "Apple Pie" },
                { name: "Cheesecake" }
            ]
        },
    ];

    return (
        <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
                {foodData.map((category, index) => (
                    <CategoryBox
                        key={index}
                        title={category.title}
                        items={category.items}
                        slots={slots}
                        onSelectMeal={addMealToGrid}
                        colorToken={category.colorToken} // Type checked safely via compiler rules
                    />
                ))}
            </div>
        </div>
    );
};

export default PlanBuilderPage