'use client';

import React, { useState, useEffect } from 'react';
import { ChatHeader } from './ChatHeader';
import { ChatMessageList } from './ChatMessageList';
import { ChatComposer } from './ChatComposer';
import type { ChatProps, ChatMessage, QuickReply } from './types';

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: 'msg-1',
    senderId: 'bot-1',
    senderType: 'bot',
    senderName: 'المساعد الذكي (HLAQA AI)',
    animojiId: 138,
    text: 'أهلاً بك في راش إكس (RASHX) لمنظومة الصالونات والحلاقة! 👋\nكيف يمكنني خدمتك اليوم؟ يمكنك حجز موعد، الاستعلام عن الفواتير، أو التعرف على باقات الصالون.',
    timestamp: new Date(Date.now() - 1000 * 60 * 5),
    status: 'read',
    quickReplies: [
      { id: 'qr-1', label: 'حجز موعد جديد ✂️', action: 'book' },
      { id: 'qr-2', label: 'الاستعلام عن الفاتورة 📄', action: 'invoice' },
      { id: 'qr-3', label: 'أسعار باقات الـ VIP 💈', action: 'pricing' },
    ],
  },
];

export const Chat: React.FC<ChatProps> = ({
  messages: propMessages,
  currentUser = { id: 'user-1', name: 'أنت' },
  recipientUser = {
    id: 'bot-1',
    name: 'المساعد الذكي (HLAQA AI)',
    role: 'خدمة العملاء والتشغيل',
    animojiId: 138,
    status: 'online',
  },
  title,
  subtitle,
  placeholder,
  onSendMessage,
  onSendVoiceNote,
  onQuickReplyClick,
  onClearChat,
  onClose,
  enableAttachments = true,
  enableVoiceNotes = true,
  isTyping: propTyping,
  className = '',
  height = 'h-[580px]',
  dir = 'rtl',
  autoBotReply = true,
}) => {
  const [internalMessages, setInternalMessages] =
    useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [internalTyping, setInternalTyping] = useState(false);

  const messages = propMessages || internalMessages;
  const isTyping = propTyping !== undefined ? propTyping : internalTyping;

  // Smart contextual bot reply simulator
  const handleBotReply = (userText: string) => {
    setInternalTyping(true);

    setTimeout(() => {
      setInternalTyping(false);

      let replyText =
        'تم استلام طلبك وسيقوم فريق الدعم الفني بمتابعة العملية فوراً. هل تحتاج إلى أي مساعدة أخرى؟';
      let quickReplies: QuickReply[] | undefined;

      const lower = userText.toLowerCase();

      if (lower.includes('حجز') || lower.includes('موعد')) {
        replyText =
          'يسعدنا خدمتك! يمكنك اختيار باقة الحلاقة أو العناية بالبشرة وتحديد الحلاق المفضل وسنقوم بتثبيت الموعد وإرسال تذكير SMS.';
        quickReplies = [
          { id: 'b-1', label: 'باقة VIP ملكية (140 ر.س)' },
          { id: 'b-2', label: 'حلاقة كلاسيكية (60 ر.س)' },
          { id: 'b-3', label: 'جلسة تنظيف بشرة (180 ر.س)' },
        ];
      } else if (lower.includes('فاتورة') || lower.includes('ضريب')) {
        replyText =
          'جميع فواتيرنا معتمدة ومطابقة 100% لهيئة الزكاة والضريبة والجمارك (ZATCA) مع كود الاستجابة السريع QR المشفر. هل تود استعراض فاتورة سابقة؟';
        quickReplies = [
          { id: 'inv-1', label: 'عرض آخر فاتورة ضريبية' },
          { id: 'inv-2', label: 'تحميل سند القبض الرقمي' },
        ];
      } else if (lower.includes('سعر') || lower.includes('اسعار') || lower.includes('باق')) {
        replyText =
          'تبدأ خدماتنا من 50 ر.س وتصل إلى 350 ر.س لباقات العريس المتكاملة شاملة الضريبة وضيافة القهوة السعودية.';
        quickReplies = [
          { id: 'p-1', label: 'حجز باقة العريس' },
          { id: 'p-2', label: 'قائمة الخدمات الفردية' },
        ];
      } else if (lower.includes('أهلاً') || lower.includes('مرحبا') || lower.includes('سلام')) {
        replyText =
          'أهلاً بك وسهلاً في راش اكس! يسعدنا تواجدك معنا اليوم. ما الخدمة التي ترغب بإنجازها؟';
      }

      const botMessage: ChatMessage = {
        id: `bot-${Date.now()}`,
        senderId: recipientUser.id,
        senderType: 'bot',
        senderName: recipientUser.name,
        animojiId: recipientUser.animojiId,
        avatar: recipientUser.avatar,
        text: replyText,
        timestamp: new Date(),
        status: 'read',
        quickReplies,
      };

      setInternalMessages((prev) => [...prev, botMessage]);
    }, 1200);
  };

  const handleSendMessage = async (text: string, files?: File[]) => {
    const newMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      senderId: currentUser.id,
      senderType: 'user',
      senderName: currentUser.name,
      text,
      timestamp: new Date(),
      status: 'sent',
      attachments: files?.map((f, i) => ({
        id: `att-${i}`,
        name: f.name,
        url: URL.createObjectURL(f),
        type: f.type.startsWith('image/') ? 'image' : 'file',
      })),
    };

    setInternalMessages((prev) => [...prev, newMessage]);

    // Mark as delivered
    setTimeout(() => {
      setInternalMessages((prev) =>
        prev.map((m) =>
          m.id === newMessage.id ? { ...m, status: 'delivered' } : m
        )
      );
    }, 500);

    if (onSendMessage) {
      await onSendMessage(text, files);
    }

    if (autoBotReply && !onSendMessage) {
      handleBotReply(text);
    }
  };

  const handleSendVoiceNote = async (durationSeconds: number) => {
    const voiceMsg: ChatMessage = {
      id: `voice-${Date.now()}`,
      senderId: currentUser.id,
      senderType: 'user',
      senderName: currentUser.name,
      text: 'تسجيل صوتي',
      timestamp: new Date(),
      status: 'delivered',
      isVoiceNote: true,
      voiceDuration: `0:${durationSeconds.toString().padStart(2, '0')}`,
    };

    setInternalMessages((prev) => [...prev, voiceMsg]);

    if (onSendVoiceNote) {
      await onSendVoiceNote(durationSeconds);
    }

    if (autoBotReply && !onSendVoiceNote) {
      setTimeout(() => {
        handleBotReply('استمعت إلى رسالتك الصوتية');
      }, 1000);
    }
  };

  const handleQuickReplyClick = (reply: QuickReply) => {
    handleSendMessage(reply.label);
    if (onQuickReplyClick) {
      onQuickReplyClick(reply);
    }
  };

  const handleClear = () => {
    setInternalMessages([]);
    if (onClearChat) {
      onClearChat();
    }
  };

  return (
    <div
      className={`flex flex-col bg-white border border-[#E5E9E8] rounded-2xl shadow-xs overflow-hidden ${height} ${className}`}
      style={{ backgroundColor: '#ffffff' }}
      dir={dir}
    >
      {/* Header */}
      <ChatHeader
        recipientUser={recipientUser}
        title={title}
        subtitle={subtitle}
        onClearChat={handleClear}
        onClose={onClose}
        dir={dir}
      />

      {/* Messages Stream */}
      <ChatMessageList
        messages={messages}
        isTyping={isTyping}
        typingUser={recipientUser}
        onQuickReplyClick={handleQuickReplyClick}
        dir={dir}
      />

      {/* Composer */}
      <ChatComposer
        onSendMessage={handleSendMessage}
        onSendVoiceNote={handleSendVoiceNote}
        onSuggestionClick={(s) => handleSendMessage(s)}
        placeholder={placeholder}
        enableAttachments={enableAttachments}
        enableVoiceNotes={enableVoiceNotes}
        dir={dir}
      />
    </div>
  );
};

export default Chat;

