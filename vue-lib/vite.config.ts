import path from "path";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import tailwind from "tailwindcss";
import autoprefixer from "autoprefixer";
import { peerDependencies, dependencies } from "./package.json";
import dts from "vite-plugin-dts";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: ["./src/index.ts"],
      name: "vue-lib",
      formats: ["es", "cjs"],
    },
    rollupOptions: {
      external: [
        ...Object.keys(peerDependencies),
        ...Object.keys(dependencies),
      ],
      output: {
        preserveModules: true,
        preserveModulesRoot: "src",
        exports: "named",
      },
    },
    sourcemap: true,
    emptyOutDir: true,
    chunkSizeWarningLimit: 500,
  },
  css: {
    postcss: {
      plugins: [tailwind(), autoprefixer()],
    },
  },
  plugins: [
    vue(),
    dts({
      include: ["src/**/*"],
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
