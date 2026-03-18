import { env, exports } from 'cloudflare:workers';
import { createExecutionContext, waitOnExecutionContext } from 'cloudflare:test';
import { describe, it, expect } from 'vitest';
import worker from '../src/index';

// For now, you'll need to do something like this to get a correctly-typed
// `Request` to pass to `worker.fetch()`.
const IncomingRequest = Request<unknown, IncomingRequestCfProperties>;

describe('Simple Redirector (unit style)', () => {
  it('responds with error 404 for invalid URL', async () => {
    const request = new IncomingRequest('https://example.com/InvalidURL');
    const ctx = createExecutionContext();
    const response = await worker.fetch(request, {}, ctx); // empty env simulates no KV
    await waitOnExecutionContext(ctx);
    expect(response.status).toBe(404);
  });

  it('responds with correct code, and redirects to a known URL', async () => {
    const request = new IncomingRequest('https://example.com/redirect');
    const ctx = createExecutionContext();

    // Mock env with a redirect key
    const envMock = {
      redirects: {
        get: async (key: string) => {
          if (key === 'redirect') return 'https://ismyinternetworking.com/';
          return null;
        },
      },
    };

    const response = await worker.fetch(request, envMock, ctx);
    await waitOnExecutionContext(ctx);

    expect(response.status).toBe(301);
    expect(response.headers.get('location')).toBe('https://ismyinternetworking.com/');
  });
});

describe('Simple Redirector (integration style)', () => {
  it('responds with error 404 for invalid URL', async () => {
    const response = await exports.default.fetch(env.ROOT_URL + '/InvalidURL', {
      redirect: 'manual',
    });
    expect(response.status).toBe(404);
  });
  it('responds with correct code, and redirects to the correct URL', async () => {
    await env.redirects.put('redirect', 'https://ismyinternetworking.com/');
    const response = await exports.default.fetch(env.ROOT_URL + '/redirect', {
      redirect: 'manual',
    });
    expect(response.status).toBe(301);
    expect(response.headers.get('location')).toBe('https://ismyinternetworking.com/');
  });
});
