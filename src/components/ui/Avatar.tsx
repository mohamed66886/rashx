'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { User } from 'lucide-react';

export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
export type AvatarStatus = 'online' | 'offline' | 'busy' | 'away';

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  animojiId?: number | string;
  alt?: string;
  name?: string;
  size?: AvatarSize;
  status?: AvatarStatus;
  rounded?: 'full' | 'xl' | '2xl';
}

const sizeClasses: Record<
  AvatarSize,
  { box: string; text: string; icon: string; status: string }
> = {
  xs: {
    box: 'w-6 h-6',
    text: 'text-[10px]',
    icon: 'w-3 h-3',
    status: 'w-1.5 h-1.5 ring-1',
  },
  sm: {
    box: 'w-8 h-8',
    text: 'text-xs',
    icon: 'w-4 h-4',
    // ring-1.5 is not a Tailwind class → arbitrary value
    status: 'w-2 h-2 ring-[1.5px]',
  },
  md: {
    box: 'w-10 h-10',
    text: 'text-sm',
    icon: 'w-5 h-5',
    status: 'w-2.5 h-2.5 ring-2',
  },
  lg: {
    box: 'w-12 h-12',
    text: 'text-base',
    icon: 'w-6 h-6',
    status: 'w-3 h-3 ring-2',
  },
  xl: {
    box: 'w-16 h-16',
    text: 'text-xl',
    icon: 'w-8 h-8',
    status: 'w-4 h-4 ring-2',
  },
  '2xl': {
    box: 'w-24 h-24',
    text: 'text-3xl',
    icon: 'w-12 h-12',
    status: 'w-5 h-5 ring-[3px]',
  },
  '3xl': {
    box: 'w-32 h-32',
    text: 'text-4xl',
    icon: 'w-16 h-16',
    status: 'w-6 h-6 ring-4',
  },
};

const statusColors: Record<AvatarStatus, string> = {
  online: 'bg-emerald-500',
  offline: 'bg-gray-400',
  busy: 'bg-red-500',
  away: 'bg-amber-400',
};

const roundedClasses = {
  full: 'rounded-full',
  xl: 'rounded-xl',
  '2xl': 'rounded-2xl',
};

/* The dot sits ON the circle edge for round avatars (a plain corner position
   would fall outside the circle), and on the corner for squared ones. */
const statusPosition = {
  full: 'bottom-[6%] start-[6%]',
  xl: '-bottom-0.5 -start-0.5',
  '2xl': '-bottom-0.5 -start-0.5',
};

function getInitials(name?: string): string {
  if (!name) return '';
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) {
    return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
  }
  return name.slice(0, 2).toUpperCase();
}

export const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  (
    {
      src,
      animojiId,
      alt = '',
      name,
      size = 'md',
      status,
      rounded = 'full',
      className = '',
      ...props
    },
    ref
  ) => {
    // Remember WHICH src failed (not just "something failed"), so changing
    // the src later gives the new image a fresh chance to load.
    const [failedSrc, setFailedSrc] = useState<string | undefined>();
    const config = sizeClasses[size];
    const initials = getInitials(name);
    const resolvedSrc = animojiId ? `/avatars/animoji-${animojiId}.png` : src;
    const hasError = !!resolvedSrc && failedSrc === resolvedSrc;

    return (
      <div
        ref={ref}
        // no overflow-hidden here: the image clips itself with its own radius,
        // which lets the status dot sit on the edge without being cut off
        className={`relative inline-flex items-center justify-center shrink-0 border border-[#E5E9E8] bg-[#E5E9E8]/40 text-black font-bold select-none ${
          config.box
        } ${roundedClasses[rounded]} ${className}`}
        {...props}
      >
        {resolvedSrc && !hasError ? (
          <Image
            src={resolvedSrc}
            alt={alt || name || 'صورة المستخدم'}
            fill
            unoptimized
            className={`object-cover ${roundedClasses[rounded]}`}
            onError={() => setFailedSrc(resolvedSrc)}
          />
        ) : initials ? (
          <span className={`${config.text} font-semibold text-black`}>
            {initials}
          </span>
        ) : (
          <User className={`${config.icon} text-[#5E6665]`} />
        )}

        {status && (
          <span
            aria-hidden="true"
            className={`absolute z-10 rounded-full ring-white ${
              statusPosition[rounded]
            } ${config.status} ${statusColors[status]}`}
          />
        )}
      </div>
    );
  }
);
Avatar.displayName = 'Avatar';

export interface AvatarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  max?: number;
  size?: AvatarSize;
  children: React.ReactNode;
}

export const AvatarGroup: React.FC<AvatarGroupProps> = ({
  max = 4,
  size = 'md',
  className = '',
  children,
  ...props
}) => {
  const childrenArray = React.Children.toArray(children);
  const visible = childrenArray.slice(0, max);
  const remaining = childrenArray.length - max;
  const config = sizeClasses[size];

  return (
    <div
      className={`inline-flex items-center -space-x-2.5 rtl:space-x-reverse ${className}`}
      {...props}
    >
      {visible.map((child, idx) => (
        <div key={idx} className="relative ring-2 ring-white rounded-full">
          {child}
        </div>
      ))}
      {remaining > 0 && (
        <div
          className={`relative inline-flex items-center justify-center bg-[#E5E9E8] text-black font-bold ring-2 ring-white rounded-full ${config.box} ${config.text}`}
        >
          +{remaining}
        </div>
      )}
    </div>
  );
};

export default Avatar;