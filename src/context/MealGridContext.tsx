import React, { createContext, useContext, useState } from 'react';
import type { GridSlot, MealItem } from '../model/meal';

interface MealGridContextType {
    slots: GridSlot[];
    setSlots: React.Dispatch<React.SetStateAction<GridSlot[]>>;
    addMealToGrid: (meal: MealItem) => void;
    startDate: string;
    setStartDate: (date: string) => void;
}

export const MAX_MEALS_PER_SLOT = 3;

const MealGridContext = createContext<MealGridContextType | undefined>(undefined);

export const MealGridProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const totalCols = 7;
    const totalRows = 3;

    // Default initialization string to local current calendar standard: e.g., "2026-10-19"
    const [startDate, setStartDate] = useState<string>(() => {
        const today = new Date();
        const offset = today.getTimezoneOffset();
        const localToday = new Date(today.getTime() - (offset * 60 * 1000));
        return localToday.toISOString().split('T')[0];
    });

    // Initialize your 21 empty slot grid array layout state
    const [slots, setSlots] = useState<GridSlot[]>(() => {
        const initialSlots: GridSlot[] = [];
        for (let r = 1; r <= totalRows; r++) {
            for (let c = 1; c <= totalCols; c++) {
                initialSlots.push({ id: `r${r}c${c}`, row: r, col: c, meals: [] });
            }
        }
        return initialSlots;
    });

    // Expose this method so clicking any item drops it into the first vacant slot
    const addMealToGrid = (meal: MealItem) => {
        setSlots((prevSlots) => {
            const MAX_MEALS_PER_SLOT = 3;

            // RULE 2: Find if this base meal name exists ANYWHERE, regardless of its option variant
            const existingIdx = prevSlots.findIndex(s =>
                s.meals && s.meals.some(slotMeal => slotMeal.name === meal.name)
            );

            // DESELECT ACTION: If it exists, clear it completely out of the layout
            if (existingIdx !== -1) {
                return prevSlots.map((slot, idx) => {
                    if (idx !== existingIdx) return slot;
                    return {
                        ...slot,
                        // Filter out by base name so old variants are completely purged
                        meals: slot.meals.filter(slotMeal => slotMeal.name !== meal.name)
                    };
                });
            }

            // SELECT ACTION: Find priority slots (pristine empty spaces first)
            let targetIdx = prevSlots.findIndex(s => !s.meals || s.meals.length === 0);

            // FALLBACK: Find the first available partial slot configuration
            if (targetIdx === -1) {
                targetIdx = prevSlots.findIndex(s => (s.meals?.length || 0) < MAX_MEALS_PER_SLOT);
            }

            if (targetIdx === -1) return prevSlots; // At capacity

            // Append item to target
            return prevSlots.map((slot, idx) => {
                if (idx !== targetIdx) return slot;
                return {
                    ...slot,
                    meals: [...(slot.meals || []), meal]
                };
            });
        });
    };

    return (
        <MealGridContext.Provider value={{ slots, setSlots, addMealToGrid, startDate, setStartDate }}>
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