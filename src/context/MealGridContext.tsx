import React, { createContext, useContext, useState } from 'react';
import type { GridSlot } from '../model/meal';

interface MealGridContextType {
    slots: GridSlot[];
    setSlots: React.Dispatch<React.SetStateAction<GridSlot[]>>;
    addMealToGrid: (mealName: string) => void;
}

const MealGridContext = createContext<MealGridContextType | undefined>(undefined);

export const MealGridProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const totalCols = 7;
    const totalRows = 3;

    // Initialize your 21 empty slot grid array layout state
    const [slots, setSlots] = useState<GridSlot[]>(() => {
        const initialSlots: GridSlot[] = [];
        for (let r = 1; r <= totalRows; r++) {
            for (let c = 1; c <= totalCols; c++) {
                initialSlots.push({ id: `r${r}c${c}`, row: r, col: c, mealName: null });
            }
        }
        return initialSlots;
    });

    // Expose this method so clicking any item drops it into the first vacant slot
    const addMealToGrid = (mealName: string) => {
        setSlots((prevSlots) => {
            // 1. Extract the base name in case it has a sub-option (e.g., "Thai Green Curry (Jasmine Rice)")
            const hasParenthesis = mealName.includes(' (');
            const baseName = hasParenthesis ? mealName.split(' (')[0] : mealName;

            // 2. Check if this meal (or any sub-option variant of it) is already present in the grid
            const existingIdx = prevSlots.findIndex(s =>
                s.mealName === mealName || (s.mealName && s.mealName.startsWith(`${baseName} (`))
            );

            const newSlots = [...prevSlots];

            // 3. DESELECT ACTION: If it exists, wipe out the text data to empty the slot
            if (existingIdx !== -1) {
                newSlots[existingIdx] = { ...newSlots[existingIdx], mealName: null };
                return newSlots;
            }

            // 4. SELECT ACTION: If it doesn't exist, locate the first vacant cell slot
            const targetIdx = prevSlots.findIndex(s => s.mealName === null);
            if (targetIdx === -1) return prevSlots; // Grid is full!

            newSlots[targetIdx] = { ...newSlots[targetIdx], mealName };
            return newSlots;
        });
    };

    return (
        <MealGridContext.Provider value={{ slots, setSlots, addMealToGrid }}>
            {children}
        </MealGridContext.Provider>
    );
};

// Custom hook so any file can instantly pull data or run methods
export const useMealGrid = () => {
    const context = useContext(MealGridContext);
    if (!context) throw new Error('useMealGrid must be used within a MealGridProvider');
    return context;
};