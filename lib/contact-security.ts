import { createHmac, randomBytes } from "node:crypto";

const windowMs = 10 * 60 * 1000;
const salt = randomBytes(32);
const attempts = new Map<string, { count: number; expiresAt: number }>();

export function allowContactAttempt(source: string, now = Date.now()) {
  for (const [key, attempt] of attempts) if (attempt.expiresAt <= now) attempts.delete(key);
  const key = createHmac("sha256", salt).update(source).digest("hex");
  const attempt = attempts.get(key);
  if (attempt && attempt.count >= 5) return { allowed: false, retryAfter: Math.ceil((attempt.expiresAt - now) / 1000) };
  // Limite também evita crescimento ilimitado do mapa sob abuso.
  if (!attempt && attempts.size >= 2500) return { allowed: false, retryAfter: 60 };
  attempts.set(key, { count: (attempt?.count ?? 0) + 1, expiresAt: attempt?.expiresAt ?? now + windowMs });
  return { allowed: true, retryAfter: 0 };
}

export function isAllowedOrigin(request: Request, configuredOrigin?: string, vercelHost?: string) {
  try {
    const origin = request.headers.get("origin");
    if (!origin || request.headers.get("sec-fetch-site") === "cross-site") return false;
    const allowed = configuredOrigin || (vercelHost ? `https://${vercelHost}` : "");
    if (allowed) {
      const url = new URL(allowed);
      return url.protocol === "https:" && url.origin === origin && url.pathname === "/" && !url.search && !url.hash && !url.username && !url.password;
    }
    const url = new URL(request.url);
    return ["localhost", "127.0.0.1", "[::1]"].includes(url.hostname) && origin === url.origin;
  } catch {
    return false;
  }
}

export async function readContactBody(request: Request) {
  const maximum = 16 * 1024;
  if (Number(request.headers.get("content-length")) > maximum) throw new RangeError("body_limit");
  if (!request.body) throw new SyntaxError("empty_body");
  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let length = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      length += value.byteLength;
      if (length > maximum) { await reader.cancel(); throw new RangeError("body_limit"); }
      chunks.push(value);
    }
    return JSON.parse(Buffer.concat(chunks).toString("utf8")) as unknown;
  } finally {
    reader.releaseLock();
  }
}
