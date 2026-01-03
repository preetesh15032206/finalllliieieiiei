import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    // Run Node-based integration tests under the top-level `tests/` folder
    include: ['tests/**/*.test.{ts,js,mjs,cjs}'],
    environment: 'node',
    // make failures noisy during CI runs
    threads: false,
  },
});
