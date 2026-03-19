/**
 * Simple Assets
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Bind resources to your worker in `wrangler.jsonc`. After adding bindings, a type definition for the
 * `Env` object can be regenerated with `npm run cf-typegen`.
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

import { html } from './404';

export default {
  async fetch(request, env, ctx): Promise<Response> {
    // We shouldn't get here unless the asset doesn't exist,
    // so we 404
    const year = new Date().getFullYear();

    return new Response(html.replaceAll('{YEAR}', year.toString()), {
      status: 404,
      headers: { 'content-type': 'text/html;charset=UTF-8' },
    });
  },
} satisfies ExportedHandler<Env>;
