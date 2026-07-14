import { cn } from '../../lib/utils';

export function ProgressBar({ value = 0, className, color, size = 'md', showLabel = false, ...props }) {
  const clampedValue = Math.min(100, Math.max(0, value));
  const sizes = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-3.5',
  };

  return (
    <div className={cn('w-full', className)} {...props}>
      <div className={cn('w-full bg-[var(--border)] rounded-full overflow-hidden', sizes[size])}>
        <div
          className={cn('h-full rounded-full transition-all duration-700 ease-out', sizes[size])}
          style={{
            width: `${clampedValue}%`,
            background: color || 'var(--primary)',
          }}
        />
      </div>
      {showLabel && (
        <span className="text-xs text-[var(--text-secondary)] mt-1 block text-right font-medium">
          {Math.round(clampedValue)}%
        </span>
      )}
    </div>
  );
}

export function CircularProgress({ value = 0, size = 60, strokeWidth = 5, color, className }) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (Math.min(100, Math.max(0, value)) / 100) * circumference;

  return (
    <div className={cn('relative inline-flex items-center justify-center', className)}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="var(--border)"
          strokeWidth={strokeWidth}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color || 'var(--primary)'}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-700 ease-out"
        />
      </svg>
      <span className="absolute text-xs font-bold" style={{ color: color || 'var(--primary)' }}>
        {Math.round(value)}%
      </span>
    </div>
  );
}