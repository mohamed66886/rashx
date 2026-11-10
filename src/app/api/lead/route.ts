import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

// Simple in-memory rate limiting map (IP -> timestamps)
const rateLimitMap = new Map<string, number[]>();

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_REQUESTS_PER_WINDOW = 5;

// Validation Schema using Zod
const LeadSchema = z.object({
  fullName: z.string().trim().min(2, 'الاسم يجب أن يحتوي على حرفين على الأقل'),
  phone: z
    .string()
    .trim()
    .regex(/^(?:(?:\+?966)|0)?5\d{8}$/, 'رقم الجوال يجب أن يكون رقمًا سعوديًا صحيحًا'),
  facilityName: z.string().trim().min(2, 'اسم المنشأة مطلوب'),
  facilityType: z.string().trim().min(1, 'نوع المنشأة مطلوب'),
  city: z.string().trim().min(1, 'المدينة مطلوبة'),
  branches: z.string().trim().min(1, 'عدد الفروع مطلوب'),
  preferredTime: z.enum(['morning', 'evening', 'any']).optional().default('morning'),
  message: z.string().optional().default(''),
  websiteUrlHoneypot: z.string().max(0, 'Bot detected').optional().default(''),
  locale: z.enum(['ar', 'en']).optional().default('ar'),
});

export async function POST(req: NextRequest) {
  try {
    // 1. Rate Limiting Check
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown-ip';
    const now = Date.now();
    const timestamps = rateLimitMap.get(ip) || [];
    const validTimestamps = timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW_MS);

    if (validTimestamps.length >= MAX_REQUESTS_PER_WINDOW) {
      return NextResponse.json(
        {
          error:
            'تم تجاوز الحد المسموح من الطلبات. يرجى الانتظار بضع دقائق قبل المحاولة مجددًا.',
        },
        { status: 429 }
      );
    }

    validTimestamps.push(now);
    rateLimitMap.set(ip, validTimestamps);

    // 2. Parse & Validate Payload
    const body = await req.json();
    const parsed = LeadSchema.safeParse(body);

    if (!parsed.success) {
      const firstIssue = parsed.error.issues[0]?.message || 'بيانات غير صالحة';
      return NextResponse.json({ error: firstIssue }, { status: 400 });
    }

    const {
      fullName,
      phone,
      facilityName,
      facilityType,
      city,
      branches,
      preferredTime,
      message,
      websiteUrlHoneypot,
      locale,
    } = parsed.data;

    // 3. Honeypot Check (Silently drop bot submissions)
    if (websiteUrlHoneypot && websiteUrlHoneypot.length > 0) {
      return NextResponse.json({ success: true, message: 'Received' });
    }

    // 4. In a production environment with DB/Email credentials:
    // Here we log the lead submission or send to webhook / email / Telegram notification
    console.log('[RASHX LEAD CAPTURED]', {
      timestamp: new Date().toISOString(),
      fullName,
      phone,
      facilityName,
      facilityType,
      city,
      branches,
      preferredTime,
      message,
      locale,
      ip,
    });

    return NextResponse.json(
      {
        success: true,
        message:
          locale === 'ar'
            ? 'تم تسجيل طلبك بنجاح. سيتواصل معك مستشار راش إكس قريبًا.'
            : 'Your request has been successfully submitted.',
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    console.error('[RASHX LEAD API ERROR]', error);
    return NextResponse.json(
      { error: 'حدث خطأ في معالجة الطلب. يرجى المحاولة لاحقًا.' },
      { status: 500 }
    );
  }
}

