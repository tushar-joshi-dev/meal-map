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
            title: "Breakfast",
            colorToken: "yellow", // Yellow Theme
            items: [
                { name: "Poha" },
                { name: "Rava upma" },
                { name: "Mondal vaggarane" },
                { name: "Bread omelet" },
                { name: "Sunny side up" },
                { name: "Avocado sunny side up" },
                { name: "Boiled egg sandwich" },
                { name: "Green chana chat" },
                { name: "Boiled millets" },
                { name: "Bread upma" },
                { name: "Vermicelli upma" }
            ]
        },
        {
            title: "Brunch",
            colorToken: "emerald", // Green Theme
            items: [
                { name: "Sabudana khichdi" },
                { name: "Sabudana thalipeeth" },
                { name: "Jhunka", options: ["Chapati", "Bhakri", "Rice"] },
                { name: "Utthappa" }
            ]
        },
        {
            title: "Meal",
            colorToken: "orange", // Orange Theme
            items: [
                { name: "Cabbage", options: ["Chapati", "Bhakri"] },
                { name: "Beans", options: ["Chapati", "Bhakri"] },
                { name: "Bhendi dry", options: ["Chapati", "Bhakri"] },
                { name: "Bhendi-onion-tomato", options: ["Chapati", "Bhakri", "Rice"] },
                { name: "Bhendi rasgai", options: ["Chapati", "Bhakri", "Rice"] },
                { name: "Tondli", options: ["Chapati", "Bhakri"] },
                { name: "Cauliflower-batata", options: ["Chapati", "Bhakri"] },
                { name: "Veg korma", options: ["Chapati", "Bhakri", "Rice"] },
                { name: "Pav bhaji" },
                { name: "Chhole", options: ["Chapati", "Rice"] },
                { name: "Rajma", options: ["Chapati", "Rice"] },
                { name: "Black-eyed peas usal", options: ["Chapati", "Bhakri", "Rice"] },
                { name: "Dal makhani", options: ["Chapati", "Bhakri", "Rice"] },
                { name: "Whole moong usal", options: ["Chapati", "Bhakri"] },
                { name: "Moth beans usal", options: ["Chapati", "Bhakri"] },
                { name: "Brown chana usal", options: ["Chapati", "Bhakri"] },
                { name: "Capsicum batata", options: ["Chapati", "Bhakri"] },
                { name: "Tofu/paneer masala", options: ["Chapati", "Bhakri", "Rice"] },
                { name: "Palak paneer/tofu", options: ["Chapati", "Bhakri", "Rice"] },
                { name: "Beetroot", options: ["Chapati", "Bhakri"] },
                { name: "Bottle gourd", options: ["Chapati", "Bhakri"] },
                { name: "Brinjal", options: ["Chapati", "Bhakri", "Rice"] },
                { name: "Thai red curry", options: ["Rice", "Jasmine rice"] }
            ]
        },
        {
            title: "Dal",
            colorToken: "indigo", // Cyan Theme
            items: [
                { name: "Methi dal", options: ["Rice"] },
                { name: "Palak dal", options: ["Chapati", "Bhakri", "Rice"] },
                { name: "Tomato sambar", options: ["Rice"] },
                { name: "Moong mirchi dal", options: ["Rice"] },
                { name: "Dal fry", options: ["Chapati", "Bhakri", "Rice"] }
            ]
        },
        {
            title: "Single-meal Meals",
            colorToken: "purple", // Amber Theme
            items: [
                { name: "Tofu stir fry" },
                { name: "Ragda patties" },
                { name: "Pani puri" },
                { name: "Bruschetta" },
                { name: "Thalipeeth/dhapati" },
                { name: "Tomato omelet" }
            ]
        },
        {
            title: "Sides",
            colorToken: "rose", // Rose Theme
            items: [
                { name: "Ridge gourd chutney" },
                { name: "Green tomato chutney" },
                { name: "Coconut chutney" },
                { name: "Red chutney" },
                { name: "Cucumber-moong kosambri" },
                { name: "Cucumber-peanut kosambri" },
                { name: "Cucumber-curd kosambri" },
                { name: "Carrot-tomato-onion kosambri" },
                { name: "Radish-putani kosambri" }
            ]
        },
        {
            title: "Rice",
            colorToken: "cyan", // Cyan Theme
            items: [
                { name: "Chitra anna" },
                { name: "Puliogare" },
                { name: "Veg pulav" },
                { name: "Bisi bele bhat" },
                { name: "Tomato bhat" }
            ]
        },
    ];

    // Helper function to build a dynamically balanced matrix for a specific column target
    const buildBalancedColumns = (numCols: number) => {
        const columns: FoodCategory[][] = Array.from({ length: numCols }, () => []);
        const heights = Array(numCols).fill(0);

        // Sort items so longest categories are distributed first for optimal packing bounds
        const sorted = [...foodData].sort((a, b) => {
            const aCost = a.items.length + a.items.reduce((acc, curr) => acc + (curr.options?.length || 0), 0);
            const bCost = b.items.length + b.items.reduce((acc, curr) => acc + (curr.options?.length || 0), 0);
            return bCost - aCost;
        });

        sorted.forEach((category) => {
            const cost = 40 + (category.items.length * 36) + category.items.reduce((acc, curr) => acc + (curr.options?.length || 0) * 24, 0);
            const shortestIdx = heights.indexOf(Math.min(...heights));
            columns[shortestIdx].push(category);
            heights[shortestIdx] += cost;
        });

        return columns;
    };

    // Pre-calculate balanced layouts for all responsive breakpoints
    const layout1Col = buildBalancedColumns(1);
    const layout2Col = buildBalancedColumns(2);
    const layout3Col = buildBalancedColumns(3);
    const layout4Col = buildBalancedColumns(4);

    return (
        <div className="w-full px-2 pb-8 flex flex-col gap-6 animate-in fade-in duration-200">

            <div className="flex flex-col gap-0.5 select-none">
                <h1 className="text-base font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
                    Weekly Planner Dashboard
                </h1>
                <p className="text-[11px] text-zinc-400 dark:text-zinc-500">
                    Smart auto-balancing workspace. Columns and category lists scale fluidly across device sizes.
                </p>
            </div>

            {/* =======================================================================
                RESPONSIVE MASONRY PIPELINE:
                Tailwind visibility triggers toggle the correct balanced grid view automatically.
               ======================================================================= */}

            {/* VIEW A: Mobile Single-Column Stack (1 Column) */}
            <div className="flex sm:hidden flex-col gap-4 w-full">
                {layout1Col.map((columnData, colIdx) => (
                    <div key={colIdx} className="flex-1 w-full flex flex-col gap-4">
                        {columnData.map((category, idx) => (
                            <CategoryBox key={idx} title={category.title} items={category.items} slots={slots} onSelectMeal={addMealToGrid} colorToken={category.colorToken} />
                        ))}
                    </div>
                ))}
            </div>

            {/* VIEW B: Tablet Balanced View (2 Columns) */}
            <div className="hidden sm:flex md:hidden flex-row gap-4 w-full items-start">
                {layout2Col.map((columnData, colIdx) => (
                    <div key={colIdx} className="flex-1 min-w-0 w-full flex flex-col gap-4">
                        {columnData.map((category, idx) => (
                            <CategoryBox key={idx} title={category.title} items={category.items} slots={slots} onSelectMeal={addMealToGrid} colorToken={category.colorToken} />
                        ))}
                    </div>
                ))}
            </div>

            {/* VIEW C: Laptop Grid Layout (3 Columns) */}
            <div className="hidden md:flex lg:hidden flex-row gap-4 w-full items-start">
                {layout3Col.map((columnData, colIdx) => (
                    <div key={colIdx} className="flex-1 min-w-0 w-full flex flex-col gap-4">
                        {columnData.map((category, idx) => (
                            <CategoryBox key={idx} title={category.title} items={category.items} slots={slots} onSelectMeal={addMealToGrid} colorToken={category.colorToken} />
                        ))}
                    </div>
                ))}
            </div>

            {/* VIEW D: Wide Desktop Resolution Layout (4 Columns) */}
            <div className="hidden lg:flex flex-row gap-4 w-full items-start">
                {layout4Col.map((columnData, colIdx) => (
                    <div key={colIdx} className="flex-1 min-w-0 w-full flex flex-col gap-4">
                        {columnData.map((category, idx) => (
                            <CategoryBox key={idx} title={category.title} items={category.items} slots={slots} onSelectMeal={addMealToGrid} colorToken={category.colorToken} />
                        ))}
                    </div>
                ))}
            </div>

        </div>
    );
};

export default PlanBuilderPage