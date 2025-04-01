import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import mdx from "@mdx-js/rollup";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import tsconfigpaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd());
    return {
        plugins: [
            TanStackRouterVite({
                target: "react",
                autoCodeSplitting: true,
            }),
            react(),
            tsconfigpaths(),
            mdx(),
        ],
        server: {
            hmr: true,
            proxy: {
                "/api": {
                    target:
                        mode === "production"
                            ? env.VITE_API_URL
                            : "http://localhost:3000",
                    changeOrigin: true,
                    rewrite: (path) => path.replace(/^\/api/, ""),
                },
            },
        },
    };
});
