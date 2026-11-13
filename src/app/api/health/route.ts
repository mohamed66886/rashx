import { NextResponse } from 'next/server';

export const instant = false;

export async function GET() {
  const firebaseAdmin = Boolean(
    process.env.FIREBASE_PROJECT_ID &&
    process.env.FIREBASE_CLIENT_EMAIL &&
    process.env.FIREBASE_PRIVATE_KEY
  );
  const smtp = Boolean(process.env.SMTP_USER && process.env.SMTP_PASS);
  const siteUrl = Boolean(process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL);
  const ok = Boolean(firebaseAdmin);

  return NextResponse.json(
    {
      ok,
      firebaseAdmin,
      smtp,
      siteUrl,
    },
    {
      status: 200,
      headers: {
        'Cache-Control': 'no-store, max-age=0',
      },
    }
  );
}
