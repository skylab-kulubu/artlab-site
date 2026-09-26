const links = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/ytuskylab/",
    path: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <path d="M17.5 6.5 V6.51" />
      </>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/ytuskylab/",
    path: (
      <>
        <path d="M16 8 A6 6 0 0 1 22 14 V21 H18 V14 A2 2 0 0 0 14 14 V21 H10 V14 A6 6 0 0 1 16 8 Z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </>
    ),
  },
  {
    label: "X",
    href: "https://x.com/skylabkulubu",
    path: <path d="M4 4 L20 20 M20 4 L4 20" />,
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/ytuskylab/",
    path: <path d="M18 2 H15 A5 5 0 0 0 10 7 V10 H7 V14 H10 V22 H14 V14 H17 L18 10 H14 V7 A1 1 0 0 1 15 6 H18 Z" />,
  },
  {
    label: "GitHub",
    href: "https://github.com/skylab-kulubu",
    path: (
      <path d="M9 19 C4 20.5 4 16.5 2 16 M16 22 V18.1 A3.4 3.4 0 0 0 15 15.5 C18.1 15.1 21.4 13.9 21.4 8.5 A5.4 5.4 0 0 0 20 4.8 A5 5 0 0 0 19.9 1 S18.7 0.7 16 2.5 A13.4 13.4 0 0 0 9 2.5 C6.3 0.7 5.1 1 5.1 1 A5 5 0 0 0 5 4.8 A5.4 5.4 0 0 0 3.6 8.5 C3.6 13.9 6.9 15.1 10 15.5 A3.4 3.4 0 0 0 9 18.1 V22" />
    ),
  },
];

export function Social() {
  return (
    <ul className="flex items-center gap-1">
      {links.map((l) => (
        <li key={l.label}>
          <a
            href={l.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`SKY LAB ${l.label}`}
            className="grid size-11 place-items-center text-ink-3 hover:text-cyan"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              aria-hidden="true"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {l.path}
            </svg>
          </a>
        </li>
      ))}
    </ul>
  );
}
