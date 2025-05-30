import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export enum EColors {
  DEFAULT = "transparent",
  BLUE = "blue",
  YELLOW = "yellow",
  RED = "red",
  GREEN = "green",
  PURPLE = "purple",
  PINK = "pink",
  ORANGE = "orange",
  TEAL = "teal",
  INDIGO = "indigo",
  GRAY = "gray",
  BLACK = "black",
  WHITE = "white",
}

export const getFontSizeClassTSX = ({
  level,
  fontSize,
}: {
  level?: number;
  fontSize?: number;
}): React.CSSProperties => {
  if (fontSize) {
    return {
      fontSize: `${fontSize}px`,
    };
  }

  switch (level) {
    case 1:
      return {
        fontSize: "2.25rem",
        fontWeight: 600,
      };
    case 2:
      return {
        fontSize: "1.875rem",
        fontWeight: 600,
      };
    case 3:
      return {
        fontSize: "1.5rem",
        fontWeight: 600,
      };
    case 4:
      return {
        fontSize: "1.25rem",
        fontWeight: 600,
      };
    case 5:
      return {
        fontSize: "1.125rem",
        fontWeight: 600,
      };
    case 6:
      return {
        fontSize: "1rem",
        fontWeight: 600,
      };
    default:
      return {};
  }
};
