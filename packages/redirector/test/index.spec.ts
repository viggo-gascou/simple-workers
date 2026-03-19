import { createExecutionContext, waitOnExecutionContext } from 'cloudflare:test';
import { describe, it, expect } from 'vitest';
import worker from '../src/index';

// For now, you'll need to do something like this to get a correctly-typed
// `Request` to pass to `worker.fetch()`.
const IncomingRequest = Request<unknown, IncomingRequestCfProperties>;

// Mock env with a redirect key
const mockEnv = {
  redirects: {
    get: async (key: string) => {
      if (key === 'redirect') return 'https://ismyinternetworking.com/';
      return null;
    },
  },
} as Env;

describe('Simple Redirector (unit style)', () => {
  it('responds with error 404 for invalid URL', async () => {
    const request = new IncomingRequest('https://example.com/InvalidURL');
    const ctx = createExecutionContext();

    const response = await worker.fetch(request, mockEnv, ctx);
    await waitOnExecutionContext(ctx);

    expect(response.status).toBe(404);
  });

  it('responds with correct code, and redirects to a known URL', async () => {
    const request = new IncomingRequest('https://example.com/redirect');
    const ctx = createExecutionContext();

    const response = await worker.fetch(request, mockEnv, ctx);
    await waitOnExecutionContext(ctx);

    expect(response.status).toBe(301);
    expect(response.headers.get('location')).toBe('https://ismyinternetworking.com/');
  });
});
