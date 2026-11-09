'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { MessageSquare, X } from 'lucide-react';
import { DrawerModal } from '@/components/ui/modal';
import { Chat } from './Chat';
import type { ChatProps } from './types';

export interface FloatingChatWidgetProps extends Partial<ChatProps> {
  position?: 'bottom-left' | 'bottom-right';
  badgeCount?: number;
  launcherAnimojiId?: number;
  defaultOpen?: boolean;
  drawerPlacement?: 'right' | 'left';
}

export const FloatingChatWidget: React.FC<FloatingChatWidgetProps> = ({
  position = 'bottom-left',
  badgeCount = 1,
  launcherAnimojiId = 138,
  defaultOpen = false,
  drawerPlacement = 'left',
  ...chatProps
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const [unread, setUnread] = useState(badgeCount);

  const isLeft = position === 'bottom-left';

  const handleOpen = () => {
    setUnread(0);
    setIsOpen(true);
  };

  return (
    <>
      {/* 1. Side Modal from @/components/ui/modal with Fullscreen on Mobile */}
      <DrawerModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        placement={drawerPlacement}
        width="w-full sm:max-w-md md:max-w-lg"
        fullScreenMobile={true}
        showCloseButton={false}
        contentClassName="p-0 h-full flex flex-col overflow-hidden bg-white"
        className="h-full max-sm:inset-0 max-sm:w-full max-sm:h-full max-sm:rounded-none max-sm:border-none"
      >
        <Chat
          {...chatProps}
          height="h-full"
          className="border-none rounded-none shadow-none flex-1"
          onClose={() => setIsOpen(false)}
        />
      </DrawerModal>

      {/* 2. Floating Launcher Button */}
      <div
        className={`fixed z-[9980] ${
          isLeft ? 'left-6 bottom-6' : 'right-6 bottom-6'
        }`}
        dir="rtl"
      >
        <button
          type="button"
          onClick={handleOpen}
          className="group relative w-14 h-14 rounded-full bg-[#91B8C0] hover:bg-[#7fa4ac] active:bg-[#70959d] text-black shadow-lg hover:shadow-xl transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center cursor-pointer select-none"
          aria-label="فتح المحادثة المباشرة"
        >
          {launcherAnimojiId ? (
            <div className="relative w-11 h-11 rounded-full overflow-hidden">
              <Image
                src={`/animojis/animoji-${launcherAnimojiId}.png`}
                alt="المحادثة المباشرة"
                width={44}
                height={44}
                className="object-cover"
                unoptimized
              />
            </div>
          ) : (
            <MessageSquare className="w-6 h-6 text-black fill-current" />
          )}

          {/* Online Pulsing Indicator */}
          <span className="absolute bottom-0.5 right-0.5 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-white ring-2 ring-emerald-400/40" />

          {/* Unread Counter Badge */}
          {unread > 0 && (
            <span className="absolute -top-1 -right-1 px-1.5 py-0.5 min-w-[20px] h-5 rounded-full bg-red-600 text-white font-extrabold text-[10px] flex items-center justify-center shadow-xs border-2 border-white animate-bounce">
              {unread}
            </span>
          )}
        </button>
      </div>
    </>
  );
};

export default FloatingChatWidget;
