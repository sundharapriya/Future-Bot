import { createStart } from "@tanstack/react-start";

// Initialize TanStack Start with SSR disabled by default
// Individual routes can override this with ssr: true if needed
export const startInstance = createStart(() => ({
  defaultSsr: false,
}));
