# Simple Redirector

A lightweight URL shortener and redirector service built on Cloudflare Workers
with KV storage.

## Overview

Simple Redirector is a serverless URL shortening service that provides fast, global
redirects using Cloudflare's edge network. It stores redirect mappings in
Cloudflare KV and serves a custom 404 page for invalid URLs.

## Features

- Cloudflare KV storage for redirect mappings
- Custom animated 404 error page with dark/light mode support
- All redirects served under `/go/` prefix to allow WAF-level bot filtering

## Usage

Redirects are served under the `/go/` prefix:

- `https://<YOUR_DOMAIN>/go/shortname` → 301 redirect to stored URL
- `https://<YOUR_DOMAIN>/go/unknown` → 404 custom error page
- `https://<YOUR_DOMAIN>/anything-else` → 400 Bad Request (no body)

### Adding Redirects

Add redirect mappings to your KV namespace using the shortname as the key
(no `/go/` prefix needed):

```bash
# Development
pnpx wrangler kv:key put "shortname" "https://example.com" --binding redirects

# Production
pnpx wrangler kv:key put "shortname" "https://example.com" \
    --binding redirects \
    --env production
```

### Cloudflare WAF Rule

To block bot traffic at the edge before it reaches the worker, add a WAF rule
with the action **Block**:

```text
http.host eq "<YOUR_DOMAIN>" and not starts_with(http.request.uri.path, "/go/") and not http.request.uri.path in {"/" "/favicon.ico" "/robots.txt"}
```

The hostname check scopes the rule to this worker only — without it, the rule
would also apply to other subdomains on the same zone (e.g. `assets.<YOUR_DOMAIN>`).
The allowlisted paths (`/`, `/favicon.ico`, `/robots.txt`) are excluded to avoid
blocking legitimate browser requests.

## KV Namespaces

- `redirects`: Stores the shortname → URL mappings

## Development

```bash
# Start dev server
pnpm dev

# Run tests
pnpm test

# Deploy
pnpm cf-deploy
```
