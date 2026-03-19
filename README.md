# Simple Workers

A monorepo of lightweight Cloudflare Workers services.

## Packages

### [simple-redirector](packages/redirector)

A URL shortener and redirector service using Cloudflare Workers and KV storage.

- 💾 KV storage for redirect mappings
- 🎨 Custom animated 404 error page
- 🌙 Dark/light mode support for error page

### [simple-assets](packages/assets)

A static asset hosting service using Cloudflare Workers.

- 📦 Static asset hosting
- 🌍 Global edge network delivery
- ↪️ Automatic fallback to homepage for 404s

## Development

### Prerequisites

- [Node.js](https://nodejs.org/) 24+
- [pnpm](https://pnpm.io/) 10+

### Setup

```bash
pnpm install

# Generate wrangler configs (requires .env files in each package)
pnpm -r build
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
