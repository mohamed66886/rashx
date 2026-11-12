import { NextRequest, NextResponse } from 'next/server';
import { getAdmin } from '@/server/auth/session';
import { getInvoice } from '@/server/data/invoices';
import { getAdminStorageBucket } from '@/server/firebase-admin';
import { generateInvoicePdf } from '@/server/pdf/invoice-pdf';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const admin = await getAdmin(false);
    if (!admin || !['super_admin', 'platform_engineer', 'sales_director'].includes(admin.role)) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const { id } = await params;
    const invoice = await getInvoice(id);

    if (!invoice) {
      return new NextResponse('Invoice not found', { status: 404 });
    }

    let fileBuffer: Buffer | null = null;
    let sha256 = invoice.pdf?.sha256;

    if (invoice.pdf?.path) {
      const bucket = getAdminStorageBucket();
      const file = bucket.file(invoice.pdf.path);
      const [exists] = await file.exists();

      if (exists) {
        const [downloaded] = await file.download();
        fileBuffer = downloaded;
      }
    }

    // If PDF was not in storage (e.g. legacy/draft or local dev), generate dynamically
    if (!fileBuffer) {
      const genResult = await generateInvoicePdf(invoice);
      fileBuffer = genResult.buffer;
      sha256 = genResult.sha256;
    }

    const docNumber = invoice.number || `draft-${id}`;
    const filename = `${docNumber}.pdf`;

    return new NextResponse(new Uint8Array(fileBuffer), {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `inline; filename="${filename}"`,
        'Cache-Control': 'private, no-transform, max-age=3600',
        'X-Content-Type-Options': 'nosniff',
        'ETag': sha256 ? `"${sha256}"` : '"dynamic"',
      },
    });
  } catch (error) {
    console.error('[invoice-pdf-route] Error:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

