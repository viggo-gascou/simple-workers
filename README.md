# Simple Workers

A monorepo of lightweight Cloudflare Workers services.

## Packages

### [simple-redirector](packages/redirector)

A URL shortener and redirector service using Cloudflare Workers and KV storage.

- KV storage for redirect mappings
- All redirects served under `/go/` prefix to allow WAF-level bot filtering
- Custom animated 404 error page with dark/light mode support

### [simple-assets](packages/assets)

A static asset hosting service using Cloudflare Workers.

- Static asset hosting via Cloudflare Workers static assets binding
- Global edge network delivery
- Custom animated 404 error page with dark/light mode support

## Development

### Prerequisites

- [Node.js](https://nodejs.org/) 24+
- [pnpm](https://pnpm.io/) 10+

### Setup

```bash
pnpm install
```

### Testing

```bash
# Run all tests
pnpm test

# Run tests for a specific package
pnpm --filter redirector test
pnpm --filter assets test
```

### Deployment

```bash
pnpm deploy:redirector
pnpm deploy:assets
```

### Type Generation

```bash
pnpm cf-typegen
```
