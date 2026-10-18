import React from 'react';

interface SelectedMealLabelProps {
  fullName: string;
}

const SelectedMealLabel: React.FC<SelectedMealLabelProps> = ({ fullName }) => {
  // Extract base meal name and sub-option safely (e.g. "Thai Curry (Jasmine Rice)")
  let baseName = fullName;
  let subOption = "";

  if (fullName.includes(' (')) {
    const parts = fullName.split(' (');
    baseName = parts[0];
    subOption = parts[1].replace(')', '');
  }

  return (
    <div title={fullName} className="truncate text-left w-full select-none">
      <span className="font-semibold text-blue-700 dark:text-blue-300">
        {baseName}
      </span>
      {subOption && (
        <span className="text-blue-600/80 dark:text-blue-400/80 font-medium ml-1.5 whitespace-nowrap">
          + {subOption}
        </span>
      )}
    </div>
  );
};

export default SelectedMealLabel;