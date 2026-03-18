## v1.1.0 (2026-02-03)

### Feat
- Updated Wrangler configuration for deployment (`wrangler.jsonc`)
- Added Dependabot config for automatic dependency updates

### Dependencies
- Upgraded `@cloudflare/vitest-pool-workers` from 0.8.19 → 0.12.9
- Upgraded `vitest` from ~3.2.0 → ~3.2.4 (pinned for Cloudflare compatibility)
- Upgraded `typescript` from ^5.5.2 → ^5.9.3
- Upgraded `wrangler` from ^4.24.3 → ^4.62.0

### Chore
- Pre-commit hook updates to handle future deprecations
- Documentation cleanup (`README.md`)

## v1.0.0 (2025-07-19)

### Feat

- Initial release
- Integration and unit tests
- Custom 404 error page on invalid and root path
- Redirect with 301 on valid shortnames
- Dev and production environments
