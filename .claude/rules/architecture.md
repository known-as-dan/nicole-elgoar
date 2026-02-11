# Architecture Rules

## Data Layer
- Mock-first approach: build full UI with placeholder data
- Data functions in `$lib/data/index.ts` with same interface Shopify will later implement
- `getAllCollections()` and `getCollection(handle)` are the primary data functions

## State Management
- Svelte 5 rune-based classes in `.svelte.ts` files
- Shared via `setContext()` / `getContext()` -- no legacy stores (`writable`, `readable`, etc.)
- Key state classes: `CollectionState`, `CartState`, `AccessibilityState`
- Use `$state`, `$derived`, `$effect` runes

## Theming System
- Typed `CollectionTheme` objects with all visual properties
- Themes converted to CSS custom properties via `themeToCustomProperties()`
- Each theme defines: gradient, pattern, colors, card background, decorations, transition config
- Per-theme `@keyframes` for collection transitions

## Component Organization
```
$lib/components/
  layout/       -- PageShell, Navbar, NavTab, Footer, SkipNav, LanguageSwitcher
  collection/   -- CollectionBackground, CollectionTransition, CollectionGrid, CollectionHeader
  product/      -- ProductCard, ProductImage, ProductPrice, ProductInventory, ProductDetailModal
  cart/         -- CartDrawer, CartLine, CartSummary, CartBadge, CartEmpty
  ui/           -- Button, IconButton, FocusTrap, LiveRegion, QuantitySelector, Spinner
  a11y/         -- ReducedMotionToggle
```

## Type Definitions
- All types in `$lib/types/` directory
- Types shared between mock data and future Shopify integration
- Key types: `Product`, `ProductVariant`, `Money`, `Collection`, `Cart`, `CartLine`

## i18n
- Paraglide for UI strings: `import * as m from '$lib/paraglide/messages'`
- `Intl.NumberFormat` for price/currency formatting
- Product content stays in original language (not translated)
- 3 locales: English (en), Hebrew (he), Russian (ru)

## Prerendering
- `adapter-static` for full static site generation
- `export const prerender = true` in root layout
- All collection pages prerendered at build time

## File Naming
- Components: PascalCase `.svelte` files
- State classes: camelCase `.svelte.ts` files
- Utilities: camelCase `.ts` files
- Types: camelCase `.ts` files
- Unit/component tests: `*.spec.ts`
- E2E tests: `*.test.ts`
