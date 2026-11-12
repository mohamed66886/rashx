import { NextRequest, NextResponse } from 'next/server';
import { verifySigningToken } from '@/server/signing/verify';
import { getAdminStorageBucket } from '@/server/firebase-admin';
import { generateInvoicePdf } from '@/server/pdf/invoice-pdf';

export async function GET(req: NextRequest) {
  try {
    const token = req.nextUrl.searchParams.get('token');
    if (!token) {
      return new NextResponse('رابط التوقيع مفقود أو غير صالح.', {
        status: 403,
        headers: {
          'Content-Type': 'text/plain; charset=utf-8',
          'Cache-Control': 'no-store, max-age=0',
          'X-Robots-Tag': 'noindex, nofollow',
        },
      });
    }

    const verification = await verifySigningToken(token);
    if (!verification.valid || !verification.invoice) {
      return new NextResponse('رابط التوقيع غير صالح أو منتهي الصلاحية.', {
        status: 403,
        headers: {
          'Content-Type': 'text/plain; charset=utf-8',
          'Cache-Control': 'no-store, max-age=0',
          'X-Robots-Tag': 'noindex, nofollow',
        },
      });
    }

    const invoice = verification.invoice;
    let fileBuffer: Buffer | null = null;
    let sha256 = invoice.pdf?.sha256;

    if (invoice.pdf?.path) {
      try {
        const bucket = getAdminStorageBucket();
        const file = bucket.file(invoice.pdf.path);
        const [exists] = await file.exists();

        if (exists) {
          const [downloaded] = await file.download();
          fileBuffer = downloaded;
        }
      } catch (err) {
        console.warn('[sign/download] Failed to fetch stored PDF, will regenerate:', err);
      }
    }

    // Fallback: generate PDF dynamically if not stored
    if (!fileBuffer) {
      const genResult = await generateInvoicePdf(invoice);
      fileBuffer = genResult.buffer;
      sha256 = genResult.sha256;
    }

    const filename = `${invoice.number || 'contract'}.pdf`;

    return new NextResponse(new Uint8Array(fileBuffer), {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `inline; filename="${encodeURIComponent(filename)}"`,
        'Cache-Control': 'private, no-store, max-age=0',
        'X-Content-Type-Options': 'nosniff',
        'X-Robots-Tag': 'noindex, nofollow',
        'Referrer-Policy': 'no-referrer',
        'ETag': sha256 ? `"${sha256}"` : '"dynamic"',
      },
    });
  } catch (error: unknown) {
    if (
      error &&
      typeof error === 'object' &&
      'digest' in error &&
      typeof (error as { digest: string }).digest === 'string' &&
      (error as { digest: string }).digest.startsWith('NEXT_')
    ) {
      throw error;
    }
    console.error('[sign/download] Error serving PDF:', error);
    return new NextResponse('حدث خطأ أثناء تحميل المستند.', {
      status: 500,
      headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    });
  }
}
