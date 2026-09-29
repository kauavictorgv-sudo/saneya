import type { ReactNode } from "react";

export type IconName =
  | "arrow"
  | "building"
  | "chart"
  | "check"
  | "chevron"
  | "clipboard"
  | "close"
  | "droplet"
  | "external"
  | "graduation"
  | "handshake"
  | "instagram"
  | "leaf"
  | "linkedin"
  | "mail"
  | "map"
  | "menu"
  | "message"
  | "shield"
  | "tiktok"
  | "user"
  | "users"
  | "wrench";

type IconProps = {
  name: IconName;
  className?: string;
};

const paths: Record<IconName, ReactNode> = {
  arrow: <path d="M5 12h14m-6-6 6 6-6 6" />,
  building: (
    <>
      <path d="M3 21h18M6 21V7l6-4 6 4v14" />
      <path d="M9 10h.01M15 10h.01M9 14h.01M15 14h.01M10 21v-3h4v3" />
    </>
  ),
  chart: (
    <>
      <path d="M3 3v18h18" />
      <path d="m7 16 4-5 3 3 5-7" />
    </>
  ),
  check: <path d="m5 12 4 4L19 6" />,
  chevron: <path d="m6 9 6 6 6-6" />,
  clipboard: (
    <>
      <path d="M9 5H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-3" />
      <rect width="6" height="4" x="9" y="3" rx="1" />
      <path d="m9 14 2 2 4-4" />
    </>
  ),
  close: <path d="M18 6 6 18M6 6l12 12" />,
  droplet: <path d="M12 2.7s6 6.06 6 11.05a6 6 0 1 1-12 0C6 8.76 12 2.7 12 2.7Z" />,
  external: (
    <>
      <path d="M15 3h6v6M10 14 21 3" />
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    </>
  ),
  graduation: (
    <>
      <path d="m2 10 10-5 10 5-10 5L2 10Z" />
      <path d="M6 12v5c3 2 9 2 12 0v-5M22 10v6" />
    </>
  ),
  handshake: (
    <>
      <path d="m11 17 2 2a2 2 0 0 0 3-3M14 14l2.5 2.5a2 2 0 0 0 3-3L15 9l-3 3a2 2 0 0 1-3-3l4-4a4 4 0 0 1 5 0l3 3" />
      <path d="m2 7 5 5M7 17l-2 2-3-3 2-2M8 16l3 3M4 12l4-4" />
    </>
  ),
  instagram: (
    <>
      <rect width="18" height="18" x="3" y="3" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <path d="M17.5 6.5h.01" />
    </>
  ),
  leaf: (
    <>
      <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 18 2 18 2s2 7-1 12c-1.3 2.1-3.4 3.2-6 3" />
      <path d="M2 21c0-3 1.85-5.36 5.08-6.94C9.7 12.78 13 11 16 8" />
    </>
  ),
  linkedin: (
    <>
      <rect width="18" height="18" x="3" y="3" rx="2" />
      <path d="M8 11v5M8 8v.01M12 16v-5M12 13.2c0-1.2.8-2.2 2-2.2s2 1 2 2.2V16" />
    </>
  ),
  mail: (
    <>
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.8 5.5a2.3 2.3 0 0 1-2.4 0L2 7" />
    </>
  ),
  map: (
    <>
      <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" />
      <circle cx="12" cy="10" r="2.5" />
    </>
  ),
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  message: (
    <>
      <path d="M21 12a8 8 0 0 1-8 8H5l-3 2 1.3-4.4A8 8 0 1 1 21 12Z" />
      <path d="M8 12h.01M12 12h.01M16 12h.01" />
    </>
  ),
  shield: (
    <>
      <path d="M20 13c0 5-3.5 7.5-8 9-4.5-1.5-8-4-8-9V5l8-3 8 3v8Z" />
      <path d="m9 12 2 2 4-4" />
    </>
  ),
  tiktok: (
    <>
      <path d="M15 4v10.5a4.5 4.5 0 1 1-4.5-4.5" />
      <path d="M15 4c.6 2.2 2 3.7 4 4.2" />
    </>
  ),
  user: (
    <>
      <circle cx="12" cy="7" r="4" />
      <path d="M4 21a8 8 0 0 1 16 0" />
    </>
  ),
  users: (
    <>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
    </>
  ),
  wrench: (
    <>
      <path d="M14.7 6.3a4 4 0 0 0-5-5L12 3.6 9.6 6 7.3 3.7a4 4 0 0 0 5 5L21 17.4a2.1 2.1 0 0 1-3 3l-8.7-8.7" />
      <path d="m5 13-3 3 6 6 3-3" />
    </>
  ),
};

export default function Icon({ name, className = "size-5" }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.8"
    >
      {paths[name]}
    </svg>
  );
}
