import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
// The codegen now emits to the .tanstack folder on Windows to avoid
// file-lock races with Vite's watcher. The generated file is re-exported
// from there.
import { routeTree } from "../.tanstack/routeTree.gen";

export const getRouter = () => {
  const queryClient = new QueryClient();

  const router = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
  });

  return router;
};
