import { defineConfig } from 'vitest/config';

const config: ReturnType<typeof defineConfig> = defineConfig({
  test: {
    environment: 'node',
    include: ['test/**/*.spec.ts'],
    benchmark: {
      include: ['test/**/*.bench.ts']
    }
  },
});

export default config;
