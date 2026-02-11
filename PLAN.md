# Nicole Elgoar -- Website Implementation Plan

## Context

**Brand**: Nicole Elgoar -- a medium-priced clothing brand (Nike-comparable pricing) that releases limited, themed clothing collections. Each collection has a distinct identity:
- "Warm Blanket" -- pyjamas, cozy sleepwear
- "Lazy" -- comfy hoodies, sweatpants, relaxation wear
- Future collections follow the same pattern: a name, a mood, a curated set of items

**Website vision**: Minimalistic, collection-focused e-commerce storefront where the clothes are the star. The site doesn't fill the screen -- content lives in a centered ~2/3 width column with a full-screen themed background that transitions beautifully between collections.

**Tech stack** (already scaffolded):
- SvelteKit 2.50.2 + Svelte 5.49.2 (runes, snippets)
- Tailwind CSS 4.1.18 (with `@tailwindcss/forms`, `@tailwindcss/typography`)
- Paraglide i18n (English, Hebrew, Russian)
- TypeScript strict mode
- Vitest + Playwright
- `@sveltejs/adapter-static`
- Vite 7.3.1

**Key decisions**:
- Mock data first -- build the full UI with placeholder data, wire Shopify later
- Brand design from scratch -- Sora + Outfit fonts, neutral base palette
- Product detail via modal/drawer -- clicking a card opens an inline expanding view, no separate pages
- Accessibility compliance with IS 5568 (Israeli Standard, equivalent to WCAG 2.1 AA)

---

## Brand Design System

