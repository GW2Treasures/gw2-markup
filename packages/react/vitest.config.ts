import { defineConfig } from 'vitest/config';

const config: ReturnType<typeof defineConfig> = defineConfig({
  test: {
    environment: 'node',
    include: ['test/**/*.spec.ts']
  }
});

export default config;
