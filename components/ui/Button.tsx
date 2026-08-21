'use client';

import { cn } from '@/lib/utils';
import { forwardRef } from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  fullWidth?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      loading = false,
      fullWidth = false,
      className,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const base =
      'inline-flex items-center justify-center gap-2 font-semibold rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed select-none';

    const variants = {
      primary:
        'bg-gradient-to-r from-[#d4838e] to-[#b5616e] text-white hover:from-[#c57280] hover:to-[#a05060] hover:-translate-y-0.5 hover:shadow-lg hover:shadow-rose-200/50 focus-visible:ring-rose-400',
      outline:
        'border-2 border-[#d4838e] text-[#d4838e] bg-transparent hover:bg-[#d4838e] hover:text-white hover:-translate-y-0.5 hover:shadow-lg hover:shadow-rose-200/50 focus-visible:ring-rose-400',
      ghost:
        'bg-transparent text-[#5a4040] hover:bg-[#fbe8ec] hover:text-[#d4838e] focus-visible:ring-rose-300',
      danger:
        'bg-red-500 text-white hover:bg-red-600 hover:-translate-y-0.5 focus-visible:ring-red-400',
    };

    const sizes = {
      sm: 'text-xs px-4 py-2',
      md: 'text-sm px-6 py-2.5',
      lg: 'text-base px-8 py-3.5',
    };

    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(base, variants[variant], sizes[size], fullWidth && 'w-full', className)}
        {...props}
      >
        {loading ? (
          <>
            <svg
              className="animate-spin h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              />
            </svg>
            <span>Loading...</span>
          </>
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
