# GitHub Copilot Project Instructions

## Project Architecture

- This project is a static frontend web application built with Vite, React, and TypeScript.
- All source code is in `stlcc_static_site/src`.
- Reusable UI components and data utilities are in `src/components`.
- Static tournament-related data is in `public/data`.
- Assets (images, etc.) are in `src/assets`.

## Coding Style

- Use 1 tab for indentation
- Always use semicolons.
- Use single quotes for strings.
- Prefer arrow functions for React components.
- Use TypeScript types for all props, state, and function signatures.
- Use ES6+ features where possible.

## Naming Conventions

- React component files: PascalCase (e.g., `PlayerList.tsx`).
- Utility files: camelCase (e.g., `dataParsing.ts`).
- CSS files: kebab-case (e.g., `app.css`).
- Component and type names: PascalCase.
- Variable and function names: camelCase.

## Imports & Assets

- Use relative imports within `src`.
- Place images and static assets in `src/assets`.
- Import CSS files at the top of component files as needed.

## Pull Requests & Branching

- Create feature branches from `main` for new features or fixes.
- Name branches using the following convention (e.g., `feature-name`).
- All code changes should be submitted via pull requests.
- At least one team member should review and approve each PR before merging.

## PR Approval Checklist

### Must Have:

- PR is linked to the issue using "Fixes/Resolves #[PR number], or describes the bug if it's a bug fix
- Description of changes
- A description of how the changes were tested
- If any new packages/libraries were added, ensure they were added to the `package.json` file or similar.

## Nice to Have:

- PR is small and focused on one feature. Easy to review.

## Other Rules

- Do not include any backend or server-side code in this repository.
- Keep README files up to date with setup and deployment instructions.
- Document any non-obvious code with comments.
