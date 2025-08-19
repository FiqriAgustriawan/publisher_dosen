import { Appearance, useAppearance } from '@/hooks/use-appearance';
import { cn } from '@/lib/utils';
import { LucideIcon, Monitor, Moon, Sun, Loader2 } from 'lucide-react';
import { HTMLAttributes, useState } from 'react';

interface AppearanceToggleTabProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'navbar' | 'icons-only';
  showLabels?: boolean;
}

export default function AppearanceToggleTab({
  className = '',
  variant = 'default',
  showLabels = true,
  ...props
}: AppearanceToggleTabProps) {
  const { appearance, updateAppearance } = useAppearance();
  const [isChanging, setIsChanging] = useState(false);

  const tabs: { value: Appearance; icon: LucideIcon; label: string }[] = [
    { value: 'light', icon: Sun, label: 'Light' },
    { value: 'dark', icon: Moon, label: 'Dark' },
    { value: 'system', icon: Monitor, label: 'System' },
  ];

  const handleThemeChange = (value: Appearance) => {
    if (value === appearance || isChanging) return;

    setIsChanging(true);
    updateAppearance(value);
  };

  const baseClasses = 'inline-flex gap-1 rounded-lg p-1';
  const variantClasses = {
    default: 'bg-neutral-100 dark:bg-neutral-800',
    navbar: 'bg-white/10 dark:bg-black/20 backdrop-blur-sm',
    'icons-only': 'bg-white/10 dark:bg-black/20 backdrop-blur-sm'
  };

  // Jika variant icons-only, override showLabels menjadi false
  const displayLabels = variant === 'icons-only' ? false : showLabels;

  return (
    <div
      className={cn(
        baseClasses,
        variantClasses[variant],
        isChanging && 'opacity-50 pointer-events-none',
        className
      )}
      {...props}
    >
      {tabs.map(({ value, icon: Icon, label }) => (
        <button
          key={value}
          onClick={() => handleThemeChange(value)}
          disabled={isChanging}
          title={label} // Tooltip untuk accessibility
          className={cn(
            'flex items-center rounded-md transition-colors relative',
            displayLabels ? 'px-3.5 py-1.5' : 'p-2', // Padding berbeda untuk icon-only
            appearance === value
              ? variant === 'navbar' || variant === 'icons-only'
                ? 'bg-white/20 shadow-xs text-white dark:bg-white/10 dark:text-white'
                : 'bg-white shadow-xs dark:bg-neutral-700 dark:text-neutral-100'
              : variant === 'navbar' || variant === 'icons-only'
                ? 'text-white/70 hover:bg-white/10 hover:text-white dark:text-white/60 dark:hover:bg-white/5'
                : 'text-neutral-500 hover:bg-neutral-200/60 hover:text-black dark:text-neutral-400 dark:hover:bg-neutral-700/60',
            isChanging && 'cursor-not-allowed'
          )}
        >
          {isChanging && appearance === value ? (
            <Loader2 className={cn("animate-spin", displayLabels ? "-ml-1 h-4 w-4" : "h-4 w-4")} />
          ) : (
            <Icon className={cn(displayLabels ? "-ml-1 h-4 w-4" : "h-4 w-4")} />
          )}
          {displayLabels && (
            <span className="ml-1.5 text-sm">{label}</span>
          )}
        </button>
      ))}
    </div>
  );
}
