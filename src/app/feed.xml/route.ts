import { NextResponse } from 'next/server';
import { SITE_CONFIG } from '@/config/site';
import { BLOG_POSTS } from '@/data/blog';

export async function GET() {
  const siteUrl = SITE_CONFIG.url;
  const buildDate = new Date().toUTCString();

  const itemsXml = BLOG_POSTS.map((post) => {
    const postUrl = `${siteUrl}/ar/blog/${post.slug}`;
    const pubDate = new Date(post.datePublished).toUTCString();
    const author = `${post.authorAr} (${SITE_CONFIG.nameAr})`;

    return `
    <item>
      <title><![CDATA[${post.titleAr}]]></title>
      <link>${postUrl}</link>
      <guid isPermaLink="true">${postUrl}</guid>
      <pubDate>${pubDate}</pubDate>
      <author>${author}</author>
      <category><![CDATA[${post.categoryAr}]]></category>
      <description><![CDATA[${post.descriptionAr}]]></description>
    </item>`;
  }).join('');

  const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title><![CDATA[مدونة راش إكس | RashX Blog]]></title>
    <link>${siteUrl}/ar/blog</link>
    <description><![CDATA[مقالات وأدلة متخصصة لإدارة صالونات التجميل والمشاغل في المملكة العربية السعودية: الفوترة الإلكترونية ZATCA، حماية البيانات PDPL، نظم العمولات، وبرامج ولاء العملاء.]]></description>
    <language>ar-SA</language>
    <lastBuildDate>${buildDate}</lastBuildDate>
    <atom:link href="${siteUrl}/feed.xml" rel="self" type="application/rss+xml"/>
    ${itemsXml}
  </channel>
</rss>`;

  return new NextResponse(rssXml, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400, stale-while-revalidate',
    },
  });
}
