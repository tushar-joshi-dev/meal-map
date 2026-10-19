import { useState } from "react";
import { useMealGrid } from "../../context/MealGridContext";
import MealGrid from "../meal-grid/MealGrid";

const Footer = () => {
    const { slots, startDate } = useMealGrid();
    const [isCopied, setIsCopied] = useState(false);

    const handleClipboardCopy = () => {
        if (isCopied) return;

        // Helper utility to match the columns with target calendar date text blocks
        const getFormattedDateLabel = (colIndex: number) => {
            const baseDate = startDate ? new Date(startDate + 'T00:00:00') : new Date();
            baseDate.setDate(baseDate.getDate() + colIndex);

            const dateStr = baseDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
            const dayStr = baseDate.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase();
            return `${dateStr} (${dayStr})`;
        };

        // 2. Map items out using active dynamic dates instead of index addresses
        const menuSummary = slots
            .filter(s => s.meals && s.meals.length > 0)
            .map(s => {
                const dateLabel = getFormattedDateLabel(s.col); // Match via slot column index properties
                const formattedMeals = s.meals
                    .map(m => m.option ? `${m.name} (${m.option})` : m.name)
                    .join(', ');

                return `${dateLabel}: ${formattedMeals}`;
            })
            .join('\n');

        navigator.clipboard.writeText(menuSummary || "No items selected yet.");

        setIsCopied(true);
        setTimeout(() => {
            setIsCopied(false);
        }, 1500);
    };

    return (
        <footer className="fixed bottom-0 inset-x-0 h-[175px] z-50 flex bg-zinc-50 dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800 transition-colors duration-200">
            {/* LEFT CONTAINER: Houses the modular meal grid */}
            <div className="flex-1 p-3 flex items-center overflow-visible">
                <MealGrid />
            </div>

            {/* RIGHT ACTION: Floating, rounded square button */}
            <div className="h-full flex items-center px-4 flex-shrink-0">
                <button
                    onClick={handleClipboardCopy}
                    disabled={isCopied} // Automatically blocks clicks while "Copied" is active
                    className={`w-[108px] h-[108px] flex flex-col items-center justify-center gap-1.5 rounded-xl border transition-all duration-200 font-semibold active:scale-[0.96] ${isCopied
                        ? 'border-green-300 dark:border-green-900 bg-green-50/30 dark:bg-green-950/20 text-green-600 dark:text-green-400 cursor-default'
                        : 'border-zinc-200 dark:border-zinc-800 bg-transparent text-zinc-700 dark:text-zinc-300 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-300 dark:hover:border-blue-800 cursor-pointer group'
                        }`}
                >
                    {isCopied ? (
                        // SUCCESS ANIMATION: Green checkmark with a smooth bounce entry effect
                        <svg xmlns="http://w3.org" fill="none" viewBox="0 0 24 24" strokeWidth={2.2} stroke="currentColor" className="w-5 h-5 animate-[bounce_0.5s_ease-in-out_1]">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                        </svg>
                    ) : (
                        // Standard Clipboard Icon
                        <svg xmlns="http://w3.org" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-5 h-5 text-zinc-400 group-hover:text-blue-500 transition-colors">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c1.005.492 1.7 1.517 1.7 2.713v11.75a2.25 2.25 0 0 1-2.25 2.25h-7.5a2.25 2.25 0 0 1-2.25-2.25V6.6c0-1.196.695-2.22 1.7-2.713M15.666 3.888V18.75A2.25 2.25 0 0 1 13.5 21h-3a2.25 2.25 0 0 1-2.25-2.25V3.888" />
                        </svg>
                    )}

                    {/* Dynamic Label Swap */}
                    <span className="text-[10px] font-bold tracking-wider uppercase transition-colors">
                        {isCopied ? 'Copied' : 'Copy Menu'}
                    </span>
                </button>
            </div>

        </footer>
    );
};

export default Footer;