# Implementation Plan

- [x] 1. Refactor `Header.tsx` to include TaskFlow brand logo mark and word-mark linking to `/`
  - Add `aria-label="TaskFlow Home"` for accessibility
  - Use `hidden sm:block` to hide word-mark on small screens
  - _Requirements: 1.1, 1.3_

- [x] 2. Remove redundant TaskFlow header block from `HomePage.tsx`
  - Delete duplicate logo and heading markup
  - _Requirements: 2.1_

- [x] 3. Clean up unused imports and variables introduced by the refactor
  - Run `pnpm lint --fix` to resolve warnings
  - _Requirements: 3.1, 3.2_

- [x] 4. Run type-checking to ensure zero errors
  - Execute `pnpm type-check`
  - _Requirements: 3.2_


