import React from 'react';
import { getCategoryTheme, type CategoryColorToken } from '../category-box/CategoryColors';

interface SelectedMealLabelProps {
  fullName: string;
  colorToken?: CategoryColorToken; // Accepts the color identification key
}

const SelectedMealLabel: React.FC<SelectedMealLabelProps> = ({ fullName, colorToken }) => {
  let baseName = fullName;
  let subOption = "";

  if (fullName.includes(' (')) {
    const parts = fullName.split(' (');
    baseName = parts[0];
    subOption = parts[1].replace(')', '');
  }

  // Fallback cleanly to standard default blue configuration styles if unknown configurations surface
  const theme = getCategoryTheme(colorToken);

  return (
    <div title={fullName} className="truncate text-left w-full select-none leading-none flex flex-col justify-center">
      {/* Primary item name set to a solid 12px (text-xs) */}
      <span className={`text-xs font-bold tracking-wide ${theme.text} ${theme.darkText} truncate`}>
        {baseName}
      </span>
      {subOption && (
        /* Sub-options matching the 12px layout standard with clear medium visibility weights */
        <span className={`text-xs font-semibold mt-0.5 whitespace-nowrap ${theme.subText} ${theme.darkSubText}`}>
          + {subOption}
        </span>
      )}
    </div>
  );
};

export default SelectedMealLabel;