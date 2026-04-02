export function withUtm(href: string, slug: string): string {
  try {
    const url = new URL(href);
    url.searchParams.set("utm_source", "octominds_studio");
    url.searchParams.set("utm_medium", "web");
    url.searchParams.set("utm_content", slug);
    return url.toString();
  } catch {
    return href;
  }
}
