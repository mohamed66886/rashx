'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  Check,
  CheckCheck,
  Play,
  Pause,
  FileText,
  Download,
  Sparkles,
} from 'lucide-react';
import { Avatar } from '@/components/ui/Avatar';
import type { ChatMessage, QuickReply } from './types';

export interface ChatMessageItemProps {
  message: ChatMessage;
  onQuickReplyClick?: (reply: QuickReply) => void;
  dir?: 'rtl' | 'ltr';
}

export const ChatMessageItem: React.FC<ChatMessageItemProps> = ({
  message,
  onQuickReplyClick,
  dir = 'rtl',
}) => {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const isUser = message.senderType === 'user';
  const isSystem = message.senderType === 'system';
  const isBot = message.senderType === 'bot';

  // Format timestamp (e.g. 10:42 ص)
  const formatTime = (ts: string | Date) => {
    try {
      const d = typeof ts === 'string' ? new Date(ts) : ts;
      if (isNaN(d.getTime())) return ts.toString();
      return d.toLocaleTimeString('ar-SA', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      });
    } catch {
      return '';
    }
  };

  // System Message (Centered Notification)
  if (isSystem) {
    return (
      <div className="flex justify-center my-3 select-none">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E5E9E8]/70 border border-[#E5E9E8] text-[11px] font-medium text-[#5E6665]">
          <Sparkles className="w-3 h-3 text-[#91B8C0]" />
          <span>{message.text}</span>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`flex items-end gap-2.5 my-3 ${
        isUser ? 'flex-row-reverse' : 'flex-row'
      }`}
      dir={dir}
    >
      {/* Avatar (for Bot / Agent) */}
      {!isUser && (
        <div className="shrink-0 mb-1">
          {message.animojiId ? (
            <div className="relative w-8 h-8 rounded-full overflow-hidden bg-[#91B8C0]/20 border border-[#91B8C0]/40">
              <Image
                src={`/animojis/animoji-${message.animojiId}.png`}
                alt={message.senderName || 'Avatar'}
                width={32}
                height={32}
                className="object-cover"
                unoptimized
              />
            </div>
          ) : message.avatar ? (
            <Avatar
              src={message.avatar}
              name={message.senderName || 'Agent'}
              size="sm"
            />
          ) : (
            <div className="w-8 h-8 rounded-full bg-[#91B8C0]/20 text-[#2a515a] font-bold text-xs flex items-center justify-center border border-[#91B8C0]/40">
              {message.senderName ? message.senderName.slice(0, 1) : 'آ'}
            </div>
          )}
        </div>
      )}

      {/* Message Bubble Container */}
      <div
        className={`max-w-[85%] sm:max-w-[75%] flex flex-col ${
          isUser ? 'items-end' : 'items-start'
        }`}
      >
        {/* Sender Name (for Bot/Agent in group) */}
        {!isUser && message.senderName && (
          <span className="text-[11px] font-bold text-[#5E6665] mb-1 px-1">
            {message.senderName}
            {isBot && (
              <span className="mr-1.5 px-1.5 py-0.2 rounded text-[9px] bg-[#91B8C0]/20 text-[#295159] font-bold">
                ذكاء اصطناعي
              </span>
            )}
          </span>
        )}

        {/* Bubble */}
        <div
          className={`relative px-4 py-3 rounded-2xl shadow-2xs transition-all text-sm leading-relaxed ${
            isUser
              ? 'bg-[#91B8C0] text-black rounded-bl-sm font-medium'
              : 'bg-white border border-[#E5E9E8] text-black rounded-br-sm'
          }`}
          style={!isUser ? { backgroundColor: '#ffffff' } : undefined}
        >
          {/* Voice Note Player Preview */}
          {message.isVoiceNote ? (
            <div className="flex items-center gap-3 min-w-[200px] py-1">
              <button
                type="button"
                onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 transition-transform active:scale-95 cursor-pointer ${
                  isUser
                    ? 'bg-black text-white hover:bg-zinc-800'
                    : 'bg-[#91B8C0] text-black hover:bg-[#7fa4ac]'
                }`}
                aria-label={isPlayingAudio ? 'إيقاف مؤقت' : 'تشغيل الرسالة الصوتية'}
              >
                {isPlayingAudio ? (
                  <Pause className="w-4 h-4 fill-current" />
                ) : (
                  <Play className="w-4 h-4 fill-current mr-0.5" />
                )}
              </button>

              {/* Sound Wave Bars Simulation */}
              <div className="flex-1 flex items-center gap-0.5 h-6">
                {[40, 70, 30, 90, 60, 100, 45, 80, 50, 85, 35, 75, 95, 60, 40].map(
                  (height, i) => (
                    <div
                      key={i}
                      className={`flex-1 rounded-full transition-all duration-300 ${
                        isPlayingAudio
                          ? 'animate-pulse bg-current'
                          : 'opacity-50 bg-current'
                      }`}
                      style={{
                        height: isPlayingAudio ? `${height}%` : '35%',
                        animationDelay: `${i * 70}ms`,
                      }}
                    />
                  )
                )}
              </div>

              <span className="text-xs font-mono font-bold shrink-0 opacity-80">
                {message.voiceDuration || '0:18'}
              </span>
            </div>
          ) : (
            /* Regular Text */
            <div className="whitespace-pre-wrap select-text">{message.text}</div>
          )}

          {/* Attachments Preview */}
          {message.attachments && message.attachments.length > 0 && (
            <div className="mt-2 space-y-1.5 pt-2 border-t border-black/10">
              {message.attachments.map((att) => (
                <div key={att.id}>
                  {att.type === 'image' ? (
                    <div className="relative rounded-xl overflow-hidden border border-black/10 max-w-sm mt-1">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={att.url}
                        alt={att.name}
                        className="w-full max-h-56 object-cover"
                      />
                    </div>
                  ) : (
                    <a
                      href={att.url}
                      download={att.name}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-between gap-3 p-2 rounded-xl bg-black/5 hover:bg-black/10 transition-colors text-xs font-semibold"
                    >
                      <div className="flex items-center gap-2 truncate">
                        <FileText className="w-4 h-4 shrink-0" />
                        <span className="truncate">{att.name}</span>
                      </div>
                      <Download className="w-3.5 h-3.5 shrink-0" />
                    </a>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Timestamp & Status Ticks */}
          <div
            className={`flex items-center gap-1.5 mt-1 text-[10px] select-none ${
              isUser ? 'justify-end text-black/70' : 'justify-end text-[#5E6665]'
            }`}
          >
            <span>{formatTime(message.timestamp)}</span>
            {isUser && message.status && (
              <span className="inline-flex items-center">
                {message.status === 'read' ? (
                  <CheckCheck className="w-3.5 h-3.5 text-blue-700 stroke-[2.5]" />
                ) : message.status === 'delivered' ? (
                  <CheckCheck className="w-3.5 h-3.5 opacity-70" />
                ) : message.status === 'sent' ? (
                  <Check className="w-3.5 h-3.5 opacity-70" />
                ) : (
                  <span className="w-2 h-2 rounded-full border border-black/60 border-t-transparent animate-spin" />
                )}
              </span>
            )}
          </div>
        </div>

        {/* Quick Action Suggestions / Reply Chips */}
        {message.quickReplies && message.quickReplies.length > 0 && (
          <div className="flex flex-wrap items-center gap-1.5 mt-2">
            {message.quickReplies.map((reply) => (
              <button
                key={reply.id}
                type="button"
                onClick={() => onQuickReplyClick && onQuickReplyClick(reply)}
                className="px-3 py-1.5 rounded-full text-xs font-bold bg-white hover:bg-[#91B8C0]/15 active:bg-[#91B8C0]/30 text-black border border-[#E5E9E8] hover:border-[#91B8C0] shadow-2xs transition-all cursor-pointer"
              >
                {reply.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatMessageItem;

