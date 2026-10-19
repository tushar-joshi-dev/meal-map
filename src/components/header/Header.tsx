import logo from '../../assets/logo.png';
import DatePicker from '../input/DatePicker';

const APP_VERSION = 'v0.2';

const Header = () => {
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
            <div className="flex items-center space-x-6 h-full flex-shrink-0">
                {/* Navigation Menu */}
                {/* <nav className="hidden md:flex items-center space-x-6 text-sm font-medium h-full">
                    <a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors py-1">Home</a>
                </nav> */}

                {/* Vertical Separator */}
                <span className="hidden md:inline-block h-4 w-px bg-zinc-200 dark:bg-zinc-800" />

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
