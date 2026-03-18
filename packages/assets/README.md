# Simple Assets

A lightweight static asset hosting service built on Cloudflare Workers.

## Overview

Simple Assets is a serverless asset hosting service that provides fast, global delivery
of static files using Cloudflare's edge network. It serves files from the `assets`
directory and redirects to the homepage for any missing assets.

## Features

- 📦 Cloudflare Workers static assets hosting
- 🌍 Global edge network delivery
- ↪️ Automatic fallback to homepage for 404s

## Usage

Access your assets via the domain:
- `https://<YOUR_DOMAIN>/your-filename` → serves the `assets/your-filename` file
- `https://<YOUR_DOMAIN>/invalid-filename` → redirects to homepage

### Adding Assets

Simply add files to the `assets` directory and deploy:

```bash
# Add your file to the assets directory
cp /path/to/your/file assets/

# Deploy
pnpm deploy
```

## Configuration

To change the assets directory, simply change the directory path in the
`wrangler.jsonc` config:

```json
{
	"assets": {
		"directory": "./assets", // <<< Change this part
		"binding": "ASSETS",
	},
}
```
