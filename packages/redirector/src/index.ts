import { errorResponse } from '@simple-workers/shared/error-response';

export default {
  async fetch(request: Request, env: Env, _ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);

    const PREFIX = '/go/';

    if (!url.pathname.startsWith(PREFIX)) {
      return new Response(null, { status: 400 });
    }

    const shortname = url.pathname.slice(PREFIX.length).toLowerCase();

    if (shortname === '') {
      return errorResponse(url.hostname);
    }

    try {
      const value = await env.redirects.get(shortname);
      return value ? Response.redirect(value, 301) : errorResponse(url.hostname);
    } catch {
      return errorResponse(url.hostname);
    }
  },
} satisfies ExportedHandler<Env>;
