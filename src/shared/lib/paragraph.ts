export enum EColors {
  DEFAULT = "transparent",
  BLUE = "blue",
  YELLOW = "yellow",
}

export const getBackgroundColorClass = (color: string): string => {
  switch (color) {
    case EColors.BLUE:
      return "bg-blue-500/30 p-2 rounded-lg";
    case EColors.YELLOW:
      return "bg-yellow-500/30 p-2 rounded-lg";
    default:
      return "";
  }
};

// TODO: tailwind can't handle dynamic font-size
export const getFontSizeClass = ({
  level,
  fontSize,
}: {
  level?: number;
  fontSize?: number;
}) => {
  if (fontSize) {
    return `font-size: ${fontSize}px; margin-bottom: 0.5rem;`;
  }

  switch (level) {
    case 1:
      return "font-size: 2.25rem; font-weight: 600; margin-bottom: 0.5rem;";
    case 2:
      return "font-size: 1.875rem; font-weight: 600; margin-bottom: 0.5rem;";
    case 3:
      return "font-size: 1.5rem; font-weight: 600; margin-bottom: 0.5rem;";
    case 4:
      return "font-size: 1.25rem; font-weight: 600; margin-bottom: 0.5rem;";
    case 5:
      return "font-size: 1.125rem; font-weight: 600; margin-bottom: 0.5rem;";
    case 6:
      return "font-size: 1rem; font-weight: 600; margin-bottom: 0.5rem;";
    default:
      return "";
  }
};
