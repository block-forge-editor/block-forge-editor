export const SCREEN_WIDTHS = {
  xs: "300px",
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px",
};

export const BREAKPOINTS = {
  sm: `(min-width: ${SCREEN_WIDTHS.sm})`,
  md: `(min-width: ${SCREEN_WIDTHS.md})`,
  lg: `(min-width: ${SCREEN_WIDTHS.lg})`,
  xl: `(min-width: ${SCREEN_WIDTHS.xl})`,
  "2xl": `(min-width: ${SCREEN_WIDTHS["2xl"]})`,
};
