import { errorResponse } from '@simple-workers/shared/error-response';

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    // We shouldn't get here unless the asset doesn't exist, so we 404
    const url = new URL(request.url);
    return errorResponse(url.hostname);
  },
} satisfies ExportedHandler<Env>;
