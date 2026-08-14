import { defineNitroConfig } from "nitro/config";

export default defineNitroConfig({
  preset: process.env.VERCEL ? "vercel-static" : undefined,
  prerender: {
    crawlLinks: true,
    routes: ["/", "/login", "/register", "/setup", "/interview", "/evaluation", "/report"],
  },
});
