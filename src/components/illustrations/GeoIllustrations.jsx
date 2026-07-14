// Geo-Test Custom Illustration System
// Handcrafted SVG illustrations for the geography education platform
// Style: 2px stroke, rounded caps/joins, flat design, 2-3 colors, no gradients/shadows

const colors = {
  primary: '#2563EB',
  light: '#93C5FD',
  white: '#FFFFFF',
  dark: '#1E40AF',
  accent: '#3B82F6',
};

// ==================== MODULE ILLUSTRATIONS ====================

export function EarthCompassPin({ size = 80, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none" className={className}>
      {/* Earth circle */}
      <circle cx="40" cy="40" r="24" stroke={colors.primary} strokeWidth="2" />
      {/* Latitude */}
      <ellipse cx="40" cy="40" rx="24" ry="10" stroke={colors.light} strokeWidth="1.5" />
      {/* Longitude */}
      <line x1="40" y1="16" x2="40" y2="64" stroke={colors.light} strokeWidth="1.5" />
      {/* Compass needle */}
      <path d="M40 30L36 40H44L40 30Z" fill={colors.primary} />
      <path d="M40 50L36 40H44L40 50Z" fill={colors.light} />
      {/* Location pin */}
      <circle cx="40" cy="40" r="3" fill={colors.primary} />
    </svg>
  );
}

