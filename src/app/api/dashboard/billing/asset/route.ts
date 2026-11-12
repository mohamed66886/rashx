import { NextRequest, NextResponse } from 'next/server';
import { getAdmin } from '@/server/auth/session';
import { loadBillingAssets } from '@/server/data/billing-settings';
import { getAdminStorageBucket } from '@/server/firebase-admin';

export async function GET(req: NextRequest) {
  try {
    const admin = await getAdmin(false);
    if (!admin) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const type = searchParams.get('type'); // 'signature' | 'stamp'
    const customPath = searchParams.get('path');

    let buffer: Buffer | null = null;

    let contentType = 'image/png';

    if (type === 'signature' || type === 'stamp') {
      const assets = await loadBillingAssets();
      buffer = type === 'signature' ? assets.signatureBuffer : assets.stampBuffer;
    } else if (customPath) {
      // Validate path is strictly within billing/ or invoices/
      const cleanPath = customPath.replace(/\\/g, '/');
      const isAllowed = cleanPath.startsWith('billing/') || cleanPath.startsWith('invoices/');
      if (!isAllowed || cleanPath.includes('..')) {
        return new NextResponse('Invalid asset path', { status: 400 });
      }

      if (cleanPath.endsWith('.pdf')) {
        contentType = 'application/pdf';
      } else if (cleanPath.endsWith('.jpg') || cleanPath.endsWith('.jpeg')) {
        contentType = 'image/jpeg';
      } else if (cleanPath.endsWith('.webp')) {
        contentType = 'image/webp';
      } else if (cleanPath.endsWith('.png')) {
        contentType = 'image/png';
      }

      const bucket = getAdminStorageBucket();
      const file = bucket.file(cleanPath);
      const [exists] = await file.exists();
      if (!exists) {
        return new NextResponse('Asset not found', { status: 404 });
      }
      const [buf] = await file.download();
      buffer = buf;
    } else {
      return new NextResponse('Missing asset type or path', { status: 400 });
    }

    if (!buffer || buffer.length === 0) {
      return new NextResponse('Asset not found', { status: 404 });
    }

    return new NextResponse(new Uint8Array(buffer), {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Content-Disposition': 'inline',
        'Cache-Control': 'private, no-transform, max-age=3600',
        'X-Content-Type-Options': 'nosniff',
      },
    });
  } catch (error: unknown) {
    console.error('[GET /api/dashboard/billing/asset] Error:', error);
    return new NextResponse('Internal server error', { status: 500 });
  }
}
