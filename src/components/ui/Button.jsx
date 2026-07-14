import { forwardRef } from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cn } from '../../lib/utils';

const variants = {
  default: 'bg-[var(--primary)] text-white hover:bg-[var(--primary-hover)] shadow-sm',
  secondary: 'bg-[var(--primary-soft)] text-[var(--primary)] hover:bg-[var(--primary-soft)]/80',
  outline: 'border border-[var(--border)] bg-transparent hover:bg-[var(--background)] hover:border-[var(--primary)]',
  ghost: 'bg-transparent hover:bg-[var(--background)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]',
  danger: 'bg-[var(--danger)] text-white hover:opacity-90',
  success: 'bg-[var(--success)] text-white hover:opacity-90',
};

const sizes = {
  sm: 'h-9 px-3 text-xs rounded-[var(--radius-sm)]',
  default: 'h-10 px-4 text-sm rounded-[var(--radius-sm)]',
  lg: 'h-11 px-5 text-sm rounded-[var(--radius-sm)]',
  xl: 'h-12 px-6 text-base rounded-[var(--radius-sm)]',
  icon: 'h-10 w-10 rounded-[var(--radius-sm)]',
};

const Button = forwardRef(({
  className,
  variant = 'default',
  size = 'default',
  asChild = false,
  children,
  ...props
}, ref) => {
  const Comp = asChild ? Slot : 'button';
  return (
    <Comp
      className={cn(
        'inline-flex items-center justify-center gap-2 font-medium transition-all duration-150 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none cursor-pointer',
        variants[variant],
        sizes[size],
        className
      )}
      ref={ref}
      {...props}
    >
      {children}
    </Comp>
  );
});

Button.displayName = 'Button';
export default Button;