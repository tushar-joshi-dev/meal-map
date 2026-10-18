import React, { useState } from 'react';
import type { GridSlot } from '../../model/meal';

const MealGrid: React.FC = () => {
    const totalCols = 7;
    const totalRows = 3;

    const initialSlots: GridSlot[] = [];
    for (let r = 1; r <= totalRows; r++) {
        for (let c = 1; c <= totalCols; c++) {
            initialSlots.push({
                id: `r${r}c${c}`,
                row: r,
                col: c,
                // REMOVED THE ICONS HERE: Plain clean text only
                mealName: r === 1 && c === 1 ? 'Avocado Toast' : r === 1 && c === 2 ? 'Caesar Salad' : null
            });
        }
    }

    const [slots, setSlots] = useState<GridSlot[]>(initialSlots);
    const [draggedSlotId, setDraggedSlotId] = useState<string | null>(null);

    const handleDragStart = (e: React.DragEvent, id: string) => {
        setDraggedSlotId(id);
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
    };

    const handleDrop = (e: React.DragEvent, targetId: string) => {
        e.preventDefault();
        if (!draggedSlotId || draggedSlotId === targetId) return;

        setSlots((prevSlots) => {
            const newSlots = [...prevSlots];
            const sourceIdx = newSlots.findIndex(s => s.id === draggedSlotId);
            const targetIdx = newSlots.findIndex(s => s.id === targetId);

            if (sourceIdx !== -1 && targetIdx !== -1) {
                const temp = newSlots[sourceIdx].mealName;
                newSlots[sourceIdx].mealName = newSlots[targetIdx].mealName;
                newSlots[targetIdx].mealName = temp;
            }
            return newSlots;
        });

        setDraggedSlotId(null);
    };

    return (
        <div
            // Reduced spacing from gap-2 to gap-1.5 to make it ultra-compact
            className="grid gap-x-2 gap-y-1.5 h-full w-full items-center"
            style={{
                gridTemplateRows: 'repeat(3, minmax(0, 1fr))',
                gridTemplateColumns: 'repeat(7, minmax(110px, 1fr))'
            }}
        >
            {slots.map((slot) => (
                <div
                    key={slot.id}
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, slot.id)}
                    // Reduced pill row height from h-9 (36px) to h-7 (28px) to eliminate extra whitespace
                    className="h-7 w-full flex items-center justify-center"
                >
                    {slot.mealName ? (
                        <div
                            draggable
                            onDragStart={(e) => handleDragStart(e, slot.id)}
                            className="w-full h-full flex items-center justify-center text-center truncate text-[11px] font-medium px-2.5 rounded-full bg-blue-100 text-blue-900 dark:bg-blue-950/80 dark:text-blue-200 border border-blue-200 dark:border-blue-900 shadow-xs cursor-grab active:cursor-grabbing select-none"
                        >
                            {slot.mealName}
                        </div>
                    ) : (
                        <div className="w-full h-full rounded-full border border-dashed border-zinc-200 dark:border-zinc-800 bg-transparent" />
                    )}
                </div>
            ))}
        </div>
    );
};

export default MealGrid;