# TaskFlow Navbar Branding – Design Document

## 1. Overview
The purpose of this document is to describe the technical design for moving the **TaskFlow** branding from the main HomePage content area into the global **Navbar Header**.  The change improves brand visibility, frees vertical space on the HomePage, and aligns the application with modern navigation patterns.

The branding consists of a compact **logo mark** (square with the letter **T**) and an adjacent **word-mark** ("TaskFlow").  The mark links to the root route (`"/"`).

## 2. Affected Components & Files
| Component/File | Responsibility |
| -------------- | -------------- |
| `src/components/layout/Header.tsx` | Render the top-level navigation bar and brand elements. |
| `src/pages/HomePage.tsx` | Home view – redundant in-page header removed. |
| Tailwind CSS config | Provides design-system colors (`primary`, `background`, `border`). |

No new components are introduced; existing `Header` is refactored.

## 3. Component Structure
```
Header
 └── BrandLink (a <Link> element)
      ├── LogoMark  (div.h-8.w-8.rounded-lg.bg-primary)
      └── WordMark  (span.hidden.sm:block.font-bold)
```

* **LogoMark**: 32×32 px square with background `bg-primary`; centered **T** using `text-primary-foreground` for contrast.
* **WordMark**: Hidden on extra-small viewports (`hidden sm:block`) to maintain navbar compactness on mobile.

### 3.1 CSS Utility Classes
Tailwind utility classes are used exclusively—no custom CSS required.  This keeps styling consistent with the rest of the project and eliminates CSS bloat.

## 4. Routing & Navigation
`react-router-dom`’s `<Link to="/"/>` wraps the entire brand.  Clicking the brand returns the user to the dashboard/home view without triggering a full page reload.

## 5. Accessibility
1. **Semantic Elements** – Brand is contained within a `<nav>` descendant, ensuring screen-reader discoverability.
2. **Contrast** – Colors follow WCAG AA contrast ratios (primary background vs. primary-foreground text).
3. **Focus Ring** – The `<Link>` inherits focus styles from shadcn/ui’s `Link` component, providing visible keyboard navigation cues.
4. **Screen Readers** – `aria-label="TaskFlow Home"` added to the `<Link>` (already present in updated code) for descriptive navigation.

## 6. Responsive Behaviour
| Breakpoint | Behaviour |
| ---------- | --------- |
| `<640px`   | Only LogoMark shown to save horizontal space. |
| `≥640px`   | WordMark becomes visible (`sm:block`). |

The logo mark remains 32×32 px across breakpoints, ensuring a stable navbar height.

## 7. Error & Edge-Case Handling
- **Missing Route** – The `/` route is guaranteed; no additional error handling necessary.
- **Hydration Mismatch** – Static brand content eliminates risk of client/server mismatch.

## 8. Performance Considerations
- **Static Render** – Brand contains no dynamic data; React memoization isn’t necessary but component remains lightweight (<50 LOC).
- **Bundle Size** – No additional dependencies introduced; negligible impact.

## 9. Security Considerations
No user-input or external data is rendered. Standard React XSS protections suffice.

## 10. Implementation Checklist
- [x] Update `Header.tsx` brand markup & text.
- [x] Remove duplicate brand block from `HomePage.tsx`.
- [x] Verify Tailwind styles compile.
- [ ] Add unit snapshot test for `Header` branding. *(Optional enhancement – not in scope for MVP).*

## 11. Trade-offs & Alternatives
| Option | Pros | Cons |
| ------ | ---- | ---- |
| **Keep branding in HomePage** | Simpler – no navbar change | Lower brand visibility; duplicated on every page |
| **SVG logo sprite** | Crisp scalable vector | Requires extra asset & bundling |

Chosen approach balances simplicity & clarity.

## 12. Open Questions
None – requirements fully addressed.

---
_Updated: 2025-07-28 13:18 (UTC+7)_
