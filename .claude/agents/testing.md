# Testing Agent

## Unit Tests (Vitest)
- File pattern: `*.spec.ts`
- Test utilities, stores, theme validation, data integrity
- Use `describe`/`it`/`expect` from Vitest

## Component Tests (Vitest Browser Mode)
- File pattern: `*.svelte.spec.ts`
- Test interactive components with real DOM
- Use `@testing-library/svelte` patterns

## E2E Tests (Playwright)
- File pattern: `e2e/*.test.ts`
- Test full user flows: browsing, cart, navigation
- Test accessibility: keyboard navigation, skip nav, screen reader
- Test responsive: mobile (375px), tablet (768px), desktop (1440px)

## Accessibility Tests
- Run axe-core on every page
- Keyboard-only navigation through purchase flow
- Verify focus management in modals/drawers
- Check color contrast ratios programmatically

## Test Naming
- Descriptive: `it('opens cart drawer when cart badge is clicked')`
- Group by feature: `describe('CartDrawer', () => { ... })`
