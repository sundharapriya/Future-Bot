import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import { nitro } from "nitro/vite";
import tsConfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [
    tanstackStart(),
    nitro({
      preset: process.env.VERCEL ? "vercel" : undefined,
    }),
    react(),
    tailwindcss(),
    tsConfigPaths(),
  ],
  // Prevent Vite from watching the auto-generated route tree file and the
  // temporary router generator output directory. On Windows the generator
  // may write into a tmp dir and then rename into place which can trigger
  // Vite's watcher and cause a file-lock race. Ignoring these avoids that.
  server: {
    port: 3000,
    strictPort: true,
    hmr: false,
    watch: {
      ignored: ["**/src/routeTree.gen.ts", "**/.tanstack/**"],
    },
  },
});
