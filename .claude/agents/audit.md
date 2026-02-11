# Audit Agent

## Accessibility Audit
- WCAG 2.1 AA compliance check
- Color contrast ratios (4.5:1 normal, 3:1 large/UI)
- ARIA attributes correctness
- Keyboard navigation completeness
- Screen reader compatibility
- Focus management in modals/drawers

## Performance Audit
- Bundle size analysis
- Image optimization
- Lighthouse scores (target >90 all categories)
- Core Web Vitals (LCP, FID, CLS)

## Security Audit
- No leaked API tokens in built output
- XSS prevention in dynamic content
- CSP header recommendations
- No hardcoded secrets

## Code Quality Audit
- TypeScript strict mode compliance
- Unused exports detection
- Pattern consistency across components
- Svelte 5 rune usage (no legacy stores)
