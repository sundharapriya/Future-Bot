import { defineNitroConfig } from "nitro/config";

export default defineNitroConfig({
  preset: process.env.VERCEL ? "vercel" : undefined,
  vercel: {
    entryFormat: "node",
    functions: {
      runtime: "nodejs22.x",
    },
  },
});
