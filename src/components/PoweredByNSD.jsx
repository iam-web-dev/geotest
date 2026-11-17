import { useId } from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';

export const NSD_TELEGRAM_URL = 'https://t.me/iam_web_dev';

export function NSDLogo({ className = "w-6 h-6", ...props }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="181 175 660 660"
      fill="currentColor"
      className={`shrink-0 transition-colors ${className}`}
      aria-label="NSD Corporation logo"
      {...props}
    >
      <polygon points="361,230 661,230 719,307 303,307" />
      <polygon points="281,341 371,340 274,506 369,663 565,340 740,340 840,508 739,671 531,672 577,595 693,595 748,508 653,346 457,670 283,670 182,506" />
      <polygon points="305,702 716,703 651,780 371,780" />
    </svg>
  );
}

export function NSDStamp({
  className = "",
  size = 46,
  inkColor = "",
}) {
  const id = useId();
  const safeId = id.replace(/[^a-zA-Z0-9_-]/g, "");
  const upperPathId = `nsd-stamp-upper-${safeId}`;
  const lowerPathId = `nsd-stamp-lower-${safeId}`;

  return (
    <div
      className={`relative inline-flex items-center justify-center select-none ${className}`}
      title="NSD Corporation — Rasmiy muhr"
    >
      <svg
        viewBox="0 0 200 200"
        width={size}
        height={size}
        className={`shrink-0 ${inkColor || "text-[#144059] dark:text-sky-400"}`}
        fill="currentColor"
        aria-label="NSD Corporation rasmiy muhri"
      >
        <defs>
          <path
            id={upperPathId}
            d="M 26 100 A 74 74 0 0 1 174 100"
            fill="none"
          />
          <path
            id={lowerPathId}
            d="M 26 100 A 74 74 0 0 0 174 100"
            fill="none"
          />
        </defs>

        <circle
          cx="100"
          cy="100"
          r="92"
          fill="none"
          stroke="currentColor"
          strokeWidth="3.5"
        />
        <circle
          cx="100"
          cy="100"
          r="84"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeDasharray="4 3"
        />
        <circle
          cx="100"
          cy="100"
          r="48"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        />

        <text
          fill="currentColor"
          fontSize="11.5"
          fontWeight="800"
          letterSpacing="2.2"
        >
          <textPath href={`#${upperPathId}`} startOffset="50%" textAnchor="middle">
            NSD CORPORATION
          </textPath>
        </text>

        <text
          fill="currentColor"
          fontSize="9"
          fontWeight="700"
          letterSpacing="1.8"
        >
          <textPath href={`#${lowerPathId}`} startOffset="50%" textAnchor="middle">
            • OFFICIAL SEAL •
          </textPath>
        </text>

        <circle cx="24" cy="100" r="2.5" fill="currentColor" />
        <circle cx="176" cy="100" r="2.5" fill="currentColor" />

        <g transform="translate(100, 100) scale(0.065) translate(-512, -505)">
          <polygon points="361,230 661,230 719,307 303,307" />
          <polygon points="281,341 371,340 274,506 369,663 565,340 740,340 840,508 739,671 531,672 577,595 693,595 748,508 653,346 457,670 283,670 182,506" />
          <polygon points="305,702 716,703 651,780 371,780" />
        </g>
      </svg>
    </div>
  );
}

