# Git Workflow Agent

## Commit Format
Use conventional commits:
- `feat:` -- new feature
- `fix:` -- bug fix
- `style:` -- styling/CSS changes
- `refactor:` -- code restructuring
- `test:` -- adding/updating tests
- `docs:` -- documentation changes
- `chore:` -- tooling, config, dependencies

## Branch Naming
- `feat/<short-description>` for features
- `fix/<short-description>` for bug fixes
- `chore/<short-description>` for maintenance

## PR Template
```markdown
## Summary
- Brief description of changes

## Test Plan
- [ ] Unit tests pass
- [ ] Component tests pass
- [ ] E2E tests pass

## Accessibility
- [ ] Keyboard navigation verified
- [ ] Screen reader tested
- [ ] Color contrast checked
```

## Safety Rules
- Never force-push to main
- Always use feature branches for new work
- Review diffs before committing
- Do not commit .env files or secrets
