import React, { useState, useRef, useEffect } from 'react';
import { useMealGrid } from "../../context/MealGridContext";

const DatePicker: React.FC = () => {
    const { startDate, setStartDate } = useMealGrid();
    const [isOpen, setIsOpen] = useState(false);

    // Parse context date into a working Date object safely
    const currentSelectedDate = startDate ? new Date(startDate + 'T00:00:00') : new Date();

    // Track internal calendar view month/year navigation separately from the selected state
    const [viewDate, setViewDate] = useState(new Date(currentSelectedDate));

    const dropdownRef = useRef<HTMLDivElement>(null);

    // Get exact real-time calendar coordinates for "Today"
    const today = new Date();
    const todayDay = today.getDate();
    const todayMonth = today.getMonth();
    const todayYear = today.getFullYear();

    // 1. Combined effect for outside clicks and Escape key presses
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        const handleKeyDown = (event: KeyboardEvent) => {
            // Closes the panel instantly if Escape is pressed while open
            if (event.key === 'Escape') {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
            document.addEventListener('keydown', handleKeyDown);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [isOpen]);

    // Synchronize internal month view if external startDate updates
    useEffect(() => {
        setViewDate(new Date(currentSelectedDate));
    }, [startDate]);

    const formatDisplayDate = (dateStr: string) => {
        if (!dateStr) return "Select Date";
        const dateObj = new Date(dateStr + 'T00:00:00');
        return dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    };

    // Calendar Sheet Calculation Helpers
    const viewYear = viewDate.getFullYear();
    const viewMonth = viewDate.getMonth();
    const monthLabel = viewDate.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });

    const firstDayIndex = new Date(viewYear, viewMonth, 1).getDay();
    const totalDaysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();

    const handleMonthChange = (direction: number) => {
        const nextMonthDate = new Date(viewYear, viewMonth + direction, 1);
        setViewDate(nextMonthDate);
    };

    const formatDateToISO = (date: Date) => {
        const yyyy = date.getFullYear();
        const mm = String(date.getMonth() + 1).padStart(2, '0');
        const dd = String(date.getDate()).padStart(2, '0');
        return `${yyyy}-${mm}-${dd}`;
    };

    const handleDateSelect = (day: number) => {
        const selected = new Date(viewYear, viewMonth, day);
        setStartDate(formatDateToISO(selected));
        setIsOpen(false);
    };

    // Snaps calendar state selection back to current local real-time today
    const handleSnapToToday = (e: React.MouseEvent) => {
        e.stopPropagation(); // Block closing action triggers
        const realToday = new Date();
        setStartDate(formatDateToISO(realToday));
        setViewDate(realToday);
        setIsOpen(false);
    };

    return (
        <div className="flex items-center gap-2.5 relative" ref={dropdownRef}>

            {/* MODAL BACKDROP LAYER: Renders behind picker but above standard page content */}
            {isOpen && (
                <div
                    onClick={() => setIsOpen(false)}
                    className="fixed inset-0 bg-zinc-950/20 dark:bg-zinc-950/50 z-40 backdrop-blur-[1px] animate-in fade-in duration-150"
                />
            )}

            <label className="text-[10px] font-extrabold tracking-wider uppercase text-zinc-400 dark:text-zinc-500 select-none">
                Schedule Start:
            </label>

            {/* Custom Trigger Control Badge - Elevated to z-50 to stay interactive */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                type="button"
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-semibold transition-all shadow-xs active:scale-[0.98] cursor-pointer relative z-50 ${isOpen
                        ? 'border-blue-500 bg-white dark:bg-zinc-950 text-blue-600 dark:text-blue-400 ring-2 ring-blue-500/10'
                        : 'border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-950/40 text-zinc-800 dark:text-zinc-200 hover:border-blue-400 dark:hover:border-blue-900 hover:bg-white dark:hover:bg-zinc-950'
                    }`}
            >
                <svg xmlns="http://w3.org" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-4 h-4 opacity-70">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
                </svg>
                <span>{formatDisplayDate(startDate)}</span>
            </button>

            {/* CUSTOM DROPDOWN CALENDAR PANEL - Elevated to z-50 to stack over backdrop */}
            {isOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 md:left-0 md:translate-x-0 mt-2 w-64 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800/80 rounded-xl shadow-xl p-3 z-50 animate-in fade-in slide-in-from-top-1 duration-100 flex flex-col gap-2">

                    {/* Header Controls */}
                    <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800/60 pb-2">
                        <div className="flex items-center gap-1">
                            <button
                                type="button"
                                onClick={() => handleMonthChange(-1)}
                                className="p-1 rounded-md text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer text-[10px]"
                            >
                                ◀
                            </button>
                            <span className="text-[11px] font-bold tracking-tight text-zinc-800 dark:text-zinc-200 w-16 text-center">
                                {monthLabel}
                            </span>
                            <button
                                type="button"
                                onClick={() => handleMonthChange(1)}
                                className="p-1 rounded-md text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer text-[10px]"
                            >
                                ▶
                            </button>
                        </div>

                        <button
                            type="button"
                            onClick={handleSnapToToday}
                            className="text-[9px] font-extrabold tracking-wider uppercase px-2 py-1 rounded-md bg-zinc-100 hover:bg-blue-50 dark:bg-zinc-800 dark:hover:bg-blue-950/50 text-zinc-500 hover:text-blue-600 dark:text-zinc-400 dark:hover:text-blue-400 transition-colors border border-transparent hover:border-blue-200 dark:hover:border-blue-900 cursor-pointer"
                        >
                            Today
                        </button>
                    </div>

                    {/* Quick Weekday Reference Row Labels */}
                    <div className="grid grid-cols-7 gap-1 text-center font-bold text-zinc-400 dark:text-zinc-600 text-[9px] tracking-wider">
                        {['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA'].map(d => <div key={d}>{d}</div>)}
                    </div>

                    {/* Grid Layout Sheets */}
                    <div className="grid grid-cols-7 gap-1 text-center text-[11px] font-medium">
                        {Array.from({ length: firstDayIndex }).map((_, i) => (
                            <div key={`empty-${i}`} className="w-full aspect-square" />
                        ))}

                        {Array.from({ length: totalDaysInMonth }).map((_, i) => {
                            const day = i + 1;

                            const isCurrentSelected =
                                currentSelectedDate.getDate() === day &&
                                currentSelectedDate.getMonth() === viewMonth &&
                                currentSelectedDate.getFullYear() === viewYear;

                            const isToday =
                                todayDay === day &&
                                todayMonth === viewMonth &&
                                todayYear === viewYear;

                            return (
                                <button
                                    key={`day-${day}`}
                                    type="button"
                                    onClick={() => handleDateSelect(day)}
                                    className={`w-full aspect-square flex items-center justify-center rounded-lg transition-all cursor-pointer select-none font-semibold relative ${isCurrentSelected
                                            ? 'bg-blue-600 text-white font-bold shadow-xs'
                                            : 'text-zinc-700 dark:text-zinc-300 hover:bg-blue-50 dark:hover:bg-blue-950/40 hover:text-blue-600 dark:hover:text-blue-400'
                                        } ${isToday && !isCurrentSelected
                                            ? 'ring-1 ring-blue-500 dark:ring-blue-400 ring-offset-1 dark:ring-offset-zinc-900 font-bold text-blue-600 dark:text-blue-400'
                                            : ''
                                        }`}
                                >
                                    {day}
                                </button>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
};

export default DatePicker;