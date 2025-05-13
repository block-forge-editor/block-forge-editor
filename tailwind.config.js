const plugin = require("tailwindcss/plugin");
const { SCREEN_WIDTHS } = require("./src/shared/lib/constants/breakpoints.ts");

/** @type {import('tailwindcss').Config} */
module.exports = {
  prefix: "",
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  plugins: [
    require("tailwindcss-animate"),
    plugin(({ theme, addBase }) => {
      addBase({
        // or whichever color you'd like
        html: { color: theme("colors.neutral.800") },
      });
    }),
  ],
  theme: {
    container: {
      center: true,
      padding: "1rem",
    },
    borderRadius: {
      lg: "var(--radius)",
      md: "calc(var(--radius) - 2px)",
      sm: "calc(var(--radius) - 4px)",
    },
    screens: {
      xs: SCREEN_WIDTHS.xs,
      sm: SCREEN_WIDTHS.sm,
      md: SCREEN_WIDTHS.md,
      lg: SCREEN_WIDTHS.lg,
      xl: SCREEN_WIDTHS.xl,
      "2xl": SCREEN_WIDTHS["2xl"],
    },
    extend: {
      "accordion-up": {
        to: {
          height: "0",
        },
        from: {
          height: "var(--radix-accordion-content-height)",
        },
      },
      "accordion-down": {
        from: {
          height: "0",
        },
        to: {
          height: "var(--radix-accordion-content-height)",
        },
      },
      animation: {
        "accordion-up": "accordion-up 0.2s ease-out",
        "accordion-down": "accordion-down 0.2s ease-out",
        "caret-blink": "caret-blink 1.25s ease-out infinite",
      },
      keyframes: {
        "0%,70%,100%": {
          opacity: "1",
        },
        "caret-blink": {
          "20%,50%": { opacity: "0" },
          "0%,70%,100%": { opacity: "1" },
        },
      },
      colors: {
        brand: "#FFFF",
        ring: "hsl(var(--ring))",
        input: "hsl(var(--input))",
        border: "hsl(var(--border))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        chart: {
          1: "hsl(var(--chart-1))",
          2: "hsl(var(--chart-2))",
          3: "hsl(var(--chart-3))",
          4: "hsl(var(--chart-4))",
          5: "hsl(var(--chart-5))",
        },
      },
    },
  },
};
