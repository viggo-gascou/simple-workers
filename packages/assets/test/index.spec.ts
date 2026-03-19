import { exports } from 'cloudflare:workers';
import { createExecutionContext, waitOnExecutionContext } from 'cloudflare:test';
import { describe, it, expect } from 'vitest';
import worker from '../src/index';

const IncomingRequest = Request<unknown, IncomingRequestCfProperties>;

describe('Simple Assets worker', () => {
  it('responds with 404 for non-existent assets (unit style)', async () => {
    const request = new IncomingRequest('http://example.com/does-not-exist.png');
    const ctx = createExecutionContext();

    const response = await worker.fetch(request, {} as Env, ctx);

    await waitOnExecutionContext(ctx);
    expect(response.status).toBe(404);
  });

  it('responds with 404 for non-existent assets (integration style)', async () => {
    const response = await exports.default.fetch('https://example.com/invalid-asset.jpg', {
      redirect: 'manual',
    });
    expect(response.status).toBe(404);
  });
});
