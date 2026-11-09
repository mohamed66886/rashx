'use client';

import React from 'react';

export type MessageSenderType = 'user' | 'agent' | 'system' | 'bot';
export type MessageStatus = 'sending' | 'sent' | 'delivered' | 'read';
export type UserStatus = 'online' | 'offline' | 'busy' | 'away';

export interface ChatUser {
  id: string;
  name: string;
  role?: string;
  avatar?: string;
  animojiId?: number;
  status?: UserStatus;
  isTyping?: boolean;
}

export interface ChatAttachment {
  id: string;
  name: string;
  url: string;
  type: 'image' | 'file' | 'audio';
  size?: string;
}

export interface QuickReply {
  id: string;
  label: string;
  action?: string;
  payload?: any;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  senderType: MessageSenderType;
  senderName?: string;
  avatar?: string;
  animojiId?: number;
  text: string;
  timestamp: string | Date;
  status?: MessageStatus;
  attachments?: ChatAttachment[];
  quickReplies?: QuickReply[];
  isVoiceNote?: boolean;
  voiceDuration?: string;
}

export interface ChatProps {
  messages?: ChatMessage[];
  currentUser?: ChatUser;
  recipientUser?: ChatUser;
  title?: string;
  subtitle?: string;
  placeholder?: string;
  onSendMessage?: (text: string, attachments?: File[]) => void | Promise<void>;
  onSendVoiceNote?: (durationSeconds: number) => void | Promise<void>;
  onQuickReplyClick?: (reply: QuickReply) => void;
  onClearChat?: () => void;
  onClose?: () => void;
  enableAttachments?: boolean;
  enableVoiceNotes?: boolean;
  enableQuickReplies?: boolean;
  showStatusIndicator?: boolean;
  isTyping?: boolean;
  className?: string;
  height?: string;
  dir?: 'rtl' | 'ltr';
  autoBotReply?: boolean;
}

