

import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type { import('@storybook/react-vite').StorybookConfig } */
const config = {
  stories: [
    "../src/**/*.mdx",
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  addons: [
    "@chromatic-com/storybook",
    "@storybook/addon-vitest",
    "@storybook/addon-a11y",
    "@storybook/addon-docs",
    "@storybook/addon-onboarding"
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {}
  },
  typescript: {
    reactDocgen: false,
  },
  async viteFinal(config) {
    config.resolve = config.resolve ?? {};
    config.resolve.alias = {
      ...(config.resolve.alias ?? {}),
      '@birdeye/elemental': path.resolve(dirname, '../../elemental'),
      '@xyflow/react': path.resolve(dirname, '../../elemental/node_modules/@xyflow/react'),
      '@xyflow/system': path.resolve(dirname, '../../elemental/node_modules/@xyflow/system'),
    };
    return config;
  },
};
export default config;