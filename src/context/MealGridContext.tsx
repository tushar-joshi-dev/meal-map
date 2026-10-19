import React, { createContext, useContext, useState } from 'react';
import type { GridSlot, MealItem } from '../model/meal';
import useLocalStorage from '../hooks/LocalStorage';

interface MealGridContextType {
    slots: GridSlot[];
    setSlots: (newValue: GridSlot[]) => void;
    addMealToGrid: (meal: MealItem) => void;
    startDate: string;
    setStartDate: (date: string) => void;
    clearAllMeals: () => void;
}

export const MAX_MEALS_PER_SLOT = 3;

const MealGridContext = createContext<MealGridContextType | undefined>(undefined);

// Local storage namespacing configuration constants
export const MEAL_GRID_SLOTS_KEY = 'MM_GridSlotsData';
export const MEAL_GRID_DATE_KEY = 'MM_ScheduleStartDate';

// Factory layout utility: Generates the pristine 21-slot framework if storage is clean
const generateDefaultSlots = (): GridSlot[] => {
    const totalCols = 7;
    const totalRows = 3;
    const initialSlots: GridSlot[] = [];
    for (let r = 1; r <= totalRows; r++) {
        for (let c = 1; c <= totalCols; c++) {
            initialSlots.push({ id: `r${r}c${c}`, row: r, col: c, meals: [] });
        }
    }
    return initialSlots;
};

// Calculation helper: Returns the current date formatted cleanly to local YYYY-MM-DD parameters
const getTodayISODate = (): string => {
    const today = new Date();
    const offset = today.getTimezoneOffset();
    const localToday = new Date(today.getTime() - (offset * 60 * 1000));
    return localToday.toISOString().split('T')[0];
};

export const MealGridProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    // 1. Integrates your custom local storage hook to persist the scheduling layout
    const [slots, setSlots] = useLocalStorage<GridSlot[]>(
        MEAL_GRID_SLOTS_KEY,
        generateDefaultSlots(),
        {
            // Data hygiene safeguard fallback map rules
            mergeItemDefaults: (slot) => ({ ...slot, meals: slot.meals || [] })
        }
    );

    // 2. Integrates local storage persistence layer directly for the dynamic calendar tracking inputs
    const [startDate, setStartDate] = useLocalStorage<string>(
        MEAL_GRID_DATE_KEY,
        getTodayISODate()
    );

    // Expose this method so clicking any item drops it into the first vacant slot
    const addMealToGrid = (meal: MealItem) => {
        // Find if this base meal name exists ANYWHERE, regardless of its option variant
        const existingIdx = slots.findIndex(s =>
            s.meals && s.meals.some(slotMeal => slotMeal.name === meal.name)
        );

        // DESELECT ACTION: If it exists, clear it completely out of the layout
        if (existingIdx !== -1) {
            const updatedSlots = slots.map((slot, idx) => {
                if (idx !== existingIdx) return slot;
                return {
                    ...slot,
                    meals: slot.meals.filter(slotMeal => slotMeal.name !== meal.name)
                };
            });
            setSlots(updatedSlots); // Writes updates immediately out to localStorage
            return;
        }

        // SELECT ACTION: Find priority slots (pristine empty spaces first)
        let targetIdx = slots.findIndex(s => !s.meals || s.meals.length === 0);

        // FALLBACK: Find the first available partial slot configuration
        if (targetIdx === -1) {
            targetIdx = slots.findIndex(s => (s.meals?.length || 0) < MAX_MEALS_PER_SLOT);
        }

        if (targetIdx === -1) return; // At maximum grid capacity layout limits

        // Append item to target
        const updatedSlots = slots.map((slot, idx) => {
            if (idx !== targetIdx) return slot;
            return {
                ...slot,
                meals: [...(slot.meals || []), meal]
            };
        });

        setSlots(updatedSlots); // Writes selection parameters straight down to browser storage disk
    };

    const clearAllMeals = () => {
        // Map across slots matrix, cleaning internal configurations down to an empty meals array
        const emptySlots = slots.map(slot => ({
            ...slot,
            meals: []
        }));
        setSlots(emptySlots); // Triggers state updates and updates local storage automatically
    };

    return (
        <MealGridContext.Provider value={{ slots, setSlots, addMealToGrid, startDate, setStartDate, clearAllMeals }}>
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