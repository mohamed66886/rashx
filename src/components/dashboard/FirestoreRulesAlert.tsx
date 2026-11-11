'use client';

import React, { useState, useEffect } from 'react';
import {
  ShieldAlert,
  ExternalLink,
  Copy,
  Check,
  RefreshCw,
  Database,
  CheckCircle2,
} from 'lucide-react';
import { firebaseConfig } from '@/lib/firebase/config';
import { checkFirestoreWritePermission, syncAllLocalDataToFirestore } from '@/lib/firebase/firestore';

export function FirestoreRulesAlert() {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [copied, setCopied] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [syncSuccess, setSyncSuccess] = useState(false);

  const rulesCode = `rules_version = '2';\nservice cloud.firestore {\n  match /databases/{database}/documents {\n    match /{document=**} {\n      allow read, write: if true;\n    }\n  }\n}`;
  const rulesUrl = `https://console.firebase.google.com/project/${firebaseConfig.projectId}/firestore/rules`;

  const runCheck = async () => {
    setSyncing(true);
    try {
      const res = await checkFirestoreWritePermission();
      setHasPermission(res.permitted);
      if (res.permitted) {
        // Automatically sync all local data to Firestore
        await syncAllLocalDataToFirestore();
        setSyncSuccess(true);
        setTimeout(() => setSyncSuccess(false), 5000);
      }
    } finally {
      setSyncing(false);
    }
  };

  useEffect(() => {
    runCheck();
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(rulesCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  // If already permitted and no warning needed, show subtle green indicator
  if (hasPermission === true && !syncSuccess) {
    return null;
  }

  if (syncSuccess) {
    return (
      <div className="p-4 rounded-3xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-800 text-xs flex items-center justify-between animate-fadeIn">
        <div className="flex items-center gap-2 font-bold">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>تم الاتصال ومزامنة جميع البيانات في قاعدة بيانات Firebase Firestore السحابية بنجاح!</span>
        </div>
        <span className="font-mono text-[10px] text-emerald-700 font-black">200 OK</span>
      </div>
    );
  }

  return (
    <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent border border-amber-500/30 text-amber-950 text-xs shadow-sm animate-fadeIn">
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-500/20 text-amber-700 flex items-center justify-center shrink-0 mt-0.5">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h4 className="font-black text-sm text-[#0D1514]">
                تنبيه هام لحفظ البيانات في فايربيز الحقيقي (Firebase Console Rules)
              </h4>
              <span className="px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-900 font-mono text-[10px] font-bold">
                Permission Denied
              </span>
            </div>
            <p className="text-xs text-[#5E6665] leading-relaxed max-w-2xl">
              خوادم جوجل فايربيز ترفض الكتابة حالياً لأن قواعد أمان Firestore في مشروعك (<strong>{firebaseConfig.projectId}</strong>) تشترط وجود Firebase Authentication الافتراضي. لكي يتم الحفظ مباشرة في السحابة بدون Firebase Auth، يلزم فتح القواعد مرة واحدة في كونسول فايربيز.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 shrink-0">
          <a
            href={rulesUrl}
            target="_blank"
            rel="noreferrer"
            className="px-3.5 py-2 rounded-xl bg-[#0D1514] hover:bg-[#1A2524] text-white font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
          >
            <span>فتح صفحة القواعد في Firebase Console</span>
            <ExternalLink className="w-3.5 h-3.5 text-[#91B8C0]" />
          </a>

          <button
            type="button"
            onClick={runCheck}
            disabled={syncing}
            className="px-3.5 py-2 rounded-xl bg-white hover:bg-[#F8FAFB] border border-[#E5E9E8] text-[#0D1514] font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${syncing ? 'animate-spin' : ''}`} />
            <span>مزامنة البيانات الآن</span>
          </button>
        </div>
      </div>

      {/* Rules Code Snippet */}
      <div className="mt-4 pt-4 border-t border-amber-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white/70 p-3.5 rounded-2xl border">
        <div className="font-mono text-[11px] text-[#0D1514]" dir="ltr">
          allow read, write: if true;
        </div>

        <button
          type="button"
          onClick={handleCopy}
          className="px-3 py-1.5 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-900 font-bold text-xs flex items-center gap-1.5 cursor-pointer transition-colors shrink-0"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
          <span>{copied ? 'تم نسخ كود القواعد!' : 'نسخ كود القواعد الكامل'}</span>
        </button>
      </div>
    </div>
  );
}

