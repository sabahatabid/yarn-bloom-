import { cn } from '@/lib/utils';

interface BadgeProps {
  label: string;
  variant?: 'rose' | 'sage' | 'brown' | 'cream' | 'sale';
  className?: string;
}

export default function Badge({ label, variant = 'rose', className }: BadgeProps) {
  const variants = {
    rose: 'bg-[#fbe8ec] text-[#b5616e]',
    sage: 'bg-[#c8dbc5] text-[#4a6e46]',
    brown: 'bg-[#e8d5cc] text-[#5a3a2e]',
    cream: 'bg-[#faf6f1] text-[#8b6355] border border-[#e8d5cc]',
    sale: 'bg-[#d4838e] text-white',
  };

  return (
    <span
      className={cn(
        'badge text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full',
        variants[variant],
        className
      )}
    >
      {label}
    </span>
  );
}
