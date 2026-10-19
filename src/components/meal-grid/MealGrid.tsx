import React from 'react';
import { MAX_MEALS_PER_SLOT, useMealGrid } from '../../context/MealGridContext';
import SelectedMealLabel from '../item-label/SelectedMealLabel';
import { getCategoryTheme } from '../category-box/CategoryColors';

const MealGrid: React.FC = () => {
    const { slots, setSlots, startDate } = useMealGrid();

    // Helper utility to calculate dynamic header strings for the 7 columns
    const getColumnDateHeader = (colIndex: number) => {
        const baseDate = startDate ? new Date(startDate + 'T00:00:00') : new Date();
        baseDate.setDate(baseDate.getDate() + colIndex);

        const dateString = baseDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
        const dayName = baseDate.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase();

        return { dateString, dayName };
    };

    const handleDragStart = (e: React.DragEvent, slotIdx: number, mealIdx: number) => {
        const dragData = { slotIdx, mealIdx };
        e.dataTransfer.setData('application/json', JSON.stringify(dragData));
        e.dataTransfer.effectAllowed = 'move';
    };

    const handleDragOver = (e: React.DragEvent, targetSlotIdx: number) => {
        const targetSlot = slots[targetSlotIdx];
        if (targetSlot && targetSlot.meals.length >= MAX_MEALS_PER_SLOT) {
            return;
        }
        e.preventDefault();
        if (e.dataTransfer) {
            e.dataTransfer.dropEffect = 'move';
        }
    };

    const handleDrop = (e: React.DragEvent, targetSlotIdx: number) => {
        e.preventDefault();
        const rawData = e.dataTransfer.getData('application/json');
        if (!rawData) return;

        try {
            const { slotIdx: sourceSlotIdx, mealIdx: sourceMealIdx } = JSON.parse(rawData);
            if (sourceSlotIdx === undefined || sourceMealIdx === undefined) return;

            const targetSlot = slots[targetSlotIdx];
            if (targetSlot.meals.length >= MAX_MEALS_PER_SLOT) return;

            // Create shallow clones of the arrays to maintain immutability principles cleanly
            const newSlots = [...slots];
            const sourceMeals = [...newSlots[sourceSlotIdx].meals];
            const targetMeals = [...newSlots[targetSlotIdx].meals];

            const [movedItem] = sourceMeals.splice(sourceMealIdx, 1);

            if (sourceSlotIdx === targetSlotIdx) {
                const reorderedMeals = [...slots[sourceSlotIdx].meals];
                const [item] = reorderedMeals.splice(sourceMealIdx, 1);
                reorderedMeals.push(item);
                newSlots[sourceSlotIdx].meals = reorderedMeals;
            } else {
                targetMeals.push(movedItem);
                newSlots[sourceSlotIdx].meals = sourceMeals;
                newSlots[targetSlotIdx].meals = targetMeals;
            }

            /* 
              CRITICAL CHECK: Ensure this is a direct array assignment parameter call!
              Do NOT use a functional callback wrapper signature here like setSlots(prev => ...).
            */
            setSlots(newSlots);
        } catch (error) {
            console.error("Failed to parse drag-and-drop metadata:", error);
        }
    };

    return (
        <div className="flex flex-col w-full h-full justify-center overflow-visible">

            {/* COLUMN HEADERS: Clean and compact line-height adjustments */}
            <div
                className="grid gap-x-2 mb-1.5 w-full text-center select-none"
                style={{ gridTemplateColumns: 'repeat(7, minmax(110px, 1fr))' }}
            >
                {Array.from({ length: 7 }).map((_, colIdx) => {
                    const { dateString, dayName } = getColumnDateHeader(colIdx);
                    return (
                        <div key={colIdx} className="flex flex-col items-center justify-center border-b border-zinc-200/60 dark:border-zinc-800/60 pb-1">
                            <span className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
                                {dateString}
                            </span>
                            <span className="text-[10px] font-black tracking-wider text-zinc-400 dark:text-zinc-500 mt-0.5">
                                {dayName}
                            </span>
                        </div>
                    );
                })}
            </div>

            {/* WORKSPACE MATRIX: Restored absolute h-8 container heights to stay within the 140px/175px footer frame perfectly */}
            <div
                className="grid gap-x-2 gap-y-1.5 w-full items-center overflow-visible"
                style={{
                    gridTemplateRows: 'repeat(3, minmax(0, 1fr))',
                    gridTemplateColumns: 'repeat(7, minmax(110px, 1fr))'
                }}
            >
                {slots.map((slot, slotIdx) => {
                    const hasMeals = slot.meals && slot.meals.length > 0;

                    return (
                        <div
                            key={slot.id}
                            onDragOver={(e) => handleDragOver(e, slotIdx)}
                            onDrop={(e) => handleDrop(e, slotIdx)}
                            className={`h-8 w-full flex flex-row gap-1 p-0.5 rounded-lg border transition-all duration-150 relative overflow-visible hover:z-30 ${hasMeals ? 'bg-transparent border-transparent' : 'border-dashed border-zinc-200 dark:border-zinc-800'
                                }`}
                        >
                            {hasMeals ? (
                                slot.meals.map((meal, mealIdx) => {
                                    const fullMealString = meal.option ? `${meal.name} (${meal.option})` : meal.name;
                                    const cardTheme = getCategoryTheme(meal.categoryColor);

                                    return (
                                        <div
                                            key={`${slot.id}-${mealIdx}`}
                                            draggable
                                            onDragStart={(e) => handleDragStart(e, slotIdx, mealIdx)}
                                            /* Tight padding (px-1 py-0) keeps text centered inside h-8 frame boundaries cleanly */
                                            className={`group relative flex-1 min-w-0 h-full flex items-center px-1 py-0 rounded-md text-xs font-bold shadow-xs cursor-grab active:cursor-grabbing hover:shadow-sm transition-all text-left ${cardTheme.bg} ${cardTheme.border} ${cardTheme.darkBg} ${cardTheme.darkBorder}`}
                                        >
                                            <div className="truncate w-full pointer-events-none">
                                                <SelectedMealLabel fullName={fullMealString} colorToken={meal.categoryColor} />
                                            </div>

                                            {/* TOOLTIP AXIS */}
                                            <div className="absolute hidden group-hover:flex bottom-full left-1/2 -translate-x-1/2 mb-1.5 z-50 pointer-events-none flex-col items-center">
                                                <div className="bg-zinc-950 dark:bg-zinc-800 text-white dark:text-zinc-100 text-xs px-2 py-1 rounded-md shadow-md whitespace-nowrap font-medium border border-zinc-800 dark:border-zinc-700 max-w-[200px] truncate">
                                                    {fullMealString}
                                                </div>
                                                <div className="w-1.5 h-1.5 bg-zinc-950 dark:bg-zinc-800 border-r border-b border-zinc-800 dark:border-zinc-700 rotate-45 -mt-[4px]"></div>
                                            </div>
                                        </div>
                                    );
                                })
                            ) : null}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default MealGrid;