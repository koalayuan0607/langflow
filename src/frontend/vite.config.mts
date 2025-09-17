import react from "@vitejs/plugin-react-swc";
import { defineConfig, loadEnv } from "vite";
import svgr from "vite-plugin-svgr";

// 兼容低版本浏览器的插件
import legacy from '@vitejs/plugin-legacy'

import tsconfigPaths from "vite-tsconfig-paths";
import {
  API_ROUTES,
  BASENAME,
  PORT,
  PROXY_TARGET,
} from "./src/customization/config-constants";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  const apiRoutes = API_ROUTES || ["^/api/v1/", "/health"];

  const target =
    env.VITE_PROXY_TARGET || PROXY_TARGET || "http://127.0.0.1:7860";

  const port = Number(env.VITE_PORT) || PORT || 3000;

  const proxyTargets = apiRoutes.reduce((proxyObj, route) => {
    proxyObj[route] = {
      target: target,
      changeOrigin: true,
      secure: false,
      ws: true,
    };
    return proxyObj;
  }, {});

  return {
    base: BASENAME || "",
    build: {
      outDir: "build",
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              if (id.includes('lucide-react')) {
                return 'lucide-react' // ~1M
              }
              if (id.includes('ace-builds') || id.includes('react-ace') || id.includes('react-syntax-highlighter')) {
                return 'editor' // ~1.2M
              }
              if (id.includes('ag-grid-community') || id.includes('ag-grid-react')) {
                return 'ag-grid' // ~900kb
              }
              if (id.includes('@babel') || id.includes('core-js')) {
                return 'polyfills'
              }
              return 'vendor' // ~6.3M
            }
            if (id.includes('src/components')) {
              return 'components' // ~3M
            }
          }
        }
      },
      chunkSizeWarningLimit: 1500,
    },
    define: {
      "process.env.BACKEND_URL": JSON.stringify(env.BACKEND_URL || target),
      "process.env.ACCESS_TOKEN_EXPIRE_SECONDS": JSON.stringify(
        env.ACCESS_TOKEN_EXPIRE_SECONDS,
      ),
      "process.env.CI": JSON.stringify(env.CI),
    },
    plugins: [
      react(),
      svgr(),
      tsconfigPaths(),
      legacy({
        targets: ['chrome >= 80', 'safari >= 10.1', 'firefox >= 54', 'edge >= 79'],
        polyfills: true,
        modernPolyfills: true
      }),
    ],
    server: {
      port: port,
      proxy: {
        ...proxyTargets,
      },
    },
  };
});
