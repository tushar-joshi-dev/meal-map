import { useState } from "react";

// 1. Defined options configuration matching your signature parameters exactly
interface LocalStorageOptions {
    // If data is an array, this function maps over every entry to ensure shape validation
    mergeItemDefaults?: (item: any) => any;
}

// 2. Declare the hook as a generic function (<T>) so it can accept strings, arrays, or objects dynamically
const useLocalStorage = <T>(
    key: string,
    defaultValue: T,
    options?: LocalStorageOptions
): [T, (newValue: T) => void] => {
    
    // Internal initialiser function to read from disk or apply fallbacks cleanly
    const [localValue, setLocalValue] = useState<T>(() => {
        const setDefault = (k: string, v: T): T => {
            localStorage.setItem(k, JSON.stringify(v));
            return v;
        };
        
        try {
            const value = localStorage.getItem(key);
            if (value) {
                let parsed = JSON.parse(value);
                
                // If data hygiene options exist and the data is an array, apply defaults inline
                if (options?.mergeItemDefaults && Array.isArray(parsed)) {
                    parsed = parsed.map(options.mergeItemDefaults);
                }
                
                return parsed as T;
            } else {
                return setDefault(key, defaultValue);
            }
        } catch (e) {
            console.warn(`Failed to parse localStorage key "${key}", falling back to defaults.`, e);
            return setDefault(key, defaultValue);
        }
    });

    // Intercepts component state updates, dumps it to storage disk, and updates the view reactively
    const setLocalStorageValue = (newValue: T) => {
        try {
            localStorage.setItem(key, JSON.stringify(newValue));
            setLocalValue(newValue);
        } catch (e) {
            console.error(`Failed to write key "${key}" out to browser local storage standard:`, e);
        }
    };

    return [localValue, setLocalStorageValue];
};

export default useLocalStorage;