import React from 'react';
import { useMealGrid } from '../../context/MealGridContext';
import SelectedMealLabel from '../item-label/SelectedMealLabel';

const MealGrid: React.FC = () => {
    const { slots, setSlots } = useMealGrid();

    const handleDragStart = (e: React.DragEvent, index: number) => {
        if (!slots[index].mealName) {
            e.preventDefault();
            return;
        }
        e.dataTransfer.setData('text/plain', index.toString());
        e.dataTransfer.effectAllowed = 'move';
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        if (e.dataTransfer) {
            e.dataTransfer.dropEffect = 'move';
        }
    };

    const handleDrop = (e: React.DragEvent, targetIdx: number) => {
        e.preventDefault();

        const sourceIdxStr = e.dataTransfer.getData('text/plain');
        if (!sourceIdxStr) return;

        const sourceIdx = parseInt(sourceIdxStr, 10);
        if (isNaN(sourceIdx) || sourceIdx === targetIdx) return;

        const newSlots = [...slots];
        const tempMealName = newSlots[sourceIdx].mealName;
        newSlots[sourceIdx].mealName = newSlots[targetIdx].mealName;
        newSlots[targetIdx].mealName = tempMealName;

        setSlots(newSlots);
    };

    return (
        <div
            className="grid gap-x-2 gap-y-1.5 h-full w-full items-center"
            style={{
                gridTemplateRows: 'repeat(3, minmax(0, 1fr))',
                gridTemplateColumns: 'repeat(7, minmax(110px, 1fr))'
            }}
        >
            {slots.map((slot, idx) => (
                <div
                    key={slot.id}
                    draggable={!!slot.mealName}
                    onDragStart={(e) => handleDragStart(e, idx)}
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, idx)}
                    className={`h-7 w-full flex items-center justify-center rounded-lg transition-all duration-150 ${slot.mealName
                            ? 'cursor-grab active:cursor-grabbing hover:shadow-xs'
                            : 'bg-transparent'
                        }`}
                >
                    {slot.mealName ? (
                        <div className="w-full h-full flex items-center px-2.5 rounded-lg bg-blue-50/80 border border-blue-300 dark:bg-blue-950/40 dark:border-blue-900/80 text-[11px] font-medium shadow-xs truncate text-left pointer-events-none">
                            <SelectedMealLabel fullName={slot.mealName} />
                        </div>
                    ) : (
                        <div className="w-full h-full rounded-lg border border-dashed border-zinc-200 dark:border-zinc-800 pointer-events-none" />
                    )}
                </div>
            ))}
        </div>
    );
};

export default MealGrid;