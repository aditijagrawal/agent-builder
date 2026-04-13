import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';

const dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(dirname, '..');

// Use local elemental workspace if it exists (dev), otherwise fall back to node_modules (CI)
const localElemental = path.resolve(dirname, '../../elemental');
const elementalPath = fs.existsSync(localElemental)
  ? localElemental
  : path.resolve(root, 'node_modules/@birdeye/elemental');

const localXyflowReact = path.resolve(localElemental, 'node_modules/@xyflow/react');
const xyflowReactPath = fs.existsSync(localXyflowReact)
  ? localXyflowReact
  : path.resolve(root, 'node_modules/@xyflow/react');

const localXyflowSystem = path.resolve(localElemental, 'node_modules/@xyflow/system');
const xyflowSystemPath = fs.existsSync(localXyflowSystem)
  ? localXyflowSystem
  : path.resolve(root, 'node_modules/@xyflow/system');

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
      '@birdeye/elemental': elementalPath,
      '@xyflow/react': xyflowReactPath,
      '@xyflow/system': xyflowSystemPath,
    };
    return config;
  },
};
export default config;