### Typography
- **Heading font**: [Sora](https://fonts.google.com/specimen/Sora) (Google Fonts) -- futuristic geometric variable font
  - SemiBold (600) for page headings and brand name
  - Medium (500) for collection names and subheadings
  - Full Hebrew + Cyrillic support
- **Body font**: [Outfit](https://fonts.google.com/specimen/Outfit) (Google Fonts) -- clean, friendly geometric sans-serif
  - Regular (400) for body text, descriptions, UI labels
  - SemiBold (600) for buttons, emphasis, prices
  - Full Hebrew + Cyrillic support

### Color Palette
- **Base**: off-white `#FAFAF8`, charcoal `#1A1A1A`, warm gray `#9B9B93`
- **Each collection** introduces its own gradient background, accent color, text color, and card background via CSS custom properties
- The Nicole Elgoar brand identity stays neutral so collections can express their own personality

### Layout
- Content column: `max-w-[66vw]` centered (2/3 screen width)
- Full-screen background behind, themed per collection
- 3 z-layers: background (z-0) > transition overlay (z-10) > content (z-20)

---

## Architecture Overview

### Layout Layers
```
z-0:  CollectionBackground  -- fixed, full-screen, themed gradient + optional pattern
z-10: CollectionTransition  -- fixed, full-screen overlay for collection switch animation
z-20: Content column        -- relative, max-w-[66vw] centered, navbar + page + footer
```

### Data Flow
```
BUILD TIME (adapter-static):
  +layout.ts  -->  $lib/data/index.ts  -->  Mock data (later: Shopify Storefront API)
  +page.ts    -->  $lib/data/index.ts  -->  Collection + products

RUNTIME (browser):
  cart.svelte.ts  -->  localStorage (later: Shopify cart mutations via public token)
```

### State Management
- Svelte 5 rune-based classes in `.svelte.ts` files
- Shared via `setContext` / `getContext` -- no legacy stores
- Key stores: `CollectionState`, `CartState`, `AccessibilityState`

### Component Organization
```
$lib/components/
  layout/       -- PageShell, Navbar, NavTab, Footer, SkipNav, LanguageSwitcher
  collection/   -- CollectionBackground, CollectionTransition, CollectionGrid, CollectionHeader
  product/      -- ProductCard, ProductImage, ProductPrice, ProductInventory, ProductDetailModal
  cart/         -- CartDrawer, CartLine, CartSummary, CartBadge, CartEmpty
  ui/           -- Button, IconButton, FocusTrap, LiveRegion, QuantitySelector, Spinner
  a11y/         -- ReducedMotionToggle
```

---

## Step 1: Project Configuration

### `.claude/rules/` -- Design & Architecture Rules
- [ ] Create `.claude/rules/ui.md` -- UI design system rules
  - [ ] Layout constraints (2/3 width, centered, full-screen background)
  - [ ] Typography rules (Sora headings, Outfit body, weight usage)
  - [ ] Brand palette (base neutrals + per-collection theming)
  - [ ] CSS custom property naming conventions (`--theme-*`)
  - [ ] Card design rules (aspect ratio, hover flip, minimal labels)
  - [ ] Animation rules (600ms default, `prefers-reduced-motion` respect)
  - [ ] Navigation rules (horizontal tabs, themed decorations, `aria-current`)
  - [ ] Cart drawer rules (slide from `end`, focus-trapped)
  - [ ] Product detail modal rules (`role="dialog"`, focus-trapped, variant selection)
  - [ ] RTL rules (Tailwind logical properties only, never `ml-`/`mr-`/`left-`/`right-`)
  - [ ] Accessibility rules (focus rings, skip-nav, ARIA, contrast ratios)
- [ ] Create `.claude/rules/architecture.md` -- Architecture rules
  - [ ] Data layer (mock-first, same interface as Shopify)
  - [ ] State management (Svelte 5 runes, context API)
  - [ ] Theming system (typed theme objects, CSS custom properties, per-theme `@keyframes`)
  - [ ] Component organization conventions
  - [ ] Type definitions (shared shape for mock + Shopify)
  - [ ] i18n approach (Paraglide for UI, `Intl.NumberFormat` for prices)
  - [ ] Prerendering strategy (`adapter-static`, `prerender = true`)

### `.claude/agents/` -- Specialized Agents
- [ ] Create `.claude/agents/git.md` -- Git workflow agent
  - [ ] Conventional commit format (`feat:`, `fix:`, `style:`, `refactor:`, `test:`, `docs:`, `chore:`)
  - [ ] Branch naming conventions
  - [ ] PR template with summary, test plan, accessibility notes
  - [ ] Safety rules (never force-push main, always feature branches)
- [ ] Create `.claude/agents/testing.md` -- Testing agent
  - [ ] Unit test patterns (Vitest) for utilities, stores, theme validation
  - [ ] Component test patterns (Vitest browser mode) for interactive components
  - [ ] E2E test patterns (Playwright) for full user flows
  - [ ] Accessibility test patterns (axe-core, keyboard-only, screen reader)
  - [ ] File naming conventions (`*.spec.ts` unit/component, `*.test.ts` E2E)
- [ ] Create `.claude/agents/research.md` -- Deep research agent
  - [ ] Shopify Storefront API research
  - [ ] Svelte 5 / SvelteKit patterns research
  - [ ] Accessibility compliance techniques
  - [ ] Animation / transition approaches
  - [ ] Tailwind CSS 4 utilities and patterns
- [ ] Create `.claude/agents/audit.md` -- Audit agent
  - [ ] Accessibility audit (WCAG 2.1 AA, contrast, ARIA, keyboard, screen reader)
  - [ ] Performance audit (bundle size, images, Lighthouse, Core Web Vitals)
  - [ ] Security audit (no leaked tokens, XSS prevention, CSP)
  - [ ] Code quality audit (TypeScript strictness, unused exports, pattern consistency)

---

## Step 2: Foundation -- Types, Data, Theming, Layout

### Type Definitions
- [ ] Create `src/lib/types/product.ts`
  - [ ] `ProductImage` interface (`url`, `altText`, `width`, `height`)
  - [ ] `Money` interface (`amount: string`, `currencyCode: string`)
  - [ ] `ProductVariant` interface (`id`, `title`, `price`, `compareAtPrice`, `availableForSale`, `quantityAvailable`, `image`, `selectedOptions`)
  - [ ] `Product` interface (`id`, `handle`, `title`, `description`, `descriptionHtml`, `images`, `variants`, `priceRange`)
- [ ] Create `src/lib/types/collection.ts`
  - [ ] `CollectionSummary` interface (`id`, `handle`, `title`, `description`, `image`)
  - [ ] `CollectionWithProducts` interface (extends `CollectionSummary` + `products: Product[]`)
- [ ] Create `src/lib/types/cart.ts`
  - [ ] `CartLine` interface (`id`, `quantity`, `merchandise`, `cost`)
  - [ ] `Cart` interface (`id`, `checkoutUrl`, `lines`, `cost`, `totalQuantity`)

### Mock Data Layer
- [ ] Create `src/lib/data/mock.ts`
  - [ ] 2-3 mock collections ("Warm Blanket", "Lazy", optionally a third)
  - [ ] 4-6 mock products per collection with placeholder image URLs
  - [ ] Realistic prices (Nike-comparable range)
  - [ ] Varied inventory counts (some low stock, some plentiful)
  - [ ] Multiple variants per product (sizes, colors)
  - [ ] Front + back images per product (for flip effect)
- [ ] Create `src/lib/data/index.ts`
  - [ ] `getAllCollections(): CollectionSummary[]` -- returns all collection summaries
  - [ ] `getCollection(handle: string): CollectionWithProducts | null` -- returns full collection with products
  - [ ] Same function signatures that Shopify integration will later implement

### Theme System
- [ ] Create `src/lib/theme/themes.ts`
  - [ ] `CollectionTheme` interface definition
    - [ ] `handle: string`
    - [ ] `backgroundGradient: string` (CSS gradient)
    - [ ] `backgroundPattern?: string` (optional SVG pattern URL)
    - [ ] `backgroundColor: string` (fallback solid color)
    - [ ] `textColor: string`
    - [ ] `accentColor: string`
    - [ ] `cardBackground: string`
    - [ ] `decoration: { left: string; right: string }` (SVG markup for nav tab decorations)
    - [ ] `transition: { overlayColor: string; animationClass: string; duration: number }`
  - [ ] Theme definition for "Warm Blanket" (warm pinks/roses, cozy feel)
  - [ ] Theme definition for "Lazy" (cool blues/sky, relaxed feel)
  - [ ] `getTheme(handle)` and `getThemeDecoration(handle)` exports
- [ ] Create `src/lib/theme/utils.ts`
  - [ ] `themeToCustomProperties(theme)` -- converts theme object to `Record<string, string>` for CSS vars
- [ ] Create `src/lib/theme/transition.ts`
  - [ ] `getThemeTransition(handle)` -- returns transition config for a collection

### Stores
- [ ] Create `src/lib/stores/collection.svelte.ts`
  - [ ] `CollectionState` class with Svelte 5 runes
    - [ ] `handle = $state<string>('')` -- active collection handle
    - [ ] `transitioning = $state(false)` -- whether a transition animation is playing
    - [ ] `previousHandle = $state<string>('')` -- previous collection for transition direction
    - [ ] `transitionTo(newHandle)` async method -- orchestrates overlay-in, swap, overlay-out
  - [ ] `setActiveCollection()` / `getActiveCollection()` context helpers
- [ ] Create `src/lib/stores/accessibility.svelte.ts`
  - [ ] `AccessibilityState` class with Svelte 5 runes
    - [ ] `#prefersReducedMotion` via `MediaQuery('(prefers-reduced-motion: reduce)')`
    - [ ] `userOverride = $state<boolean | null>(null)` -- manual toggle
    - [ ] `reducedMotion = $derived(...)` -- combined preference
    - [ ] `transitionDuration` getter -- returns `0` when reduced motion active
  - [ ] `setAccessibility()` / `getAccessibility()` context helpers

### Layout Components
- [ ] Create `src/lib/components/layout/PageShell.svelte`
  - [ ] Renders 3 z-layers: CollectionBackground, CollectionTransition, centered content column
  - [ ] Content column uses `max-w-[66vw]` centered with padding
  - [ ] Accepts `children` snippet
- [ ] Create `src/lib/components/layout/SkipNav.svelte`
  - [ ] Skip-to-content link, `sr-only` by default, visible on focus
  - [ ] Links to `#main-content`

### Collection Background & Transition
- [ ] Create `src/lib/components/collection/CollectionBackground.svelte`
  - [ ] `fixed inset-0 z-0` positioning
  - [ ] Reads active collection from store, applies themed gradient
  - [ ] Optional pattern overlay at reduced opacity
  - [ ] `transition-all duration-700 ease-in-out` for smooth background changes
  - [ ] `aria-hidden="true"`
- [ ] Create `src/lib/components/collection/CollectionTransition.svelte`
  - [ ] `fixed inset-0 z-10` positioning
  - [ ] Only renders when `collectionState.transitioning` is true
  - [ ] Applies per-theme animation class (e.g., `clip-path: circle()` reveal, `scaleY` curtain)
  - [ ] `aria-hidden="true"`

### Routes & Root Layout
- [ ] Modify `src/routes/+layout.svelte`
  - [ ] Import and render `PageShell`
  - [ ] Initialize context providers (`setActiveCollection()`, `setCart()`, `setAccessibility()`)
  - [ ] Add `$effect` watching route params to trigger collection transitions
  - [ ] Render `Navbar`, `<main id="main-content">`, `Footer`, `CartDrawer`
- [ ] Create `src/routes/+layout.ts`
  - [ ] `export const prerender = true`
  - [ ] Load all collection summaries via `getAllCollections()`
- [ ] Create `src/routes/collections/[handle]/+page.svelte`
  - [ ] Render `CollectionHeader` and `CollectionGrid`
  - [ ] Render `ProductDetailModal` (controlled by selected product state)
- [ ] Create `src/routes/collections/[handle]/+page.ts`
  - [ ] Load collection + products via `getCollection(params.handle)`
  - [ ] 404 if collection not found
- [ ] Modify `src/routes/+page.svelte`
  - [ ] Homepage: redirect to first collection or render a landing hero
- [ ] Modify `src/routes/layout.css`
  - [ ] Tailwind CSS 4 imports
  - [ ] Google Fonts import for Sora + Outfit
  - [ ] `font-family` defaults (Outfit for body, Sora for headings)
  - [ ] Collection transition `@keyframes` definitions (circle reveal, curtain drop, etc.)
  - [ ] `@media (prefers-reduced-motion: reduce)` overrides (zero all animation durations)
- [ ] Modify `src/app.html`
  - [ ] Add `dir="%paraglide.dir%"` to `<html>` tag
  - [ ] Add Google Fonts `<link>` preconnect and stylesheet for Sora + Outfit
- [ ] Modify `src/hooks.server.ts`
  - [ ] Extend Paraglide middleware to inject `dir` attribute (`rtl` for Hebrew, `ltr` otherwise)

---

## Step 3: UI Components -- Navigation, Cards, Animations

### Navigation
- [ ] Create `src/lib/components/layout/Navbar.svelte`
  - [ ] Brand name/logo link (home)
  - [ ] Collection tabs rendered from layout data
  - [ ] Cart badge button (opens cart drawer)
  - [ ] Language switcher
  - [ ] `<nav aria-label="Main navigation">`
  - [ ] Responsive: horizontal tabs on desktop, collapsible on mobile
- [ ] Create `src/lib/components/layout/NavTab.svelte`
  - [ ] Link to `/collections/{handle}`
  - [ ] Themed SVG decorations flanking the collection name (from theme definition)
  - [ ] `aria-current="page"` when active
  - [ ] Visual active state (font weight, underline, or accent color)
- [ ] Create `src/lib/components/layout/Footer.svelte`
  - [ ] Minimal footer with brand name, copyright, accessibility statement link
- [ ] Create `src/lib/components/layout/LanguageSwitcher.svelte`
  - [ ] Dropdown or button group for en / he / ru
  - [ ] Uses Paraglide's locale switching
  - [ ] Accessible labeling

### Collection Display
- [ ] Create `src/lib/components/collection/CollectionHeader.svelte`
  - [ ] Collection title (`<h1>` with Sora font)
  - [ ] Collection description (brief, understated)
- [ ] Create `src/lib/components/collection/CollectionGrid.svelte`
  - [ ] Responsive grid of `ProductCard` components
  - [ ] Grid: 2 columns on mobile, 3 on tablet, 4 on desktop
  - [ ] Gap spacing consistent with minimalist design
  - [ ] `role="list"` with `role="listitem"` on cards (or semantic `<ul>`/`<li>`)

### Product Components
- [ ] Create `src/lib/components/product/ProductCard.svelte`
  - [ ] `<article aria-label="{product.title}">`
  - [ ] `ProductImage` (flip on hover)
  - [ ] Product title (`<h3>`)
  - [ ] `ProductPrice` (minimalistic label)
  - [ ] `ProductInventory` (stock count badge)
  - [ ] Click handler opens `ProductDetailModal`
  - [ ] `group` class for hover state propagation
- [ ] Create `src/lib/components/product/ProductImage.svelte`
  - [ ] CSS 3D flip effect container
    - [ ] `perspective-1000` on outer container
    - [ ] `[transform-style:preserve-3d]` on flip wrapper
    - [ ] `group-hover:[transform:rotateY(180deg)]` trigger
    - [ ] `group-focus-within:[transform:rotateY(180deg)]` for keyboard users
    - [ ] `[backface-visibility:hidden]` on both faces
    - [ ] `[transform:rotateY(180deg)]` pre-rotation on back face
  - [ ] Front image: product front view
  - [ ] Back image: product back view (falls back to front if no back image)
  - [ ] `aspect-[3/4]` ratio
  - [ ] `loading="lazy"` on images
  - [ ] Meaningful `alt` text
- [ ] Create `src/lib/components/product/ProductPrice.svelte`
  - [ ] Formats price via `Intl.NumberFormat` with locale
  - [ ] Shows compare-at price (strikethrough) if on sale
  - [ ] Minimalistic styling (small text, subtle)
- [ ] Create `src/lib/components/product/ProductInventory.svelte`
  - [ ] Shows stock count (e.g., "12 left" or "Low stock")
  - [ ] Visual urgency for low inventory (subtle color change)
  - [ ] Hidden if out of stock (or shows "Sold out" badge)
- [ ] Create `src/lib/components/product/ProductDetailModal.svelte`
  - [ ] `role="dialog"`, `aria-modal="true"`, `aria-label="{product.title}"`
  - [ ] Focus-trapped (uses `FocusTrap` component)
  - [ ] Closes on: backdrop click, Escape key, close button
  - [ ] Returns focus to trigger element on close
  - [ ] Svelte `transition:fly` or `transition:scale` entrance animation
  - [ ] Large product images (front + back, clickable to toggle)
  - [ ] Full product description
  - [ ] Variant selection (size, color) with accessible radio/select inputs
  - [ ] Price display
  - [ ] Add-to-cart button
  - [ ] Inventory count

---

## Step 4: Cart System

### Cart Store
- [ ] Create `src/lib/stores/cart.svelte.ts`
  - [ ] `CartState` class with Svelte 5 runes
    - [ ] `lines = $state<CartLine[]>([])` -- cart items
    - [ ] `open = $state(false)` -- drawer visibility
    - [ ] `loading = $state(false)` -- mutation loading state
    - [ ] `itemCount = $derived(...)` -- total item count
    - [ ] `totalAmount = $derived(...)` -- sum of all line totals
  - [ ] `toggle()`, `close()` methods for drawer
  - [ ] `addLine(variantId, quantity)` -- adds item or increments existing
  - [ ] `updateLine(lineId, quantity)` -- updates quantity
  - [ ] `removeLine(lineId)` -- removes item
  - [ ] localStorage persistence for cart data
  - [ ] `setCart()` / `getCart()` context helpers
  - [ ] Placeholder checkout URL (will become Shopify `checkoutUrl` later)

### Cart Components
- [ ] Create `src/lib/components/cart/CartDrawer.svelte`
  - [ ] Slide-out panel, `fixed inset-y-0 end-0 z-50` (RTL-aware)
  - [ ] Backdrop overlay with `bg-black/50`
  - [ ] `role="dialog"`, `aria-modal="true"`, `aria-label="Shopping cart"`
  - [ ] Focus-trapped via `FocusTrap` component
  - [ ] Svelte `transition:fly` entrance from end side
  - [ ] Header with title + close button
  - [ ] Scrollable list of `CartLine` components
  - [ ] `CartSummary` at bottom
  - [ ] `CartEmpty` state when no items
- [ ] Create `src/lib/components/cart/CartLine.svelte`
  - [ ] Product image thumbnail
  - [ ] Product title + variant info
  - [ ] `QuantitySelector` for adjusting quantity
  - [ ] Line total price
  - [ ] Remove button with `aria-label="Remove {product name} from cart"`
- [ ] Create `src/lib/components/cart/CartSummary.svelte`
  - [ ] Subtotal display
  - [ ] Checkout button (placeholder text until Shopify integration)
  - [ ] Sticky at bottom of drawer
- [ ] Create `src/lib/components/cart/CartBadge.svelte`
  - [ ] Icon button in navbar
  - [ ] Shows item count badge (animated on change)
  - [ ] `aria-label="Cart, {count} items"`
  - [ ] Click toggles `CartDrawer`
- [ ] Create `src/lib/components/cart/CartEmpty.svelte`
  - [ ] Friendly empty state message
  - [ ] "Continue shopping" link back to collections

### Shared UI Components
- [ ] Create `src/lib/components/ui/Button.svelte`
  - [ ] Variants: `primary`, `secondary`, `ghost`
  - [ ] Sizes: `sm`, `md`, `lg`
  - [ ] Disabled state
  - [ ] Loading state (shows `Spinner`)
  - [ ] Accepts `children` snippet
- [ ] Create `src/lib/components/ui/IconButton.svelte`
  - [ ] Icon-only button with required `aria-label`
  - [ ] Hover/focus states
- [ ] Create `src/lib/components/ui/QuantitySelector.svelte`
  - [ ] `-` and `+` buttons flanking a quantity display
  - [ ] `role="spinbutton"`, `aria-valuemin="0"`, `aria-valuemax`, `aria-valuenow`
  - [ ] Keyboard: arrow keys adjust value
  - [ ] Disabled state at min/max bounds
- [ ] Create `src/lib/components/ui/FocusTrap.svelte`
  - [ ] Traps Tab/Shift+Tab within container
  - [ ] Stores and restores previously focused element
  - [ ] Focuses first focusable element on mount
- [ ] Create `src/lib/components/ui/LiveRegion.svelte`
  - [ ] `role="status"`, `aria-live="polite"`, `aria-atomic="true"`
  - [ ] `sr-only` class (visually hidden)
  - [ ] `announce(text)` function for screen reader announcements
- [ ] Create `src/lib/components/ui/Spinner.svelte`
  - [ ] Accessible loading indicator
  - [ ] `role="status"`, `aria-label="Loading"`

---

## Step 5: Accessibility & Polish (IS 5568 / WCAG 2.1 AA)

### Structural Accessibility
- [ ] Verify semantic HTML throughout all components
  - [ ] `<nav>` for navigation
  - [ ] `<main>` for content with `id="main-content"` and `tabindex="-1"`
  - [ ] `<aside>` for cart drawer
  - [ ] `<article>` for product cards
  - [ ] Proper heading hierarchy (`<h1>` > `<h2>` > `<h3>`)
- [ ] Verify skip navigation link works (Tab from page load focuses skip link)

### Focus Management
- [ ] Cart drawer: focus trapped, focus returns to cart button on close
- [ ] Product detail modal: focus trapped, focus returns to product card on close
- [ ] Collection transitions: focus moves to collection heading after transition completes
- [ ] All interactive elements have visible focus indicators (`focus-visible:ring-2 focus-visible:ring-offset-2`)

### ARIA Implementation
- [ ] Cart drawer: `role="dialog"`, `aria-modal="true"`, `aria-label="Shopping cart"`
- [ ] Product detail modal: `role="dialog"`, `aria-modal="true"`, `aria-label="{product title}"`
- [ ] Navbar: `<nav aria-label="Main navigation">`
- [ ] Active collection tab: `aria-current="page"`
- [ ] Cart badge: `aria-label="Cart, {count} items"`
- [ ] All icon buttons: descriptive `aria-label`
- [ ] Quantity selector: `role="spinbutton"` with `aria-valuemin`, `aria-valuemax`, `aria-valuenow`
- [ ] Loading states: `aria-busy="true"` on affected regions
- [ ] Live region: `aria-live="polite"` for cart update announcements
- [ ] Decorative elements: `aria-hidden="true"` on background, transition overlay, SVG decorations

### Color Contrast
- [ ] Validate all theme color pairs meet WCAG 2.1 AA ratios
  - [ ] Normal text (< 18pt): 4.5:1 minimum
  - [ ] Large text (>= 18pt or 14pt bold): 3:1 minimum
  - [ ] UI components and graphical objects: 3:1 minimum
- [ ] Write Vitest unit tests to validate contrast ratios for every theme

### Reduced Motion
- [ ] CSS `@media (prefers-reduced-motion: reduce)` disables all animations
  - [ ] Collection transitions: `animation-duration: 0ms`
  - [ ] Product card flip: `transition-duration: 0ms`
  - [ ] Cart drawer slide: `transition-duration: 0ms`
  - [ ] Product detail modal entrance: `transition-duration: 0ms`
- [ ] `ReducedMotionToggle.svelte` allows manual override
- [ ] JS-controlled animations read `accessibility.reducedMotion` state

### Additional a11y
- [ ] Create `src/lib/utils/a11y.ts` -- focus trap helpers, announce function
- [ ] Create `src/lib/utils/motion.ts` -- `prefers-reduced-motion` detection utility
- [ ] Create `src/lib/components/a11y/ReducedMotionToggle.svelte`
- [ ] Text resizable to 200% without layout breakage (test with browser zoom)
- [ ] All images have meaningful `alt` text
- [ ] Form inputs (quantity, variant selectors) have associated `<label>` elements
- [ ] Error messages identify the problem and suggest correction

---

## Step 6: i18n & RTL

### Paraglide Integration
- [ ] Define all UI strings in message files
  - [ ] `messages/en.json` -- English strings (navigation, cart, buttons, labels, status messages)
  - [ ] `messages/he.json` -- Hebrew translations
  - [ ] `messages/ru.json` -- Russian translations
- [ ] Replace all hardcoded strings in components with `m.key()` Paraglide calls
- [ ] Product content stays in its original language (from mock data / Shopify)

### RTL Support (Hebrew)
- [ ] Set `dir` attribute on `<html>` via Paraglide middleware in `hooks.server.ts`
- [ ] Audit ALL Tailwind classes -- replace directional with logical:
  - [ ] `ml-*` / `mr-*` --> `ms-*` / `me-*`
  - [ ] `pl-*` / `pr-*` --> `ps-*` / `pe-*`
  - [ ] `left-*` / `right-*` --> `start-*` / `end-*`
  - [ ] `text-left` / `text-right` --> `text-start` / `text-end`
  - [ ] `float-left` / `float-right` --> `float-start` / `float-end`
  - [ ] `border-l-*` / `border-r-*` --> `border-s-*` / `border-e-*`
  - [ ] `rounded-l-*` / `rounded-r-*` --> `rounded-s-*` / `rounded-e-*`
- [ ] Cart drawer slides from `end` (right in LTR, left in RTL) automatically
- [ ] Product detail modal adapts to RTL layout
- [ ] Directional animations (slide transitions) check `document.dir`

### Currency & Number Formatting
- [ ] Create `src/lib/utils/currency.ts`
  - [ ] `formatPrice(amount, currencyCode, locale)` using `Intl.NumberFormat`
  - [ ] Handles Hebrew locale formatting (right-to-left number display)
  - [ ] Handles Russian locale formatting

### Testing RTL
- [ ] Visual test: switch to Hebrew locale, verify entire layout mirrors
- [ ] Navbar: tabs flow right-to-left
- [ ] Cart drawer: opens from left side
- [ ] Product grid: cards flow right-to-left
- [ ] Text alignment: all text is end-aligned appropriately

---

## Step 7: Shopify Integration (deferred -- when store is ready)

### Prerequisites
- [ ] Shopify store created with collections and products configured
- [ ] Headless Channel installed, storefront access tokens generated
- [ ] Environment variables set:
  ```
  PUBLIC_SHOPIFY_STORE_DOMAIN=nicole-elgoar.myshopify.com
  PUBLIC_SHOPIFY_STOREFRONT_TOKEN=shpat_public_xxxxx
  SHOPIFY_STOREFRONT_PRIVATE_TOKEN=shpat_private_xxxxx
  ```

### Server-Side (Build Time)
- [ ] Create `src/lib/server/shopify.ts` -- server-only client with private token
  - [ ] `fetchAllCollections()` -- GraphQL query for all collection summaries
  - [ ] `fetchCollectionWithProducts(handle)` -- GraphQL query for collection + products
- [ ] Create `src/lib/shopify/fragments.ts` -- shared GraphQL fragments
  - [ ] `IMAGE_FRAGMENT` (url, altText, width, height)
  - [ ] `VARIANT_FRAGMENT` (id, title, price, inventory, image)
  - [ ] `PRODUCT_FRAGMENT` (full product fields with images and variants)
- [ ] Create `src/lib/shopify/queries.ts`
  - [ ] `ALL_COLLECTIONS_QUERY`
  - [ ] `COLLECTION_WITH_PRODUCTS_QUERY`
- [ ] Create `src/lib/shopify/normalize.ts` -- flatten Shopify `edges/nodes` to arrays

### Client-Side (Runtime Cart)
- [ ] Create `src/lib/shopify/client.ts` -- browser client with public token
  - [ ] `shopifyClientFetch(query, variables)` -- GraphQL fetch wrapper
- [ ] Create `src/lib/shopify/mutations.ts`
  - [ ] `CART_CREATE` -- create new cart with initial line
  - [ ] `CART_LINES_ADD` -- add line items to existing cart
  - [ ] `CART_LINES_UPDATE` -- update line item quantities
  - [ ] `CART_LINES_REMOVE` -- remove line items
  - [ ] `CART_QUERY` -- fetch existing cart by ID

### Swap Data Layer
- [ ] Update `src/lib/data/index.ts` -- replace mock implementations with Shopify calls
- [ ] Update `src/lib/stores/cart.svelte.ts` -- wire `addLine`, `updateLine`, `removeLine` to Shopify mutations
- [ ] Update `CartSummary.svelte` -- checkout button redirects to Shopify `checkoutUrl`
- [ ] Create `.env.example` -- document all required environment variables

---

## Step 8: Testing & Deployment

### Unit Tests (Vitest)
- [ ] Theme utilities: `getTheme()`, `themeToCustomProperties()`, `getThemeTransition()`
- [ ] Currency formatting: `formatPrice()` across locales (en, he, ru)
- [ ] Cart state: add, update, remove lines, total calculation, item count
- [ ] Color contrast: validate all theme color pairs meet WCAG 2.1 AA ratios
- [ ] Mock data integrity: all collections have products, all products have images/variants
- [ ] Normalize functions (when Shopify integrated): edges/nodes flattening

### Component Tests (Vitest Browser Mode)
- [ ] `ProductCard`: renders title, price, inventory; click triggers callback
- [ ] `ProductImage`: flip animation triggers on hover/focus
- [ ] `ProductDetailModal`: opens, displays product info, closes on Escape/backdrop
- [ ] `QuantitySelector`: increment, decrement, min/max bounds, keyboard arrows
- [ ] `CartLine`: displays product info, quantity controls work, remove button works
- [ ] `CartDrawer`: opens/closes, renders lines, shows empty state
- [ ] `NavTab`: active state, themed decorations render
- [ ] `LanguageSwitcher`: locale changes propagate

### E2E Tests (Playwright)
- [ ] **Collection browsing**: navigate between collections, verify content changes
- [ ] **Collection transitions**: animation plays (or instant in reduced motion)
- [ ] **Product card hover**: back image appears on hover
- [ ] **Product detail modal**: opens on card click, shows full info, closes properly
- [ ] **Add to cart**: select variant, add item, cart badge updates, drawer opens
- [ ] **Cart management**: update quantity, remove item, verify totals
- [ ] **Keyboard navigation**: Tab through all interactive elements, Enter/Space activate
- [ ] **Skip navigation**: Tab focuses skip link, Enter jumps to main content
- [ ] **RTL layout**: switch to Hebrew, verify mirrored layout
- [ ] **Reduced motion**: enable preference, verify no animations play
- [ ] **Responsive**: test at mobile, tablet, desktop breakpoints

### Accessibility Testing
- [ ] Run axe-core automated audit on every page
- [ ] Keyboard-only navigation through complete purchase flow
- [ ] Screen reader testing (VoiceOver on macOS)
  - [ ] All interactive elements announced correctly
  - [ ] Cart updates announced via live region
  - [ ] Modal focus management works
- [ ] Color contrast spot-check with browser DevTools

### Deployment
- [ ] `pnpm build` succeeds with `adapter-static`
- [ ] All collection pages are prerendered (check `build/` output)
- [ ] No private tokens in built output (`grep` for token patterns)
- [ ] Deploy to hosting platform (Vercel / Netlify / Cloudflare Pages)
- [ ] Configure environment variables in hosting dashboard
- [ ] Set up scheduled rebuilds for inventory/price sync (when Shopify integrated)

---

## Verification Checklist

- [ ] `pnpm dev` -- all routes render, no console errors
- [ ] `pnpm build` -- static prerendering completes, all pages generated
- [ ] Collection switching -- transitions animate smoothly, background changes
- [ ] Product cards -- hover shows back image, click opens detail modal
- [ ] Cart flow -- add item, update quantity, remove, totals are correct
- [ ] Accessibility -- axe-core clean, keyboard navigable, screen reader friendly
- [ ] RTL -- Hebrew locale mirrors entire layout correctly
- [ ] Reduced motion -- all animations disabled when preference is set
- [ ] Responsive -- works on mobile (375px), tablet (768px), desktop (1440px)
- [ ] `pnpm test` -- all unit and component tests pass
- [ ] `pnpm test:e2e` -- all Playwright tests pass
- [ ] Fonts -- Sora and Outfit load correctly, render in Hebrew and Cyrillic
- [ ] Performance -- Lighthouse score > 90 on all categories
