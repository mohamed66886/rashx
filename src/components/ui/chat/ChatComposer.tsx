'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
  Send,
  Paperclip,
  Mic,
  Square,
  Smile,
  X,
  Sparkles,
} from 'lucide-react';

export interface ChatComposerProps {
  onSendMessage?: (text: string, attachments?: File[]) => void | Promise<void>;
  onSendVoiceNote?: (durationSeconds: number) => void | Promise<void>;
  placeholder?: string;
  disabled?: boolean;
  enableAttachments?: boolean;
  enableVoiceNotes?: boolean;
  quickSuggestions?: string[];
  onSuggestionClick?: (text: string) => void;
  dir?: 'rtl' | 'ltr';
}

export const ChatComposer: React.FC<ChatComposerProps> = ({
  onSendMessage,
  onSendVoiceNote,
  placeholder = 'اكتب رسالتك هنا... (اضغط Enter للإرسال)',
  disabled = false,
  enableAttachments = true,
  enableVoiceNotes = true,
  quickSuggestions = [
    'حجز موعد جديد ✂️',
    'الاستعلام عن الفاتورة 📄',
    'قائمة أسعار الخدمات 💈',
    'مواعيد العمل والفروع 📍',
  ],
  onSuggestionClick,
  dir = 'rtl',
}) => {
  const [text, setText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Recording Timer simulation
  useEffect(() => {
    if (isRecording) {
      setRecordingSeconds(0);
      timerRef.current = setInterval(() => {
        setRecordingSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRecording]);

  const handleSend = () => {
    if ((!text.trim() && selectedFiles.length === 0) || disabled) return;

    if (onSendMessage) {
      onSendMessage(
        text.trim(),
        selectedFiles.length > 0 ? selectedFiles : undefined
      );
    }

    setText('');
    setSelectedFiles([]);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFiles(Array.from(e.target.files));
    }
  };

  const handleStopRecordingAndSend = () => {
    if (onSendVoiceNote) {
      onSendVoiceNote(recordingSeconds || 1);
    }
    setIsRecording(false);
    setRecordingSeconds(0);
  };

  const handleCancelRecording = () => {
    setIsRecording(false);
    setRecordingSeconds(0);
  };

  return (
    <div className="border-t border-[#E5E9E8] bg-white p-3 space-y-2.5" dir={dir}>
      {/* Quick Suggestions Chips (if empty input) */}
      {!isRecording && text.length === 0 && quickSuggestions && quickSuggestions.length > 0 && (
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none select-none">
          <Sparkles className="w-3.5 h-3.5 text-[#91B8C0] shrink-0 mr-1" />
          {quickSuggestions.map((suggestion, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => {
                if (onSuggestionClick) {
                  onSuggestionClick(suggestion);
                } else {
                  setText(suggestion);
                }
              }}
              className="px-2.5 py-1 rounded-full text-xs font-semibold bg-[#FAFBFB] hover:bg-[#91B8C0]/15 active:bg-[#91B8C0]/30 text-black border border-[#E5E9E8] hover:border-[#91B8C0] transition-colors whitespace-nowrap cursor-pointer shrink-0"
            >
              {suggestion}
            </button>
          ))}
        </div>
      )}

      {/* Selected Files Preview Bar */}
      {selectedFiles.length > 0 && (
        <div className="flex items-center gap-2 overflow-x-auto p-2 rounded-xl bg-[#FAFBFB] border border-[#E5E9E8]">
          {selectedFiles.map((f, i) => (
            <div
              key={i}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white border border-[#E5E9E8] text-xs font-semibold"
            >
              <span className="truncate max-w-[140px]">{f.name}</span>
              <button
                type="button"
                onClick={() =>
                  setSelectedFiles(selectedFiles.filter((_, idx) => idx !== i))
                }
                className="text-[#5E6665] hover:text-black cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Input or Voice Recording Bar */}
      {isRecording ? (
        /* Recording Mode */
        <div className="flex items-center justify-between p-2 rounded-xl bg-red-50/60 border border-red-200 animate-fadeIn">
          <div className="flex items-center gap-2.5">
            <span className="w-3 h-3 rounded-full bg-red-600 animate-ping" />
            <span className="text-xs font-bold text-red-700">
              جارٍ تسجيل الرسالة الصوتية... ({Math.floor(recordingSeconds / 60)}:
              {(recordingSeconds % 60).toString().padStart(2, '0')})
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCancelRecording}
              className="px-3 py-1 rounded-lg text-xs font-semibold text-[#5E6665] hover:text-black hover:bg-white cursor-pointer"
            >
              إلغاء
            </button>
            <button
              type="button"
              onClick={handleStopRecordingAndSend}
              className="px-3.5 py-1.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Send className="w-3.5 h-3.5" />
              <span>إرسال الصوت</span>
            </button>
          </div>
        </div>
      ) : (
        /* Normal Composer Mode */
        <div className="flex items-end gap-2">
          {/* Attachment Button */}
          {enableAttachments && (
            <>
              <input
                ref={fileInputRef}
                type="file"
                multiple
                className="hidden"
                onChange={handleFileChange}
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={disabled}
                className="p-2.5 rounded-xl text-[#5E6665] hover:text-black hover:bg-[#E5E9E8]/60 active:bg-[#E5E9E8] transition-colors cursor-pointer shrink-0"
                aria-label="إرفاق ملف أو صورة"
              >
                <Paperclip className="w-5 h-5" />
              </button>
            </>
          )}

          {/* Text Area Input */}
          <div className="flex-1 relative">
            <textarea
              rows={1}
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={placeholder}
              disabled={disabled}
              className="w-full resize-none max-h-32 px-4 py-2.5 text-sm rounded-xl border border-[#E5E9E8] bg-white focus:border-[#91B8C0] focus:ring-2 focus:ring-[#91B8C0]/20 outline-none transition-all placeholder:text-[#5E6665]/60"
            />
          </div>

          {/* Mic Button (Voice Note) */}
          {enableVoiceNotes && text.length === 0 && selectedFiles.length === 0 && (
            <button
              type="button"
              onClick={() => setIsRecording(true)}
              disabled={disabled}
              className="p-2.5 rounded-xl text-[#5E6665] hover:text-black hover:bg-[#E5E9E8]/60 active:bg-[#E5E9E8] transition-colors cursor-pointer shrink-0"
              aria-label="تسجيل رسالة صوتية"
            >
              <Mic className="w-5 h-5" />
            </button>
          )}

          {/* Send Button */}
          {(text.trim().length > 0 || selectedFiles.length > 0) && (
            <button
              type="button"
              onClick={handleSend}
              disabled={disabled}
              className="p-2.5 rounded-xl bg-[#91B8C0] hover:bg-[#7fa4ac] active:bg-[#70959d] text-black font-bold transition-all transform active:scale-95 cursor-pointer shrink-0 shadow-xs"
              aria-label="إرسال الرسالة"
            >
              <Send className="w-5 h-5 rotate-180" />
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default ChatComposer;

