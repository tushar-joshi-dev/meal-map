export type CategoryColorToken = 'yellow' | 'emerald' | 'orange' | 'indigo' | 'purple' | 'rose' | 'cyan' | 'fuchsia';

export const CATEGORY_COLORS: Record<CategoryColorToken, {
    circle: string; bg: string; border: string; text: string; subText: string;
    hoverBorder: string; darkBg: string; darkBorder: string; darkText: string;
    darkSubText: string; darkHoverBorder: string;
    headerBg: string; // Updated to highly visible, rich same-hue gradients
}> = {
    yellow: {
        circle: 'bg-yellow-400 dark:bg-yellow-500',
        bg: 'bg-yellow-50/70', border: 'border-yellow-200', text: 'text-yellow-800', subText: 'text-yellow-700/80', hoverBorder: 'hover:border-yellow-300',
        darkBg: 'dark:bg-yellow-950/20', darkBorder: 'dark:border-yellow-900/40', darkText: 'dark:text-yellow-300', darkSubText: 'dark:text-yellow-400/80', darkHoverBorder: 'dark:hover:border-yellow-800',
        headerBg: 'bg-gradient-to-r from-yellow-200/80 via-yellow-100/40 to-transparent dark:from-yellow-900/50 dark:via-yellow-950/20 dark:to-transparent'
    },
    emerald: {
        circle: 'bg-emerald-500',
        bg: 'bg-emerald-50/70', border: 'border-emerald-200', text: 'text-emerald-800', subText: 'text-emerald-700/80', hoverBorder: 'hover:border-emerald-300',
        darkBg: 'dark:bg-emerald-950/20', darkBorder: 'dark:border-emerald-900/40', darkText: 'dark:text-emerald-300', darkSubText: 'dark:text-emerald-400/80', darkHoverBorder: 'dark:hover:border-emerald-800',
        headerBg: 'bg-gradient-to-r from-emerald-200/70 via-emerald-100/30 to-transparent dark:from-emerald-900/40 dark:via-emerald-950/20 dark:to-transparent'
    },
    orange: {
        circle: 'bg-orange-500',
        bg: 'bg-orange-50/70', border: 'border-orange-200', text: 'text-orange-800', subText: 'text-orange-700/80', hoverBorder: 'hover:border-orange-300',
        darkBg: 'dark:bg-orange-950/20', darkBorder: 'dark:border-orange-900/40', darkText: 'dark:text-orange-300', darkSubText: 'dark:text-orange-400/80', darkHoverBorder: 'dark:hover:border-orange-800',
        headerBg: 'bg-gradient-to-r from-orange-200/70 via-orange-100/30 to-transparent dark:from-orange-900/40 dark:via-orange-950/20 dark:to-transparent'
    },
    indigo: {
        circle: 'bg-indigo-500',
        bg: 'bg-indigo-50/70', border: 'border-indigo-200', text: 'text-indigo-800', subText: 'text-indigo-700/80', hoverBorder: 'hover:border-indigo-300',
        darkBg: 'dark:bg-indigo-950/20', darkBorder: 'dark:border-indigo-900/40', darkText: 'dark:text-indigo-300', darkSubText: 'dark:text-indigo-400/80', darkHoverBorder: 'dark:hover:border-indigo-800',
        headerBg: 'bg-gradient-to-r from-indigo-200/70 via-indigo-100/30 to-transparent dark:from-indigo-900/40 dark:via-indigo-950/20 dark:to-transparent'
    },
    purple: {
        circle: 'bg-purple-500',
        bg: 'bg-purple-50/70', border: 'border-purple-200', text: 'text-purple-800', subText: 'text-purple-700/80', hoverBorder: 'hover:border-purple-300',
        darkBg: 'dark:bg-purple-950/20', darkBorder: 'dark:border-purple-900/40', darkText: 'dark:text-purple-300', darkSubText: 'dark:text-purple-400/80', darkHoverBorder: 'dark:hover:border-purple-800',
        headerBg: 'bg-gradient-to-r from-purple-200/70 via-purple-100/30 to-transparent dark:from-purple-900/40 dark:via-purple-950/20 dark:to-transparent'
    },
    rose: {
        circle: 'bg-rose-500',
        bg: 'bg-rose-50/70', border: 'border-rose-200', text: 'text-rose-800', subText: 'text-rose-700/80', hoverBorder: 'hover:border-rose-300',
        darkBg: 'dark:bg-rose-950/20', darkBorder: 'dark:border-rose-900/40', darkText: 'dark:text-rose-300', darkSubText: 'dark:text-rose-400/80', darkHoverBorder: 'dark:hover:border-rose-800',
        headerBg: 'bg-gradient-to-r from-rose-200/70 via-rose-100/30 to-transparent dark:from-rose-900/40 dark:via-rose-950/20 dark:to-transparent'
    },
    cyan: {
        circle: 'bg-cyan-500',
        bg: 'bg-cyan-50/70', border: 'border-cyan-200', text: 'text-cyan-800', subText: 'text-cyan-700/80', hoverBorder: 'hover:border-cyan-300',
        darkBg: 'dark:bg-cyan-950/20', darkBorder: 'dark:border-cyan-900/40', darkText: 'dark:text-cyan-300', darkSubText: 'dark:text-cyan-400/80', darkHoverBorder: 'dark:hover:border-cyan-800',
        headerBg: 'bg-gradient-to-r from-cyan-200/70 via-cyan-100/30 to-transparent dark:from-cyan-900/40 dark:via-cyan-950/20 dark:to-transparent'
    },
    fuchsia: {
        circle: 'bg-fuchsia-500',
        bg: 'bg-fuchsia-50/70', border: 'border-fuchsia-200', text: 'text-fuchsia-800', subText: 'text-fuchsia-700/80', hoverBorder: 'hover:border-fuchsia-300',
        darkBg: 'dark:bg-fuchsia-950/20', darkBorder: 'dark:border-fuchsia-900/40', darkText: 'dark:text-fuchsia-300', darkSubText: 'dark:text-fuchsia-400/80', darkHoverBorder: 'dark:hover:border-fuchsia-800',
        headerBg: 'bg-gradient-to-r from-fuchsia-200/70 via-fuchsia-100/30 to-transparent dark:from-fuchsia-900/40 dark:via-fuchsia-950/20 dark:to-transparent'
    }
};

// Safe access utility that handles type conversions cleanly
export const getCategoryTheme = (token?: string | null) => {
    if (token && token in CATEGORY_COLORS) {
        return CATEGORY_COLORS[token as CategoryColorToken];
    }
    return CATEGORY_COLORS.indigo; // Valid default type token fallback replacement for 'blue'
};