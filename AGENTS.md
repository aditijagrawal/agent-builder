# AGENTS.md

## Purpose

This file provides default guidance for AI coding agents working in this repository.

## Project Snapshot

- Stack: React 18 + Vite (`type: module`)
- UI workflow: Storybook 10
- Language style in `src/`: JavaScript/JSX + CSS
- Package manager: npm

## Common Commands

- Install deps: `npm install`
- Start app: `npm run dev`
- Build app: `npm run build`
- Lint: `npm run lint`
- Start Storybook: `npm run storybook`
- Build Storybook: `npm run build-storybook`

## Working Rules

- Make focused, minimal changes that match existing patterns.
- Prefer editing existing files over adding new abstractions.
- Keep component changes local: update JSX, CSS, and stories together when relevant.
- Do not introduce TypeScript-only patterns in JS/JSX files unless requested.
- Preserve existing class naming and styling approach in component CSS files.
- Avoid broad dependency changes unless explicitly needed for the task.

## Validation Before Handoff

- Run `npm run lint` for substantive code changes.
- If UI behavior changes, verify in Storybook (`npm run storybook`) when feasible.
- Note any checks you could not run, and why.

## Git Hygiene

- Do not revert unrelated local changes.
- Keep commits scoped to the user request.
- Avoid destructive git operations unless explicitly requested.
