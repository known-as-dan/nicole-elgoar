# UI Design System Rules

## Layout
- Content column: `max-w-[66vw]` centered (2/3 screen width) with padding
- Full-screen background behind content, themed per collection
- 3 z-layers: background (z-0) > transition overlay (z-10) > content (z-20)

## Typography
- **Heading font**: Sora (Google Fonts)
  - SemiBold (600) for page headings and brand name
  - Medium (500) for collection names and subheadings
- **Body font**: Outfit (Google Fonts)
  - Regular (400) for body text, descriptions, UI labels
  - SemiBold (600) for buttons, emphasis, prices

## Color Palette
- **Base**: off-white `#FAFAF8`, charcoal `#1A1A1A`, warm gray `#9B9B93`
- Each collection introduces its own gradient, accent, text, and card background via CSS custom properties
- Brand identity stays neutral; collections express their own personality

## CSS Custom Properties
- Naming convention: `--theme-*` (e.g., `--theme-bg`, `--theme-text`, `--theme-accent`, `--theme-card-bg`)
- Set on the root element or a theme wrapper when switching collections

## Card Design
- Aspect ratio: `aspect-[3/4]`
- Hover: CSS 3D flip to show back image
- Minimal labels: product name and price only on the card face
- `group` class for hover state propagation

## Animation
- Default duration: 600ms
- Always respect `prefers-reduced-motion: reduce` (zero all durations)
- JS-controlled animations read `accessibility.reducedMotion` state
- Collection transitions use per-theme animation classes

## Navigation
- Horizontal collection tabs on desktop, collapsible on mobile
- Themed SVG decorations flanking collection names
- `aria-current="page"` on active tab

## Cart Drawer
- Slides from `end` (RTL-aware: right in LTR, left in RTL)
- `fixed inset-y-0 end-0 z-50`
- Focus-trapped with `FocusTrap` component
- Backdrop overlay: `bg-black/50`

## Product Detail Modal
- `role="dialog"`, `aria-modal="true"`, `aria-label="{product title}"`
- Focus-trapped, closes on Escape/backdrop click/close button
- Returns focus to trigger element on close

## RTL Rules
- **ALWAYS** use Tailwind logical properties:
  - `ms-*` / `me-*` (not `ml-*` / `mr-*`)
  - `ps-*` / `pe-*` (not `pl-*` / `pr-*`)
  - `start-*` / `end-*` (not `left-*` / `right-*`)
  - `text-start` / `text-end` (not `text-left` / `text-right`)
  - `float-start` / `float-end` (not `float-left` / `float-right`)
  - `border-s-*` / `border-e-*` (not `border-l-*` / `border-r-*`)
  - `rounded-s-*` / `rounded-e-*` (not `rounded-l-*` / `rounded-r-*`)

## Base Components
- **Button** & **IconButton**:
  - Support `...rest` props for native HTML attributes (e.g., `aria-*`, `data-*`, `form`).
  - Support class merging: `<Button class="extra-classes" ... />`.
  - `disabled` prop styling is handled automatically but can be overridden.

## Accessibility
- All interactive elements: `focus-visible:ring-2 focus-visible:ring-offset-2`
- Skip-to-content link: `sr-only` by default, visible on focus
- All icon buttons: descriptive `aria-label`
- Decorative elements: `aria-hidden="true"`
- Contrast: WCAG 2.1 AA (4.5:1 normal text, 3:1 large text/UI)
