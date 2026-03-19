# Simple Redirector

A lightweight URL shortener and redirector service built on Cloudflare Workers
with KV storage.

## Overview

Simple Redirector is a serverless URL shortening service that provides fast, global
redirects using Cloudflare's edge network. It stores redirect mappings in
Cloudflare KV and serves a custom 404 page for invalid URLs.

## Features

- 💾 Cloudflare KV storage for redirect mappings
- 🎨 Custom animated 404 error page
- 🌙 Dark/light mode support for error page

## Usage

Visit any path on the domain to get redirected:

- `https://<YOUR_DOMAIN>/redirect` → redirects to stored URL
- `https://<YOUR_DOMAIN>/invalidurl` → shows custom 404 page

### Adding Redirects

Add redirect mappings to your KV namespace:

```bash
# Development
pnpx wrangler kv:key put "shortname" "https://example.com" --binding redirects

# Production
pnpx wrangler kv:key put "shortname" "https://example.com" \
    --binding redirects \
    --env production
```

## Configuration

### Environment Variables

- `ROOT_URL`: Base URL for the service
- `ENVIRONMENT`: Current environment (dev/production)

### KV Namespaces

- `redirects`: Stores the shortname → URL mappings

## Setup

1. Copy `.env.example` to `.env` and fill in your values
2. Copy `wrangler.example.jsonc` to `wrangler.jsonc` or run `pnpm build` to generate
3. Run `pnpm cf-typegen` to generate types

## Development

```bash
# Generate wrangler.jsonc and start dev server
pnpm dev

# Run tests (uses wrangler.test.jsonc, no setup needed)
pnpm test

# Deploy
pnpm cf-deploy
```
