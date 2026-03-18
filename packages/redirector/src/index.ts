/**
 * URL Shortener / redirector
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Bind resources to your worker in `wrangler.jsonc`. After adding bindings,
 * a type definition for the `Env` object can be regenerated with `npm run cf-typegen`.
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

import { html } from './404';

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);
    const shortname = url.pathname.slice(1).toLowerCase();
    const year = new Date().getFullYear();

    const ErrorResponse = new Response(html.replaceAll('{YEAR}', year.toString()), {
      status: 404,
      headers: { 'content-type': 'text/html;charset=UTF-8' },
    });

    if (url.pathname === '/' || shortname === '') {
      return ErrorResponse;
    }

    try {
      const value = await env.redirects.get(shortname);
      return value ? Response.redirect(value, 301) : ErrorResponse;
    } catch (err) {
      return ErrorResponse;
    }
  },
} satisfies ExportedHandler<Env>;
