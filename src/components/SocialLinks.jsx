import React from "react";

const platforms = [
  {
    key: "facebook",
    name: "Facebook",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
        <path d="M13.5 22v-8h2.75l.5-3h-3.25V9.05c0-.87.43-1.55 1.67-1.55h1.76V4.82c-.31-.04-1.38-.14-2.63-.14-2.6 0-4.38 1.59-4.38 4.5V11H7v3h2.92v8h3.58Z" />
      </svg>
    ),
  },
  {
    key: "instagram",
    name: "Instagram",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
        <rect
          x="3"
          y="3"
          width="18"
          height="18"
          rx="5"
          stroke="currentColor"
          strokeWidth="2"
        />
        <circle
          cx="12"
          cy="12"
          r="4"
          stroke="currentColor"
          strokeWidth="2"
        />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
      </svg>
    ),
  },
  {
    key: "youtube",
    name: "YouTube",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
        <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8ZM9.6 15.5v-7l6.2 3.5-6.2 3.5Z" />
      </svg>
    ),
  },
];

export default function SocialLinks({
  links = {},
  size = "normal",
  showLabels = false,
}) {
  const availablePlatforms = platforms.filter(
    (platform) => links[platform.key]
  );

  if (!availablePlatforms.length) return null;

  return (
    <div className="flex flex-wrap items-center gap-3">
      {availablePlatforms.map((platform) => (
        <a
          key={platform.key}
          href={links[platform.key]}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Harry Innovative Technologies on ${platform.name}`}
          title={platform.name}
          className={`group flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white text-slate-600 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:text-blue-600 hover:shadow-lg ${
            size === "small"
              ? "h-10 w-10"
              : "h-11 w-11"
          }`}
        >
          <span className="transition-transform duration-300 group-hover:scale-110">
            {platform.icon}
          </span>

          {showLabels && (
            <span className="pr-3 text-sm font-bold">
              {platform.name}
            </span>
          )}
        </a>
      ))}
    </div>
  );
}