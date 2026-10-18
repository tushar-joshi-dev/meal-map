import MealGrid from "../meal-grid/MealGrid";

const Footer = () => {
    const handleClipboardCopy = () => {
        alert("Copying menu build details to clipboard!");
    };

    return (
        <footer className="fixed bottom-0 inset-x-0 h-[140px] z-50 flex bg-zinc-50 dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800 transition-colors duration-200">

            {/* LEFT CONTAINER: Houses the tighter meal grid row layout */}
            <div className="flex-1 p-3 overflow-x-auto flex items-center">
                <MealGrid />
            </div>

            {/* RIGHT ACTION: A floating, rounded square button detached from the edges */}
            <div className="h-full flex items-center px-4 flex-shrink-0">
                <button
                    onClick={handleClipboardCopy}
                    // 1. "cursor-pointer" forces the pointer hand icon to show on hover
                    // 2. "hover:bg-transparent" guarantees it won't trigger an accidental fallback grey color
                    className="w-[108px] h-[108px] cursor-pointer flex flex-col items-center justify-center gap-1.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-transparent hover:bg-transparent text-zinc-700 dark:text-zinc-300 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-300 dark:hover:border-blue-800 transition-all group font-semibold active:scale-[0.96]"
                >
                    <svg
                        xmlns="http://w3.org"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.8}
                        stroke="currentColor"
                        className="w-5 h-5 text-zinc-400 group-hover:text-blue-500 transition-colors"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c1.005.492 1.7 1.517 1.7 2.713v11.75a2.25 2.25 0 0 1-2.25 2.25h-7.5a2.25 2.25 0 0 1-2.25-2.25V6.6c0-1.196.695-2.22 1.7-2.713M15.666 3.888V18.75A2.25 2.25 0 0 1 13.5 21h-3a2.25 2.25 0 0 1-2.25-2.25V3.888" />
                    </svg>
                    <span className="text-[10px] font-bold tracking-wider uppercase">
                        Copy Menu
                    </span>
                </button>
            </div>

        </footer>
    );
};

export default Footer;