import React from 'react';
import { MAX_MEALS_PER_SLOT, useMealGrid } from '../../context/MealGridContext';
import SelectedMealLabel from '../item-label/SelectedMealLabel';

const MealGrid: React.FC = () => {
    const { slots, setSlots } = useMealGrid();

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

            setSlots(newSlots);
        } catch (error) {
            console.error("Failed to parse drag-and-drop metadata:", error);
        }
    };

    return (
        <div
            className="grid gap-x-2 gap-y-1.5 h-full w-full items-center"
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
                        /* 
                          1. Added 'overflow-visible' and 'relative' to anchor child layouts.
                          2. Added 'hover:z-30' so the active cell moves above its adjacent layout neighbors on hover.
                        */
                        className={`h-8 w-full flex flex-row gap-1 p-0.5 rounded-lg border transition-all duration-150 relative overflow-visible hover:z-30 ${hasMeals
                            ? 'bg-transparent border-transparent'
                            : 'border-dashed border-zinc-200 dark:border-zinc-800'
                            }`}
                    >
                        {hasMeals ? (
                            slot.meals.map((meal, mealIdx) => {
                                const fullMealString = meal.option ? `${meal.name} (${meal.option})` : meal.name;
                                return (
                                    <div
                                        key={`${slot.id}-${mealIdx}`}
                                        draggable
                                        onDragStart={(e) => handleDragStart(e, slotIdx, mealIdx)}
                                        className="group relative flex-1 min-w-0 h-full flex items-center px-1.5 rounded-md bg-blue-50/80 border border-blue-300 dark:bg-blue-950/40 dark:border-blue-900/80 text-[10px] font-medium shadow-xs cursor-grab active:cursor-grabbing hover:shadow-sm transition-shadow text-left"
                                    >
                                        <div className="truncate w-full pointer-events-none">
                                            <SelectedMealLabel
                                                fullName={fullMealString}
                                            />
                                        </div>

                                        {/* 
                                          CUSTOM CSS TOOLTIP: 
                                          - Pushed up higher using z-[60] to cleanly clear the z-50 footer stack context.
                                          - Positioned absolutely above the item card (bottom-full mb-1.5).
                                        */}
                                        <div className="absolute hidden group-hover:flex bottom-full left-1/2 -translate-x-1/2 mb-1.5 z-[60] pointer-events-none flex-col items-center">
                                            {/* The Tooltip Bubble */}
                                            <div className="bg-zinc-950 dark:bg-zinc-800 text-white dark:text-zinc-100 text-[10px] px-2 py-1 rounded shadow-md whitespace-nowrap font-normal border border-zinc-800 dark:border-zinc-700 max-w-[200px] truncate">
                                                {fullMealString}
                                            </div>
                                            {/* The Little Centered Arrow Pointing Down */}
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
    );
};

export default MealGrid;