import { NextResponse } from 'next/server';
import { firebaseConfig, FIRESTORE_BASE_URL } from '@/lib/firebase/config';

export async function GET() {
  const testUrl = `${FIRESTORE_BASE_URL}/platform_admins/test_connection?key=${firebaseConfig.apiKey}`;

  try {
    // Attempt write probe
    const res = await fetch(testUrl, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        fields: {
          probe: { stringValue: 'test_connection' },
          timestamp: { timestampValue: new Date().toISOString() },
        },
      }),
      cache: 'no-store',
    });

    if (res.ok) {
      return NextResponse.json({
        success: true,
        status: 200,
        message: 'قواعد Firestore مفتوحة والاتصال السحابي الحقيقي يعمل بنجاح 100%!',
      });
    }

    const errData = await res.json().catch(() => ({}));

    return NextResponse.json({
      success: false,
      status: res.status,
      error: errData?.error?.message || 'Permission Denied',
      rulesUrl: `https://console.firebase.google.com/project/${firebaseConfig.projectId}/firestore/rules`,
      suggestedRules: `rules_version = '2';\nservice cloud.firestore {\n  match /databases/{database}/documents {\n    match /{document=**} {\n      allow read, write: if true;\n    }\n  }\n}`,
    });
  } catch (err: any) {
    return NextResponse.json({
      success: false,
      error: err.message,
    });
  }
}

