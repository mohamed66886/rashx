'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { MessageSquare, Sparkles } from 'lucide-react';
import { ChatMessageItem } from './ChatMessageItem';
import type { ChatMessage, QuickReply, ChatUser } from './types';

export interface ChatMessageListProps {
  messages: ChatMessage[];
  isTyping?: boolean;
  typingUser?: ChatUser;
  onQuickReplyClick?: (reply: QuickReply) => void;
  emptyTitle?: string;
  emptySubtitle?: string;
  dir?: 'rtl' | 'ltr';
  className?: string;
}

export const ChatMessageList: React.FC<ChatMessageListProps> = ({
  messages,
  isTyping = false,
  typingUser,
  onQuickReplyClick,
  emptyTitle = 'مرحباً بك في المحادثة المباشرة',
  emptySubtitle = 'اطرح استفسارك، احجز موعدك، أو استعلم عن فواتيرك وسيتم الرد عليك فوراً.',
  dir = 'rtl',
  className = '',
}) => {
  const bottomRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom smoothly on message change or typing
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  return (
    <div
      className={`flex-1 overflow-y-auto px-4 py-4 space-y-2 select-text ${className}`}
      dir={dir}
    >
      {/* Empty State */}
      {messages.length === 0 ? (
        <div className="h-full min-h-[280px] flex flex-col items-center justify-center text-center p-6 select-none">
          <div className="w-16 h-16 rounded-3xl bg-[#91B8C0]/20 flex items-center justify-center text-[#2a515a] mb-4 border border-[#91B8C0]/30 shadow-2xs">
            <MessageSquare className="w-8 h-8" />
          </div>
          <h4 className="text-base font-bold text-black tracking-tight mb-1">
            {emptyTitle}
          </h4>
          <p className="text-xs text-[#5E6665] max-w-xs leading-relaxed">
            {emptySubtitle}
          </p>
        </div>
      ) : (
        /* Messages Stream */
        messages.map((msg) => (
          <ChatMessageItem
            key={msg.id}
            message={msg}
            onQuickReplyClick={onQuickReplyClick}
            dir={dir}
          />
        ))
      )}

      {/* Typing Indicator */}
      {isTyping && (
        <div className="flex items-center gap-2.5 my-2 select-none" dir={dir}>
          <div className="w-8 h-8 rounded-full overflow-hidden bg-[#91B8C0]/20 border border-[#91B8C0]/40 flex items-center justify-center shrink-0">
            {typingUser?.animojiId ? (
              <Image
                src={`/animojis/animoji-${typingUser.animojiId}.png`}
                alt="Typing"
                width={32}
                height={32}
                className="object-cover"
                unoptimized
              />
            ) : (
              <Sparkles className="w-4 h-4 text-[#29515a]" />
            )}
          </div>
          <div className="px-4 py-3 rounded-2xl rounded-bl-sm bg-white border border-[#E5E9E8] shadow-2xs inline-flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#91B8C0] animate-bounce [animation-delay:-0.3s]" />
            <span className="w-2 h-2 rounded-full bg-[#91B8C0] animate-bounce [animation-delay:-0.15s]" />
            <span className="w-2 h-2 rounded-full bg-[#91B8C0] animate-bounce" />
            <span className="text-[11px] text-[#5E6665] mr-1 font-medium">
              {typingUser?.name ? `${typingUser.name} يكتب الآن...` : 'يكتب الآن...'}
            </span>
          </div>
        </div>
      )}

      <div ref={bottomRef} />
    </div>
  );
};

export default ChatMessageList;

