import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { configDefaults } from "vitest/config";
import dts from "vite-plugin-dts";

// https://vitejs.dev/config/
const config = defineConfig(() => {
  return {
    cors: false,
    build: {
      sourcemap: true,
      cssCodeSplit: false,
      lib: {
        entry: path.resolve(__dirname, "src/index.ts"),
        name: "BlockForge",
        fileName: (format) => `index.${format === "es" ? "mjs" : "js"}`,
        formats: ["es", "cjs"],
      },
      rollupOptions: {
        external: [
          "react",
          "react-dom",
          "react/jsx-runtime",
          "react-dom/client",
          "react-dom/server",
        ],
        output: {
          globals: {
            react: "React",
            "react-dom": "ReactDOM",
          },
          assetFileNames: (assetInfo) => {
            if (assetInfo.name === "style.css") return "index.css";
            return assetInfo.name || "unknown";
          },
        },
      },
      minify: true,
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    server: {
      port: 3001,
    },
    plugins: [
      react({
        babel: { babelrc: true },
      }),
      tsconfigPaths(),
      dts({
        include: ["src/**/*"],
        exclude: ["src/**/*.test.ts", "src/**/*.test.tsx"],
      }),
    ],
    test: {
      globals: true,
      environment: "jsdom",
      exclude: [...configDefaults.exclude, "e2e/*"],
      coverage: {
        ignoreEmptyLines: true,
        reporter: ["text", "html"],
      },
    },
  };
});

export default config;
