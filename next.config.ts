import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["127.0.0.1", "192.168.1.*"],
  turbopack: {
    root: process.cwd(),
  },
  async headers() {
    const development = process.env.NODE_ENV === "development";
    const policy = [
      "default-src 'self'",
      // O App Router estático usa scripts inline de hidratação. Sem unsafe-eval em produção.
      `script-src 'self' 'unsafe-inline'${development ? " 'unsafe-eval'" : ""}`,
      "style-src 'self' 'unsafe-inline'", "img-src 'self' data: blob:", "font-src 'self'",
      `connect-src 'self'${development ? " ws: wss:" : ""}`,
      "frame-src 'none'", "object-src 'none'", "base-uri 'self'",
      // Envio por fetch para a API própria; bloqueia submissão nativa se a hidratação falhar.
      "form-action 'none'", "frame-ancestors 'none'",
    ].join("; ");
    return [{ source: "/:path*", headers: [
      { key: "Content-Security-Policy", value: policy },
      { key: "Referrer-Policy", value: "no-referrer" },
      { key: "X-Content-Type-Options", value: "nosniff" },
      { key: "X-Frame-Options", value: "DENY" },
      { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
    ] }];
  },
};

export default nextConfig;
