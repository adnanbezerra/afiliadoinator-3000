import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

const root = fileURLToPath(new URL(".", import.meta.url));

export default defineConfig({
  resolve: {
    alias: [
      {
        find: "@apps/api-marketplaces",
        replacement: `${root}libs/api-marketplaces/src/index.ts`,
      },
      {
        find: "@apps/api-amazon",
        replacement: `${root}libs/api-amazon/src/index.ts`,
      },
      {
        find: "@apps/api-aliexpress",
        replacement: `${root}libs/api-aliexpress/src/index.ts`,
      },
      {
        find: "@apps/api-mercado-livre",
        replacement: `${root}libs/api-mercado-livre/src/index.ts`,
      },
      { find: /^@\//, replacement: root },
    ],
  },
});
