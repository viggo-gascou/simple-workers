import { html } from './404';

export function errorResponse(hostname: string): Response {
  return new Response(html(new Date().getFullYear(), hostname), {
    status: 404,
    headers: { 'content-type': 'text/html;charset=UTF-8' },
  });
}
