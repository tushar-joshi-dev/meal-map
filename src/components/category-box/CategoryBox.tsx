import React, { useState } from 'react';
import type { GridSlot, MealItem, MenuItem } from '../../model/meal';
import SelectedMealLabel from '../item-label/SelectedMealLabel';
import { getCategoryTheme, type CategoryColorToken } from './CategoryColors';

interface CategoryBoxProps {
    title: string;
    items: MenuItem[];
    slots: GridSlot[]; // Global grid array to check selection states
    onSelectMeal?: (meal: MealItem) => void;
    colorToken?: CategoryColorToken;
}

const CategoryBox: React.FC<CategoryBoxProps> = ({ title, items, slots, onSelectMeal, colorToken }) => {
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
    const theme = getCategoryTheme(colorToken);

    return (
        <div className="flex flex-col bg-zinc-50/50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800/80 rounded-lg overflow-hidden shadow-xs h-full min-h-[180px] transition-colors duration-200">

            {/* Header: Fixed back to a compact, tight height track padding */}
            <div className={`px-3 py-2 border-b flex items-center gap-2 select-none ${theme.border} ${theme.darkBorder} ${theme.headerBg}`}>
                <div className={`w-2 h-2 rounded-full flex-shrink-0 shadow-2xs ${theme.circle}`} />
                <h3 className="text-sm font-black tracking-wide uppercase text-zinc-900 dark:text-zinc-100 leading-none">
                    {title}
                </h3>
            </div>

            <div className="flex-1 p-3 overflow-y-auto">
                {items.length > 0 ? (
                    <div className="flex flex-col gap-1.5">
                        {items.map((item, idx) => {
                            const isExpanded = expandedIndex === idx;
                            const hasOptions = item.options && item.options.length > 0;
                            const isSelected = slots.some(slot =>
                                slot.meals && slot.meals.some(meal => meal.name === item.name)
                            );

                            let targetDisplayName = item.name;
                            let activeMealReference: MealItem | undefined = undefined;

                            if (isSelected) {
                                const activeSlot = slots.find(slot =>
                                    slot.meals && slot.meals.some(meal => meal.name === item.name)
                                );
                                activeMealReference = activeSlot?.meals.find(meal => meal.name === item.name);
                                if (activeMealReference) {
                                    targetDisplayName = activeMealReference.option
                                        ? `${activeMealReference.name} (${activeMealReference.option})`
                                        : activeMealReference.name;
                                }
                            }

                            return (
                                <div key={idx} className="flex flex-col gap-1">
                                    {/* Primary Listing Card: Tight container padding restored (px-3 py-2) */}
                                    <div
                                        onClick={() => {
                                            if (isSelected && activeMealReference) {
                                                onSelectMeal?.(activeMealReference);
                                                setExpandedIndex(null);
                                                return;
                                            }
                                            if (hasOptions) {
                                                setExpandedIndex(isExpanded ? null : idx);
                                            } else {
                                                onSelectMeal?.({ name: item.name, categoryColor: colorToken });
                                                setExpandedIndex(null);
                                            }
                                        }}
                                        className={`w-full text-left text-xs font-bold px-3 py-2 rounded-lg border cursor-pointer transition-all active:scale-[0.99] select-none flex justify-between items-center ${isSelected
                                                ? `theme.bg {theme.border} theme.darkBg {theme.darkBorder}`
                                                : isExpanded
                                                    ? 'bg-zinc-100/80 dark:bg-zinc-800/60 border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100'
                                                    : `bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-zinc-200 hover:bg-zinc-50 dark:hover:bg-zinc-900 theme.hoverBorder {theme.darkHoverBorder}`
                                            }`}
                                    >
                                        {isSelected ? (
                                            <SelectedMealLabel fullName={targetDisplayName} colorToken={colorToken} />
                                        ) : (
                                            <span className="text-xs font-bold text-zinc-800 dark:text-zinc-200 truncate">{item.name}</span>
                                        )}
                                        {hasOptions && !isSelected && (
                                            <span className="text-xs font-bold transition-transform duration-200 text-zinc-400">
                                                ▼
                                            </span>
                                        )}
                                    </div>

                                    {/* Option Drawer: Maintained compact gap sizes */}
                                    {hasOptions && isExpanded && !isSelected && (
                                        <div className="px-1.5 py-1 bg-zinc-100/40 dark:bg-zinc-950/60 rounded-lg border border-zinc-200/50 dark:border-zinc-800/60 flex flex-wrap gap-1 mt-0.5">
                                            {item.options!.map((option, optIdx) => (
                                                <button
                                                    key={optIdx}
                                                    onClick={() => {
                                                        onSelectMeal?.({ name: item.name, option, categoryColor: colorToken });
                                                        setExpandedIndex(null);
                                                    }}
                                                    className="text-xs cursor-pointer font-bold px-2 py-0.5 rounded-md bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-zinc-100 transition-all active:scale-95"
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