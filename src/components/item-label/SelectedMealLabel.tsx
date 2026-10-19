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
    <div title={fullName} className="truncate text-left w-full select-none">
      <span className={`font-semibold ${theme.text} ${theme.darkText}`}>
        {baseName}
      </span>
      {subOption && (
        <span className={`font-medium ml-1.5 whitespace-nowrap ${theme.subText} ${theme.darkSubText}`}>
          + {subOption}
        </span>
      )}
    </div>
  );
};

export default SelectedMealLabel;