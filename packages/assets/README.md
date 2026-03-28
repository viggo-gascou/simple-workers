# Simple Assets

A lightweight static asset hosting service built on Cloudflare Workers.

## Overview

Simple Assets is a serverless asset hosting service that provides fast, global delivery
of static files using Cloudflare's edge network. It uses the Cloudflare Workers static
assets binding to serve files directly from the `assets` directory. If no matching file
is found, the request falls through to the worker which returns a custom 404 page.

## Features

- Cloudflare Workers static assets hosting
- Global edge network delivery
- Custom animated 404 error page with dark/light mode support

## Usage

Access your assets via the domain:

- `https://<YOUR_DOMAIN>/your-filename` → serves the `assets/your-filename` file
- `https://<YOUR_DOMAIN>/invalid-filename` → custom 404 page

### Adding Assets

Add files to the `assets` directory and deploy:

```bash
cp /path/to/your/file assets/
pnpm cf-deploy
```

## Configuration

To change the assets directory, update the path in `wrangler.jsonc`:

```json
{
  "assets": {
    "directory": "./assets", // <<< Change this part
    "binding": "ASSETS"
  }
}
```

## Development

```bash
# Start dev server
pnpm dev

# Run tests
pnpm test

# Deploy
pnpm cf-deploy
```
