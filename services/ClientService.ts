export function getCookie(name: string): string | undefined {
  if (!document.cookie) return;
  for (const cookie of document.cookie.split(";")) {
    const [key, value] = cookie.split("=");
    if (key.trim() === name) return value;
  }
}