export default function PoweredByNSD({
  className = "",
  logoClassName = "",
  color = "",
  size = "md",
  layout = "footer",
  variant,
  telegramUrl = NSD_TELEGRAM_URL,
  showPoweredBy = true,
}) {
  const activeLayout = variant || layout;
  const activeLogoColor =
    color || logoClassName || "text-[#025df0] dark:text-white";

  // 1. Stacked layout: GlobeLoader uchun
  if (activeLayout === "stacked") {
    const logoSizeClass =
      size === "lg"
        ? "w-14 h-14"
        : size === "sm"
        ? "w-8 h-8"
        : "w-10 h-10";

    return (
      <div
        className={`flex flex-col items-center justify-center gap-1.5 select-none ${className}`}
      >
        <NSDLogo
          className={`${logoSizeClass} ${activeLogoColor} transition-transform duration-200 hover:scale-105`}
        />
        <a
          href={telegramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-semibold tracking-wide text-slate-800 dark:text-slate-100 hover:underline underline-offset-4"
          title="NSD Corporation (Telegram)"
        >
          {showPoweredBy && <span className="opacity-75 font-normal">Powered By </span>}
          NSD Corporation
        </a>
      </div>
    );
  }

  // 2. Standalone stamp: faqat muhr
  if (activeLayout === "stamp") {
    const stampSize = size === "lg" ? 64 : size === "sm" ? 38 : 48;
    return (
      <NSDStamp
        size={stampSize}
        inkColor={activeLogoColor}
        className={className}
      />
    );
  }

  // 3. Inline layout
  if (activeLayout === "inline") {
    return (
      <a
        href={telegramUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`inline-flex items-center justify-center gap-2 text-xs select-none group/link ${className}`}
        title="NSD Corporation (Telegram)"
      >
        <NSDLogo className={`w-5 h-5 ${activeLogoColor}`} />
        <span className="font-medium tracking-tight text-[var(--text-tertiary)]">
          Powered By{" "}
          <span className="font-bold text-[var(--text-primary)] group-hover/link:underline underline-offset-4 decoration-current">
            NSD Corporation
          </span>
        </span>
      </a>
    );
  }

  // 4. Default / Footer layout:
  // Chap tomonda: "Powered By NSD Corporation" (ustiga bosganda telegramga redirect)
  // O'ng tomonda: sayt logosi (logo.svg) va NSD logosi (nsd_logo.svg) bir xil o'lchamda, hamkordek yonma-yon
  return (
    <div
      className={`w-full flex flex-col sm:flex-row items-center justify-between gap-4 select-none ${className}`}
    >
      {/* Chap tomon: Powered By NSD Corporation (Telegramga havola, hoverda faqat underline, rang o'zgarmaydi) */}
      <div className="flex flex-col sm:flex-row items-center sm:items-center gap-1 sm:gap-2.5 text-xs text-[var(--text-tertiary)] text-center sm:text-left">
        <a
          href={telegramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium tracking-tight inline-flex items-center gap-1 group/link cursor-pointer"
          title="NSD Corporation (Telegram orqali bogʻlanish: @iam_web_dev)"
        >
          <span>Powered By</span>
          <span className="font-bold text-[var(--text-primary)] group-hover/link:underline underline-offset-4 decoration-current">
            NSD Corporation
          </span>
        </a>

        <span className="hidden sm:inline opacity-30">·</span>

        <span className="text-[11px]">
          © {new Date().getFullYear()} GEOBEK. Barcha huquqlar himoyalangan.
        </span>
      </div>

      {/* O'ng tomon: logo.svg va nsd_logo.svg bir xil o'lchamda hamkordek */}
      <div className="flex items-center gap-3">
        {/* GEOBEK sayt logosi: light rejimda static blue (#025df0), dark rejimda white */}
        <Link
          to="/"
          className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center p-0.5 rounded-xl hover:bg-[var(--surface-hover,var(--surface))] transition-transform duration-200 hover:scale-110"
          title="GEOBEK platformasi"
        >
          <Logo className="w-full h-full object-contain" />
        </Link>

        {/* Hamkorlik belgisi */}
        <span className="text-xs font-bold text-[var(--text-tertiary)] opacity-40 select-none">
          ×
        </span>

        {/* NSD Corporation logosi (Telegramga havola): light rejimda static blue (#025df0), dark rejimda white */}
        <a
          href={telegramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center p-0.5 rounded-xl hover:bg-[var(--surface-hover,var(--surface))] transition-transform duration-200 hover:scale-110 cursor-pointer"
          title="NSD Corporation (Telegram orqali bogʻlanish)"
        >
          <NSDLogo className={`w-full h-full object-contain ${activeLogoColor}`} />
        </a>
      </div>
    </div>
  );
}
