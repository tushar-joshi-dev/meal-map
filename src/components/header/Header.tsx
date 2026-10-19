import logo from '../../assets/logo.png';
import { useMealGrid } from '../../context/MealGridContext';
import DatePicker from '../input/DatePicker';

const APP_VERSION = 'v0.2';

const Header = () => {
    const { clearAllMeals } = useMealGrid();

    const handleResetClick = () => {
        const confirmed = window.confirm(
            "Are you sure you want to clear your meal plan? This action cannot be undone."
        );
        if (confirmed) {
            clearAllMeals();
        }
    };

    return (
        <header className="fixed top-0 left-0 right-0 h-12 w-full z-50 flex items-center justify-between px-6 border-b bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 transition-colors duration-200">
            
            {/* LEFT CONTAINER: Logo & Brand */}
            <div className="flex items-center space-x-2 flex-shrink-0 h-full">
                <img
                    src={logo}
                    alt="MealMap Logo"
                    style={{ height: '20px', width: 'auto' }}
                    className="object-contain block flex-shrink-0"
                />
                <span className="text-base font-bold tracking-tight hidden sm:inline-block leading-none">
                    MealMap
                </span>
            </div>
            
            {/* MIDDLE CONTAINER: Render the modular component dynamically */}
            <div className="flex items-center h-full">
                <DatePicker />
            </div>

            {/* RIGHT CONTAINER: Combined Nav & Actions */}
            <div className="flex items-center space-x-4 h-full flex-shrink-0">
                {/* 
                  PREMIUM CUSTOM RESET BUTTON:
                  - Features an elegant trash icon.
                  - Unlocks smooth active compression scales (active:scale-[0.97]).
                  - Styled with theme-compliant hover transformations.
                */}
                <button
                    type="button"
                    onClick={handleResetClick}
                    className="flex items-center gap-1.5 text-xs font-bold tracking-wide uppercase px-2.5 py-1.5 rounded-lg text-zinc-500 dark:text-zinc-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-all border border-transparent hover:border-rose-200 dark:hover:border-rose-900/50 cursor-pointer active:scale-[0.97]"
                >
                    {/* Premium Sleek Trash Can SVG Icon */}
                    <svg 
                        xmlns="http://w3.org" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        strokeWidth={2.0} 
                        stroke="currentColor" 
                        className="w-3.5 h-3.5"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                    </svg>
                    <span>Reset Plan</span>
                </button>

                {/* Vertical Separator */}
                <span className="h-4 w-px bg-zinc-200 dark:bg-zinc-800" />

                {/* Status Section */}
                <div className="flex items-center h-full">
                    <span className="text-xs px-2.5 py-0.5 rounded-full font-medium bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200 whitespace-nowrap">
                        {APP_VERSION}
                    </span>
                </div>
            </div>

        </header>
    );
};

export default Header;
