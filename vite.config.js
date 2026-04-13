/// <reference types="vitest/config" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'node:path';
import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
import { playwright } from '@vitest/browser-playwright';

const dirname = typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url));

// Use local elemental workspace if it exists (dev), otherwise fall back to node_modules (CI)
const localElemental = resolve(dirname, '../elemental');
const elementalPath = fs.existsSync(localElemental)
  ? localElemental
  : resolve(dirname, 'node_modules/@birdeye/elemental');

// @xyflow lives inside elemental's node_modules locally, but is hoisted in CI
const localXyflow = resolve(localElemental, 'node_modules/@xyflow/react');
const xyflowReactPath = fs.existsSync(localXyflow)
  ? localXyflow
  : resolve(dirname, 'node_modules/@xyflow/react');

const localXyflowSystem = resolve(localElemental, 'node_modules/@xyflow/system');
const xyflowSystemPath = fs.existsSync(localXyflowSystem)
  ? localXyflowSystem
  : resolve(dirname, 'node_modules/@xyflow/system');

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@birdeye/elemental': elementalPath,
      '@xyflow/react': xyflowReactPath,
      '@xyflow/system': xyflowSystemPath,
      react: resolve(dirname, 'node_modules/react'),
      'react-dom': resolve(dirname, 'node_modules/react-dom'),
    },
  },
  test: {
    projects: [{
      extends: true,
      plugins: [
        storybookTest({
          configDir: path.join(dirname, '.storybook')
        })
      ],
      test: {
        name: 'storybook',
        browser: {
          enabled: true,
          headless: true,
          provider: playwright({}),
          instances: [{ browser: 'chromium' }]
        }
      }
    }]
  }
});
