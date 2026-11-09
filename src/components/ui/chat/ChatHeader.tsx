'use client';

import React from 'react';
import Image from 'next/image';
import {
  MoreVertical,
  Phone,
  Trash2,
  Minimize2,
  Maximize2,
  X,
  Sparkles,
} from 'lucide-react';
import { Avatar } from '@/components/ui/Avatar';
import type { ChatUser } from './types';

export interface ChatHeaderProps {
  recipientUser?: ChatUser;
  title?: string;
  subtitle?: string;
  onClearChat?: () => void;
  onClose?: () => void;
  onMinimize?: () => void;
  isMinimized?: boolean;
  showActions?: boolean;
  dir?: 'rtl' | 'ltr';
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({
  recipientUser = {
    id: 'bot-1',
    name: 'المساعد الذكي (HLAQA AI)',
    role: 'خدمة العملاء والتشغيل',
    animojiId: 138,
    status: 'online',
  },
  title,
  subtitle,
  onClearChat,
  onClose,
  onMinimize,
  isMinimized = false,
  showActions = true,
  dir = 'rtl',
}) => {
  const displayTitle = title || recipientUser.name;
  const displaySubtitle =
    subtitle ||
    (recipientUser.status === 'online'
      ? 'متصل الآن • الرد فوري'
      : recipientUser.role || 'غير متصل');

  return (
    <div
      className="flex items-center justify-between px-5 py-4 border-b border-[#E5E9E8] bg-white rounded-t-2xl select-none"
      dir={dir}
    >
      {/* User Info */}
      <div className="flex items-center gap-3 min-w-0">
        <div className="relative shrink-0">
          {recipientUser.animojiId ? (
            <div className="relative w-10 h-10 rounded-full overflow-hidden bg-[#91B8C0]/25 border-2 border-[#91B8C0]/50 shadow-2xs">
              <Image
                src={`/animojis/animoji-${recipientUser.animojiId}.png`}
                alt={displayTitle}
                width={40}
                height={40}
                className="object-cover"
                unoptimized
              />
            </div>
          ) : recipientUser.avatar ? (
            <Avatar src={recipientUser.avatar} name={displayTitle} size="md" />
          ) : (
            <div className="w-10 h-10 rounded-full bg-[#91B8C0]/25 text-black font-bold text-sm flex items-center justify-center border border-[#91B8C0]/40">
              {displayTitle.slice(0, 1)}
            </div>
          )}

          {/* Online Indicator Green Dot */}
          {recipientUser.status === 'online' && (
            <span className="absolute bottom-0 left-0 w-3 h-3 rounded-full bg-emerald-500 border-2 border-white ring-1 ring-emerald-400/50" />
          )}
        </div>

        <div className="min-w-0 space-y-0.5">
          <div className="flex items-center gap-1.5 truncate">
            <h3 className="text-sm font-bold text-black tracking-tight truncate">
              {displayTitle}
            </h3>
            <span className="p-0.5 rounded text-[10px] bg-[#91B8C0]/20 text-[#254c54]">
              <Sparkles className="w-3 h-3" />
            </span>
          </div>
          <p className="text-[11px] text-[#5E6665] flex items-center gap-1.5 truncate">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>{displaySubtitle}</span>
          </p>
        </div>
      </div>

      {/* Action Controls */}
      {showActions && (
        <div className="flex items-center gap-1 shrink-0">
          {onClearChat && (
            <button
              type="button"
              onClick={onClearChat}
              className="p-1.5 rounded-xl text-[#5E6665] hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
              title="مسح سجل المحادثة"
              aria-label="مسح المحادثة"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}

          {onMinimize && (
            <button
              type="button"
              onClick={onMinimize}
              className="p-1.5 rounded-xl text-[#5E6665] hover:text-black hover:bg-[#E5E9E8]/60 transition-colors cursor-pointer"
              title={isMinimized ? 'توسيع' : 'تصغير'}
              aria-label={isMinimized ? 'توسيع' : 'تصغير'}
            >
              {isMinimized ? (
                <Maximize2 className="w-4 h-4" />
              ) : (
                <Minimize2 className="w-4 h-4" />
              )}
            </button>
          )}

          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-xl text-[#5E6665] hover:text-black hover:bg-[#E5E9E8]/60 transition-colors cursor-pointer"
              title="إغلاق المحادثة"
              aria-label="إغلاق"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default ChatHeader;

