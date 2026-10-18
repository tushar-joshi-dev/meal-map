import React, { useState } from 'react';
import type { GridSlot, MenuItem } from '../../model/meal';
import SelectedMealLabel from '../item-label/SelectedMealLabel';

interface CategoryBoxProps {
    title: string;
    items: MenuItem[];
    slots: GridSlot[]; // Global grid array to check selection states
    onSelectMeal?: (mealName: string) => void;
}

const CategoryBox: React.FC<CategoryBoxProps> = ({ title, items, slots, onSelectMeal }) => {
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

    return (
        <div className="flex flex-col bg-zinc-50/50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800/80 rounded-xl overflow-hidden shadow-xs h-full min-h-[180px] transition-colors duration-200">

            <div className="px-4 py-3 bg-zinc-100/70 dark:bg-zinc-900/90 border-b border-zinc-200 dark:border-zinc-800/80">
                <h3 className="text-xs font-extrabold tracking-wider uppercase text-zinc-900 dark:text-zinc-100">
                    {title}
                </h3>
            </div>

            <div className="flex-1 p-3 overflow-y-auto">
                {items.length > 0 ? (
                    <div className="flex flex-col gap-1.5">
                        {items.map((item, idx) => {
                            const isExpanded = expandedIndex === idx;
                            const hasOptions = item.options && item.options.length > 0;

                            // 1. Check if this base item name exists in the active grid layout slots
                            // It looks for either exact matches ("Greek Salad") or optional matching prefixes ("Thai Green Curry (Jasmine Rice)")
                            const matchingSlot = slots.find(s =>
                                s.mealName === item.name || (s.mealName && s.mealName.startsWith(`${item.name} (`))
                            );
                            const isSelected = !!matchingSlot;

                            return (
                                <div key={idx} className="flex flex-col gap-1">
                                    {/* Row Box Container */}
                                    <div
                                        onClick={() => {
                                            if (hasOptions) {
                                                setExpandedIndex(isExpanded ? null : idx);
                                            } else {
                                                onSelectMeal?.(item.name);
                                                setExpandedIndex(null);
                                            }
                                        }}
                                        // Toned down selection styles: replaced the heavy solid background with a soft, clean colored tint
                                        className={`w-full text-left text-xs font-medium px-3 py-2 rounded-lg border cursor-pointer transition-all active:scale-[0.99] select-none flex justify-between items-center ${isSelected
                                            ? 'bg-blue-50/80 border-blue-300 text-blue-700 dark:bg-blue-950/40 dark:border-blue-900/80 dark:text-blue-300 font-semibold'
                                            : isExpanded
                                                ? 'bg-blue-50/30 dark:bg-blue-950/20 border-blue-200/60 dark:border-blue-950/60 text-blue-600 dark:text-blue-400'
                                                : 'bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-zinc-200 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-200 dark:hover:border-blue-900'
                                            }`}
                                    >
                                        {isSelected ? (
                                            <SelectedMealLabel fullName={matchingSlot.mealName || ""} />
                                        ) : (
                                            <span className="text-zinc-800 dark:text-zinc-200 truncate">{item.name}</span>
                                        )}
                                        {hasOptions && (
                                            <span className={`text-[10px] font-bold transition-transform duration-200 ${isSelected ? 'text-blue-500' : 'text-zinc-400'} ${isExpanded ? 'rotate-180' : ''}`}>
                                                ▼
                                            </span>
                                        )}
                                    </div>

                                    {/* Sub-Item Expanding Drawer */}
                                    {hasOptions && isExpanded && (
                                        <div className="px-1.5 py-1 bg-zinc-100/40 dark:bg-zinc-950/60 rounded-lg border border-zinc-200/50 dark:border-zinc-800/60 flex flex-wrap gap-1 mt-0.5">
                                            {item.options!.map((option, optIdx) => (
                                                <button
                                                    key={optIdx}
                                                    onClick={() => {
                                                        onSelectMeal?.(`${item.name} (${option})`);
                                                        setExpandedIndex(null);
                                                    }}
                                                    className="text-[10px] cursor-pointer font-semibold px-2 py-1 rounded-md bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-blue-50 dark:hover:bg-blue-950 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-200 dark:hover:border-blue-900 transition-all active:scale-95"
                                                >
                                                    + {option}
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div className="h-full flex items-center justify-center text-xs text-zinc-400 dark:text-zinc-500 italic select-none">
                        No items available
                    </div>
                )}
            </div>

        </div>
    );
};

export default CategoryBox;