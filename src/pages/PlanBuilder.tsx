import CategoryBox from "../components/category-box/CategoryBox";
import { useMealGrid } from '../context/MealGridContext';

const PlanBuilderPage = () => {
    const { slots, addMealToGrid } = useMealGrid();

    // Mocking 6 categories
    const foodData = [
        {
            title: "Breakfast Classics",
            items: [
                { name: "Avocado Toast" },
                { name: "Oatmeal Bowl" },
                { name: "Pancakes", options: ["Maple Syrup", "Blueberries", "Chocolate Chips"] }
            ]
        },
        {
            title: "Salads & Greens",
            items: [
                { name: "Caesar Salad", options: ["Chicken", "Salmon", "Tofu"] },
                { name: "Greek Salad" },
                { name: "Cobb Salad" }
            ]
        },
        {
            title: "Hearty Soups",
            items: [
                { name: "Tomato Basil" },
                { name: "Chicken Noodle" },
                { name: "Lentil Soup" }
            ]
        },
        {
            title: "Main Course",
            items: [
                { name: "Thai Green Curry", options: ["White Rice", "Jasmine Rice", "Brown Rice"] },
                { name: "Sirloin Steak", options: ["French Fries", "Mashed Potatoes"] },
                { name: "Pasta Primavera" } // Clean object format instead of plain string
            ]
        },
        {
            title: "Sides & Snacks",
            items: [
                { name: "French Fries" },
                { name: "Sweet Potato Fries" },
                { name: "Garlic Bread" }
            ]
        },
        {
            title: "Desserts",
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
                        slots={slots} // Pass along the live slot values
                        onSelectMeal={addMealToGrid}
                    />
                ))}
            </div>
        </div>
    );
};

export default PlanBuilderPage