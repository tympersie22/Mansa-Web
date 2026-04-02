const svg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="14" fill="#383836" />
  <path d="M18 46V18h8l6 10 6-10h8v28h-7V30l-7 11-7-11v16h-7Z" fill="#FBB040" />
</svg>
`;

export function GET() {
  return new Response(svg, {
    headers: {
      'Content-Type': 'image/svg+xml',
      'Cache-Control': 'public, max-age=86400',
    },
  });
}
