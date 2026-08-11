import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import tsConfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [
    // TanStack Start must come first — it wraps the dev server and handles SSR.
    tanstackStart({
      // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
      server: { entry: "server" },
    }),
    // File-based routing code-gen. Must come before react(). Disable
    // automatic HMR injection and code-splitting to avoid duplicate-declaration
    // issues on Windows.
    TanStackRouterVite({ autoCodeSplitting: false, addHmr: false }),
    react(),
    tailwindcss(),
    tsConfigPaths(),
  ],
  // Prevent Vite from watching the auto-generated route tree file and the
  // temporary router generator output directory. On Windows the generator
  // may write into a tmp dir and then rename into place which can trigger
  // Vite's watcher and cause a file-lock race. Ignoring these avoids that.
  // Also disable HMR to prevent duplicate declarations with TanStack Router.
  server: {
    hmr: false,
    watch: {
      ignored: ["**/src/routeTree.gen.ts", "**/.tanstack/**"],
    },
  },
});