export function GlobeCertificate({ size = 80, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none" className={className}>
      {/* Globe */}
      <circle cx="32" cy="35" r="18" stroke={colors.primary} strokeWidth="2" />
      <ellipse cx="32" cy="35" rx="18" ry="7" stroke={colors.light} strokeWidth="1.5" />
      <line x1="14" y1="35" x2="50" y2="35" stroke={colors.light} strokeWidth="1.5" />
      {/* Compass */}
      <path d="M32 28L29 35H35L32 28Z" fill={colors.primary} />
      {/* Checkmark */}
      <circle cx="60" cy="20" r="12" stroke={colors.primary} strokeWidth="2" />
      <path d="M55 20L58.5 23.5L65 17" stroke={colors.primary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      {/* Ribbon */}
      <path d="M62 28V38L58 35L54 38V28" stroke={colors.light} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function UZMapTarget({ size = 80, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none" className={className}>
      {/* Uzbekistan outline (simplified) */}
      <path d="M20 30C24 28 30 26 36 28C42 30 48 28 54 30C58 32 60 36 58 40C56 44 52 46 48 48C44 50 38 50 34 48C30 46 26 44 22 40C20 38 18 34 20 30Z" stroke={colors.primary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      {/* Route line */}
      <path d="M28 38L35 35L42 40L50 36" stroke={colors.light} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="3 2" />
      {/* Navigation arrow */}
      <path d="M50 36L46 34M50 36L48 40" stroke={colors.primary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      {/* Target point */}
      <circle cx="35" cy="35" r="3" fill={colors.primary} />
      <circle cx="35" cy="35" r="7" stroke={colors.light} strokeWidth="1.5" />
    </svg>
  );
}

export function MountainFlagMedal({ size = 80, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none" className={className}>
      {/* Mountains */}
      <path d="M8 56L24 32L32 42L40 28L52 44L58 36L72 56" stroke={colors.primary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M24 32V24" stroke={colors.light} strokeWidth="2" strokeLinecap="round" />
      {/* Flag */}
      <path d="M24 24L32 22L24 20" fill={colors.primary} />
      <line x1="24" y1="20" x2="24" y2="16" stroke={colors.primary} strokeWidth="2" strokeLinecap="round" />
      {/* Medal circle */}
      <circle cx="56" cy="44" r="8" stroke={colors.primary} strokeWidth="2" />
      <circle cx="56" cy="44" r="4" fill={colors.light} />
      {/* Compass indicator */}
      <path d="M56 40V48M52 44H60" stroke={colors.light} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function ShieldCheckDocument({ size = 80, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none" className={className}>
      {/* Shield */}
      <path d="M40 14L20 22V38C20 50 28 60 40 66C52 60 60 50 60 38V22L40 14Z" stroke={colors.primary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      {/* Checkmark */}
      <path d="M34 40L38 44L46 36" stroke={colors.primary} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      {/* Document lines */}
      <line x1="30" y1="30" x2="50" y2="30" stroke={colors.light} strokeWidth="1.5" strokeLinecap="round" />
      <line x1="30" y1="36" x2="44" y2="36" stroke={colors.light} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function AtlasBook({ size = 80, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none" className={className}>
      {/* Book base */}
      <path d="M16 22V62L40 54L64 62V22L40 14L16 22Z" stroke={colors.primary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      {/* Pages */}
      <path d="M40 14V54" stroke={colors.light} strokeWidth="1.5" />
      {/* Small globe on book */}
      <circle cx="40" cy="36" r="8" stroke={colors.primary} strokeWidth="1.5" />
      <ellipse cx="40" cy="36" rx="8" ry="3" stroke={colors.light} strokeWidth="1" />
      <line x1="32" y1="36" x2="48" y2="36" stroke={colors.light} strokeWidth="1" />
      {/* Bookmark */}
      <path d="M60 24L56 22L56 30" stroke={colors.primary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function AtlasBookPDF({ size = 80, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none" className={className}>
      {/* Open atlas */}
      <path d="M10 24L40 16L70 24V62L40 54L10 62V24Z" stroke={colors.primary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M40 16V54" stroke={colors.light} strokeWidth="1.5" />
      {/* Map inside */}
      <path d="M22 38L28 32L34 38L40 30L48 36L52 30L58 38" stroke={colors.light} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      {/* Bookmark */}
      <path d="M62 24V38L66 36V24" stroke={colors.primary} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function NotebookCompass({ size = 80, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none" className={className}>
      {/* Notebook */}
      <rect x="16" y="12" width="32" height="52" rx="3" stroke={colors.primary} strokeWidth="2" />
      <line x1="16" y1="22" x2="48" y2="22" stroke={colors.light} strokeWidth="1.5" />
      <line x1="16" y1="30" x2="48" y2="30" stroke={colors.light} strokeWidth="1.5" />
      <line x1="16" y1="38" x2="36" y2="38" stroke={colors.light} strokeWidth="1.5" />
      {/* Compass on side */}
      <circle cx="60" cy="40" r="14" stroke={colors.primary} strokeWidth="2" />
      <path d="M60 30L56 40H64L60 30Z" fill={colors.primary} />
      <path d="M60 50L56 40H64L60 50Z" fill={colors.light} />
      {/* Pen */}
      <line x1="16" y1="58" x2="38" y2="58" stroke={colors.primary} strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function TargetQuestionGlobe({ size = 80, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none" className={className}>
      {/* Globe */}
      <circle cx="35" cy="38" r="18" stroke={colors.primary} strokeWidth="2" />
      <ellipse cx="35" cy="38" rx="18" ry="6" stroke={colors.light} strokeWidth="1.5" />
      <line x1="17" y1="38" x2="53" y2="38" stroke={colors.light} strokeWidth="1.5" />
      {/* Location pin */}
      <circle cx="35" cy="38" r="3" fill={colors.primary} />
      {/* Question mark */}
      <circle cx="60" cy="22" r="10" stroke={colors.primary} strokeWidth="2" />
      <path d="M57 20C57 18 59 17 60 17C62 17 63 18 63 20C63 22 60 22 60 24" stroke={colors.primary} strokeWidth="2" strokeLinecap="round" />
      <circle cx="60" cy="27" r="1" fill={colors.primary} />
    </svg>
  );
}

export function PuzzleMap({ size = 80, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none" className={className}>
      {/* Puzzle piece 1 */}
      <path d="M16 28C16 24 20 22 24 24C26 20 32 20 34 24C38 22 42 24 42 28L42 36H16V28Z" stroke={colors.primary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      {/* Puzzle piece 2 */}
      <path d="M16 40H42V48C42 52 38 54 34 52C32 56 26 56 24 52C20 54 16 52 16 48V40Z" stroke={colors.light} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      {/* Map lines */}
      <line x1="20" y1="32" x2="38" y2="32" stroke={colors.primary} strokeWidth="1" strokeLinecap="round" />
      <line x1="22" y1="44" x2="36" y2="44" stroke={colors.primary} strokeWidth="1" strokeLinecap="round" />
      {/* Compass */}
      <circle cx="62" cy="56" r="12" stroke={colors.primary} strokeWidth="1.5" />
      <path d="M62 48L58 56H66L62 48Z" fill={colors.primary} />
    </svg>
  );
}

export function PodiumGlobe({ size = 80, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none" className={className}>
      {/* Podium */}
      <rect x="12" y="44" width="16" height="22" rx="2" stroke={colors.primary} strokeWidth="2" />
      <rect x="30" y="34" width="16" height="32" rx="2" stroke={colors.primary} strokeWidth="2" />
      <rect x="48" y="40" width="16" height="26" rx="2" stroke={colors.light} strokeWidth="2" />
      {/* Number 1 */}
      <text x="38" y="52" textAnchor="middle" fill={colors.primary} fontSize="14" fontWeight="bold">1</text>
      {/* Small globe */}
      <circle cx="60" cy="32" r="8" stroke={colors.primary} strokeWidth="1.5" />
      <ellipse cx="60" cy="32" rx="8" ry="3" stroke={colors.light} strokeWidth="1" />
    </svg>
  );
}

export function MedalCompassStar({ size = 80, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none" className={className}>
      {/* Medal ribbon */}
      <path d="M40 20L32 10H48L40 20Z" stroke={colors.primary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M40 20V30" stroke={colors.light} strokeWidth="2" strokeLinecap="round" />
      {/* Medal circle */}
      <circle cx="40" cy="44" r="16" stroke={colors.primary} strokeWidth="2" />
      {/* Star inside */}
      <path d="M40 34L42 40H48L43 44L45 50L40 46L35 50L37 44L32 40H38L40 34Z" fill={colors.light} />
      {/* Compass in background */}
      <circle cx="40" cy="44" r="10" stroke={colors.light} strokeWidth="1" />
    </svg>
  );
}

export function ChartGlobe({ size = 80, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none" className={className}>
      {/* Bar chart */}
      <rect x="14" y="38" width="10" height="24" rx="2" stroke={colors.primary} strokeWidth="2" />
      <rect x="28" y="28" width="10" height="34" rx="2" stroke={colors.primary} strokeWidth="2" />
      <rect x="42" y="32" width="10" height="30" rx="2" stroke={colors.light} strokeWidth="2" />
      {/* Growth arrow */}
      <path d="M14 54L20 48L28 52L36 44" stroke={colors.primary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M30 44H36V50" stroke={colors.primary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      {/* Small globe */}
      <circle cx="58" cy="30" r="10" stroke={colors.primary} strokeWidth="1.5" />
      <ellipse cx="58" cy="30" rx="10" ry="3.5" stroke={colors.light} strokeWidth="1" />
    </svg>
  );
}

export function UserLocationCompass({ size = 80, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none" className={className}>
      {/* User */}
      <circle cx="28" cy="28" r="10" stroke={colors.primary} strokeWidth="2" />
      <path d="M16 54C16 46 22 40 28 40C34 40 40 46 40 54" stroke={colors.primary} strokeWidth="2" strokeLinecap="round" />
      {/* Location pin */}
      <path d="M56 36C56 28 64 26 64 34C64 42 56 50 56 50C56 50 48 42 48 34C48 26 56 28 56 36Z" stroke={colors.primary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="56" cy="34" r="3" fill={colors.primary} />
      {/* Compass ring */}
      <circle cx="56" cy="34" r="14" stroke={colors.light} strokeWidth="1.5" />
    </svg>
  );
}

export function GearCompassGrid({ size = 80, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none" className={className}>
      {/* Gear */}
      <circle cx="32" cy="36" r="14" stroke={colors.primary} strokeWidth="2" />
      <circle cx="32" cy="36" r="6" stroke={colors.light} strokeWidth="2" />
      <path d="M32 20V22M32 50V52M18 36H20M44 36H46M21 25L22.5 26.5M41.5 45.5L43 47M21 47L22.5 45.5M41.5 26.5L43 25" stroke={colors.primary} strokeWidth="2" strokeLinecap="round" />
      {/* Compass */}
      <path d="M60 24L56 34H64L60 24Z" fill={colors.light} />
      {/* Grid dots */}
      <circle cx="62" cy="54" r="2" fill={colors.primary} />
      <circle cx="68" cy="60" r="2" fill={colors.light} />
      <circle cx="56" cy="60" r="2" fill={colors.light} />
    </svg>
  );
}

export function SearchMapPin({ size = 80, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none" className={className}>
      {/* Magnifying glass */}
      <circle cx="28" cy="30" r="14" stroke={colors.primary} strokeWidth="2" />
      <line x1="38" y1="40" x2="48" y2="50" stroke={colors.primary} strokeWidth="2" strokeLinecap="round" />
      {/* Map */}
      <path d="M52 36L64 28V54L52 62V36Z" stroke={colors.light} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      {/* Pin */}
      <circle cx="58" cy="38" r="8" stroke={colors.primary} strokeWidth="2" />
      <circle cx="58" cy="38" r="3" fill={colors.primary} />
    </svg>
  );
}

export function BellGlobe({ size = 80, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none" className={className}>
      {/* Bell */}
      <path d="M36 22C36 20 44 20 44 22L52 40C52 42 54 44 54 44H26C26 44 28 42 28 40L36 22Z" stroke={colors.primary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="36" y1="48" x2="44" y2="48" stroke={colors.primary} strokeWidth="2" strokeLinecap="round" />
      <path d="M38 48C38 50 40 52 42 48" stroke={colors.primary} strokeWidth="2" strokeLinecap="round" />
      {/* Small globe */}
      <circle cx="60" cy="28" r="8" stroke={colors.light} strokeWidth="1.5" />
      <ellipse cx="60" cy="28" rx="8" ry="3" stroke={colors.primary} strokeWidth="1" />
    </svg>
  );
}

export function SunCompassMountain({ size = 80, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none" className={className}>
      {/* Sun */}
      <circle cx="28" cy="28" r="10" stroke={colors.primary} strokeWidth="2" />
      <line x1="28" y1="14" x2="28" y2="10" stroke={colors.primary} strokeWidth="2" strokeLinecap="round" />
      <line x1="28" y1="46" x2="28" y2="50" stroke={colors.primary} strokeWidth="2" strokeLinecap="round" />
      <line x1="14" y1="28" x2="10" y2="28" stroke={colors.primary} strokeWidth="2" strokeLinecap="round" />
      <line x1="46" y1="28" x2="50" y2="28" stroke={colors.primary} strokeWidth="2" strokeLinecap="round" />
      <line x1="18" y1="18" x2="15" y2="15" stroke={colors.primary} strokeWidth="2" strokeLinecap="round" />
      <line x1="38" y1="38" x2="41" y2="41" stroke={colors.primary} strokeWidth="2" strokeLinecap="round" />
      {/* Mountain */}
      <path d="M38 58L48 42L54 50L60 38L72 58" stroke={colors.primary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      {/* Flag on peak */}
      <line x1="60" y1="38" x2="60" y2="32" stroke={colors.primary} strokeWidth="2" strokeLinecap="round" />
      <path d="M60 32L66 34L60 36" fill={colors.light} />
      {/* Compass */}
      <circle cx="48" cy="42" r="4" stroke={colors.light} strokeWidth="1.5" />
    </svg>
  );
}

export function CalendarRouteFlag({ size = 80, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none" className={className}>
      {/* Calendar */}
      <rect x="16" y="22" width="32" height="36" rx="3" stroke={colors.primary} strokeWidth="2" />
      <line x1="16" y1="34" x2="48" y2="34" stroke={colors.light} strokeWidth="1.5" />
      <line x1="24" y1="16" x2="24" y2="22" stroke={colors.primary} strokeWidth="2" strokeLinecap="round" />
      <line x1="40" y1="16" x2="40" y2="22" stroke={colors.primary} strokeWidth="2" strokeLinecap="round" />
      {/* Route line */}
      <path d="M52 40C56 38 60 42 64 38" stroke={colors.light} strokeWidth="2" strokeLinecap="round" />
      {/* Flag */}
      <line x1="64" y1="38" x2="64" y2="28" stroke={colors.primary} strokeWidth="2" strokeLinecap="round" />
      <path d="M64 30L72 28L64 26" fill={colors.primary} />
    </svg>
  );
}

export function CircularPathFlag({ size = 80, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none" className={className}>
      {/* Circular path */}
      <circle cx="40" cy="40" r="24" stroke={colors.primary} strokeWidth="2" strokeDasharray="4 3" />
      {/* Progress arc */}
      <path d="M40 16A24 24 0 0 1 64 40" stroke={colors.light} strokeWidth="2" strokeLinecap="round" />
      {/* Flag at finish */}
      <line x1="64" y1="40" x2="64" y2="28" stroke={colors.primary} strokeWidth="2" strokeLinecap="round" />
      <path d="M64 30L72 28L64 26" fill={colors.light} />
      {/* Start marker */}
      <circle cx="40" cy="16" r="3" fill={colors.primary} />
    </svg>
  );
}

export function PodiumEarthFlag({ size = 80, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none" className={className}>
      {/* Podium steps */}
      <rect x="12" y="46" width="16" height="20" rx="2" stroke={colors.primary} strokeWidth="2" />
      <rect x="30" y="36" width="16" height="30" rx="2" stroke={colors.primary} strokeWidth="2" />
      <rect x="48" y="42" width="16" height="24" rx="2" stroke={colors.light} strokeWidth="2" />
      {/* Earth */}
      <circle cx="38" cy="38" r="6" stroke={colors.light} strokeWidth="1.5" />
      <ellipse cx="38" cy="38" rx="6" ry="2" stroke={colors.primary} strokeWidth="1" />
      {/* Flag */}
      <line x1="56" y1="24" x2="56" y2="16" stroke={colors.primary} strokeWidth="2" strokeLinecap="round" />
      <path d="M56 18L62 16L56 14" fill={colors.light} />
      {/* Compass */}
      <circle cx="56" cy="24" r="4" stroke={colors.light} strokeWidth="1.5" />
    </svg>
  );
}

export function CertificateRibbonGlobe({ size = 80, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none" className={className}>
      {/* Certificate */}
      <rect x="16" y="18" width="32" height="44" rx="3" stroke={colors.primary} strokeWidth="2" />
      <circle cx="32" cy="38" r="10" stroke={colors.light} strokeWidth="1.5" />
      {/* Checkmark */}
      <path d="M27 38L31 42L38 34" stroke={colors.primary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      {/* Ribbon */}
      <path d="M16 56L12 60H20L16 56Z" fill={colors.light} />
      <path d="M48 56L52 60H44L48 56Z" fill={colors.light} />
      {/* Globe watermark */}
      <circle cx="56" cy="26" r="12" stroke={colors.light} strokeWidth="1" opacity="0.4" />
      <ellipse cx="56" cy="26" rx="12" ry="4" stroke={colors.primary} strokeWidth="1" opacity="0.4" />
    </svg>
  );
}

export function BookmarkAtlas({ size = 80, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none" className={className}>
      {/* Bookmark */}
      <path d="M48 14V50L40 44L32 50V14H48Z" stroke={colors.primary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      {/* Atlas pages */}
      <path d="M20 24C20 24 24 28 32 28C40 28 44 24 44 24V52C44 52 40 48 32 48C24 48 20 52 20 52V24Z" stroke={colors.light} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      {/* Map line */}
      <line x1="26" y1="32" x2="38" y2="32" stroke={colors.primary} strokeWidth="1.5" strokeLinecap="round" />
      <line x1="28" y1="38" x2="36" y2="38" stroke={colors.primary} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function ClockCompassRoute({ size = 80, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none" className={className}>
      {/* Clock */}
      <circle cx="32" cy="36" r="16" stroke={colors.primary} strokeWidth="2" />
      <line x1="32" y1="36" x2="32" y2="26" stroke={colors.primary} strokeWidth="2" strokeLinecap="round" />
      <line x1="32" y1="36" x2="40" y2="36" stroke={colors.primary} strokeWidth="2" strokeLinecap="round" />
      {/* Compass */}
      <circle cx="60" cy="28" r="8" stroke={colors.light} strokeWidth="1.5" />
      <path d="M60 22L57 28H63L60 22Z" fill={colors.light} />
      {/* Route line */}
      <path d="M48 44C52 40 56 44 60 40" stroke={colors.primary} strokeWidth="2" strokeLinecap="round" strokeDasharray="3 2" />
    </svg>
  );
}

// ==================== GEOGRAPHY SPECIFIC SVGS ====================

export function SimpleGlobe({ size = 40, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" className={className}>
      <circle cx="20" cy="20" r="14" stroke={colors.primary} strokeWidth="2" />
      <ellipse cx="20" cy="20" rx="14" ry="5" stroke={colors.light} strokeWidth="1.5" />
      <line x1="6" y1="20" x2="34" y2="20" stroke={colors.light} strokeWidth="1.5" />
    </svg>
  );
}

export function CompassIcon({ size = 40, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" className={className}>
      <circle cx="20" cy="20" r="14" stroke={colors.primary} strokeWidth="2" />
      <path d="M20 10L16 20H24L20 10Z" fill={colors.primary} />
      <path d="M20 30L16 20H24L20 30Z" fill={colors.light} />
    </svg>
  );
}

export function MapPinIcon({ size = 40, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" className={className}>
      <path d="M20 10C14 10 12 15 12 18C12 24 20 32 20 32C20 32 28 24 28 18C28 15 26 10 20 10Z" stroke={colors.primary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="20" cy="18" r="4" fill={colors.primary} />
    </svg>
  );
}

export function TopographicMap({ size = 80, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none" className={className}>
      <rect x="12" y="12" width="56" height="56" rx="4" stroke={colors.primary} strokeWidth="2" />
      {/* Topographic lines */}
      <path d="M18 36C24 30 30 38 36 34C42 30 48 40 54 34C60 28 66 36 68 32" stroke={colors.light} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M18 44C24 38 30 46 36 42C42 38 48 48 54 42C60 36 66 44 68 40" stroke={colors.light} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M18 52C24 46 30 54 36 50C42 46 48 56 54 50C60 44 66 52 68 48" stroke={colors.light} strokeWidth="1.5" strokeLinecap="round" />
      {/* Mountain peak */}
      <path d="M36 34L32 40L40 40L36 34Z" fill={colors.primary} />
    </svg>
  );
}

export function CoordinatesGrid({ size = 80, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none" className={className}>
      {/* Grid */}
      <line x1="20" y1="20" x2="20" y2="60" stroke={colors.light} strokeWidth="1.5" />
      <line x1="40" y1="20" x2="40" y2="60" stroke={colors.primary} strokeWidth="1.5" />
      <line x1="60" y1="20" x2="60" y2="60" stroke={colors.light} strokeWidth="1.5" />
      <line x1="20" y1="20" x2="60" y2="20" stroke={colors.light} strokeWidth="1.5" />
      <line x1="20" y1="40" x2="60" y2="40" stroke={colors.primary} strokeWidth="1.5" />
      <line x1="20" y1="60" x2="60" y2="60" stroke={colors.light} strokeWidth="1.5" />
      {/* Center dot */}
      <circle cx="40" cy="40" r="3" fill={colors.primary} />
      {/* Labels */}
      <text x="16" y="18" fill={colors.primary} fontSize="8" fontWeight="bold">N</text>
      <text x="62" y="64" fill={colors.light} fontSize="8">S</text>
    </svg>
  );
}

export function SatelliteOrbit({ size = 80, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none" className={className}>
      {/* Orbit path */}
      <ellipse cx="40" cy="40" rx="30" ry="16" stroke={colors.light} strokeWidth="2" />
      {/* Earth */}
      <circle cx="40" cy="40" r="12" stroke={colors.primary} strokeWidth="2" />
      <ellipse cx="40" cy="40" rx="12" ry="4" stroke={colors.light} strokeWidth="1.5" />
      {/* Satellite */}
      <rect x="8" y="24" width="8" height="6" rx="1.5" stroke={colors.primary} strokeWidth="1.5" />
      <line x1="12" y1="24" x2="12" y2="18" stroke={colors.primary} strokeWidth="1.5" strokeLinecap="round" />
      <line x1="14" y1="30" x2="18" y2="34" stroke={colors.light} strokeWidth="1.5" strokeLinecap="round" />
      <line x1="10" y1="30" x2="6" y2="34" stroke={colors.light} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function NavigationArrow({ size = 40, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" className={className}>
      <path d="M20 6L14 24L20 20L26 24L20 6Z" fill={colors.primary} />
      <line x1="20" y1="20" x2="20" y2="30" stroke={colors.primary} strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function MountainsRiver({ size = 80, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none" className={className}>
      {/* Mountains */}
      <path d="M6 56L20 34L28 44L36 28L46 42L52 32L74 56" stroke={colors.primary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M36 28L36 22" stroke={colors.light} strokeWidth="2" strokeLinecap="round" />
      {/* River */}
      <path d="M36 38C32 42 28 46 30 50C32 54 38 52 40 56C42 60 34 62 36 66" stroke={colors.light} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function CountryBorder({ size = 80, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none" className={className}>
      {/* Country shape (simplified Uzbekistan) */}
      <path d="M16 34C20 30 28 28 34 30C40 32 46 30 52 32C56 34 60 36 58 40C56 44 52 46 48 48C44 50 38 50 34 48C30 46 24 44 22 40C20 38 18 36 16 34Z" stroke={colors.primary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      {/* Flag marker */}
      <line x1="34" y1="30" x2="34" y2="18" stroke={colors.primary} strokeWidth="2" strokeLinecap="round" />
      <path d="M34 20L42 18L34 16" fill={colors.light} />
      {/* Border dots */}
      <circle cx="16" cy="34" r="2" fill={colors.primary} />
      <circle cx="28" cy="28" r="2" fill={colors.light} />
      <circle cx="52" cy="32" r="2" fill={colors.light} />
      <circle cx="48" cy="48" r="2" fill={colors.primary} />
    </svg>
  );
}

export function MapExplorer({ size = 80, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none" className={className}>
      {/* Map folded */}
      <path d="M16 20L40 16L64 20V56L40 52L16 56V20Z" stroke={colors.primary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="40" y1="16" x2="40" y2="52" stroke={colors.light} strokeWidth="1.5" />
      {/* Map details */}
      <path d="M24 30L30 24L36 30L42 26L48 32" stroke={colors.light} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      {/* Pin */}
      <circle cx="42" cy="26" r="4" stroke={colors.primary} strokeWidth="1.5" />
      <circle cx="42" cy="26" r="1.5" fill={colors.primary} />
    </svg>
  );
}

// ==================== EMPTY STATE ILLUSTRATIONS ====================

export function EmptyGlobeFlag({ size = 80, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none" className={className}>
      <circle cx="40" cy="36" r="16" stroke={colors.light} strokeWidth="2" strokeDasharray="3 3" />
      <line x1="40" y1="20" x2="40" y2="12" stroke={colors.primary} strokeWidth="2" strokeLinecap="round" />
      <path d="M40 14L46 12L40 10" fill={colors.light} />
      <line x1="24" y1="36" x2="56" y2="36" stroke={colors.light} strokeWidth="1.5" />
      <text x="40" y="62" textAnchor="middle" fill={colors.light} fontSize="10" fontWeight="medium">?</text>
    </svg>
  );
}

export function EmptyClosedAtlas({ size = 80, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none" className={className}>
      <path d="M20 22L40 18L60 22V56L40 52L20 56V22Z" stroke={colors.light} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.5" />
      <line x1="40" y1="18" x2="40" y2="52" stroke={colors.light} strokeWidth="1.5" opacity="0.5" />
      <text x="40" y="50" textAnchor="middle" fill={colors.primary} fontSize="10">?</text>
    </svg>
  );
}

export function EmptyPodium({ size = 80, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none" className={className}>
      <rect x="16" y="44" width="12" height="18" rx="2" stroke={colors.light} strokeWidth="2" opacity="0.4" />
      <rect x="32" y="36" width="12" height="26" rx="2" stroke={colors.light} strokeWidth="2" opacity="0.4" />
      <rect x="48" y="40" width="12" height="22" rx="2" stroke={colors.light} strokeWidth="2" opacity="0.4" />
      <text x="38" y="52" textAnchor="middle" fill={colors.light} fontSize="12">?</text>
    </svg>
  );
}

export function EmptyBookmark({ size = 80, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none" className={className}>
      <path d="M40 16L32 12H48L40 16Z" stroke={colors.light} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.5" />
      <path d="M24 24C24 24 28 28 36 28C44 28 48 24 48 24V52C48 52 44 48 36 48C28 48 24 52 24 52V24Z" stroke={colors.light} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.5" />
      <text x="40" y="42" textAnchor="middle" fill={colors.primary} fontSize="10">?</text>
    </svg>
  );
}

export function EmptyBellGlobe({ size = 80, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none" className={className}>
      <path d="M36 24C36 22 44 22 44 24L52 40C52 42 54 44 54 44H26C26 44 28 42 28 40L36 24Z" stroke={colors.light} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.5" />
      <line x1="36" y1="48" x2="44" y2="48" stroke={colors.light} strokeWidth="2" strokeLinecap="round" opacity="0.5" />
      <circle cx="60" cy="26" r="8" stroke={colors.light} strokeWidth="1.5" opacity="0.4" />
      <text x="40" y="60" textAnchor="middle" fill={colors.primary} fontSize="10">?</text>
    </svg>
  );
}

export function EmptyCompassMap({ size = 80, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none" className={className}>
      <circle cx="40" cy="40" r="20" stroke={colors.light} strokeWidth="2" strokeDasharray="3 3" opacity="0.5" />
      <path d="M40 24L36 34H44L40 24Z" fill={colors.light} opacity="0.3" />
      <text x="40" y="48" textAnchor="middle" fill={colors.primary} fontSize="10">?</text>
    </svg>
  );
}

// ==================== EXPORT ALL ====================

export const ModuleIllustrations = {
  home: EarthCompassPin,
  milliySertifikat: GlobeCertificate,
  dtm: UZMapTarget,
  olympiad: MountainFlagMedal,
  attestation: ShieldCheckDocument,
  library: AtlasBook,
  pdfBooks: AtlasBookPDF,
  articles: NotebookCompass,
  quiz: TargetQuestionGlobe,
  visualGames: PuzzleMap,
  rankings: PodiumGlobe,
  achievements: MedalCompassStar,
  statistics: ChartGlobe,
  profile: UserLocationCompass,
  settings: GearCompassGrid,
  search: SearchMapPin,
  notifications: BellGlobe,
  dailyChallenge: SunCompassMountain,
  streak: CalendarRouteFlag,
  progress: CircularPathFlag,
  leaderboard: PodiumEarthFlag,
  certificates: CertificateRibbonGlobe,
  saved: BookmarkAtlas,
  history: ClockCompassRoute,
};

export const GeographySVGs = {
  globe: SimpleGlobe,
  compass: CompassIcon,
  mapPin: MapPinIcon,
  topographic: TopographicMap,
  coordinates: CoordinatesGrid,
  satellite: SatelliteOrbit,
  navigation: NavigationArrow,
  mountains: MountainsRiver,
  countryBorder: CountryBorder,
  mapExplorer: MapExplorer,
};

export const EmptyStateIllustrations = {
  noTests: EmptyGlobeFlag,
  noBooks: EmptyClosedAtlas,
  noRankings: EmptyPodium,
  noSaved: EmptyBookmark,
  noNotifications: EmptyBellGlobe,
  noQuizToday: EmptyCompassMap,
};

// Helper to get module illustration component by module name
export function getModuleIllustration(moduleName, { size = 80, className = '' } = {}) {
  const Illustration = ModuleIllustrations[moduleName];
  if (!Illustration) return null;
  return <Illustration size={size} className={className} />;
}