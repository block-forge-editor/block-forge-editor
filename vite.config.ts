import svg from "@neodx/svg/vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { loadEnv, defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { configDefaults } from "vitest/config";
// TODO: remove this plugin after the issue is fixed
import fixReactVirtualized from "esbuild-plugin-react-virtualized";

// https://vitejs.dev/config/
const config = defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  return {
    cors: false,
    optimizeDeps: {
      esbuildOptions: {
        plugins: [fixReactVirtualized],
      },
    },
    build: {
      sourcemap: true,
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    server: {
      port: 3001,
      proxy: {
        "/api/web/v2/": {
          target: env.VITE_API_URL,
          changeOrigin: true,
          secure: false,
          configure: (proxy) => {
            proxy.on("proxyRes", (proxyRes, req, res) => {
              const proxyCookie = proxyRes.headers["set-cookie"];

              if (proxyCookie) {
                const tokenCookie = proxyCookie.find((cookieStr) =>
                  cookieStr.startsWith("token="),
                );
                if (tokenCookie) {
                  const cookieParts = tokenCookie
                    .split(";")
                    .map((part) => part.trim());

                  const newCookieParts = cookieParts.map((part) => {
                    if (part.startsWith("domain=")) {
                      return "domain=localhost";
                    }
                    return part;
                  });

                  const serializedCookie = newCookieParts.join("; ");

                  proxyRes.headers["set-cookie"] = [serializedCookie];
                }
              }
            });
          },
        },
      },
    },
    plugins: [
      react({
        babel: { babelrc: true },
      }),
      tsconfigPaths(),
      svg({
        root: "src/shared/ui/assets/icons",
        output: "public/sprites",
        fileName: "{name}.{hash:8}.svg",
        metadata: {
          path: "src/shared/ui/atoms/icon/sprites.generated.ts",
          runtime: {
            size: true,
            viewBox: true,
          },
        },
        group: false,
        resetColors: {
          replaceUnknown: "currentColor",
        },
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
