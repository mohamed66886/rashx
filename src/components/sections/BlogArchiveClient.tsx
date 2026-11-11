'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Search,
  X,
  Clock,
  Calendar,
  ArrowRight,
  ArrowLeft,
  BookOpen,
  Filter,
  CheckCircle2,
  Terminal,
} from 'lucide-react';
import { BlogPost } from '@/data/blog';
import { Locale } from '@/i18n/config';

interface BlogArchiveClientProps {
  posts: BlogPost[];
  locale: Locale;
}

const ITEMS_PER_PAGE = 6;

export function BlogArchiveClient({ posts, locale }: BlogArchiveClientProps) {
  const isAr = locale === 'ar';
  const ArrowIcon = isAr ? ArrowLeft : ArrowRight;

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);

  // Derive unique categories from posts
  const categories = useMemo(() => {
    const map = new Map<string, { ar: string; en: string }>();
    posts.forEach((p) => {
      if (!map.has(p.category)) {
        map.set(p.category, { ar: p.categoryAr, en: p.categoryEn });
      }
    });
    return Array.from(map.entries()).map(([key, val]) => ({
      key,
      name: isAr ? val.ar : val.en,
    }));
  }, [posts, isAr]);

  // Filter posts based on category and search query
  const filteredPosts = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return posts.filter((post) => {
      const matchCategory =
        selectedCategory === 'all' || post.category === selectedCategory;
      if (!matchCategory) return false;

      if (!q) return true;

      const title = (isAr ? post.titleAr : post.titleEn).toLowerCase();
      const desc = (isAr ? post.descriptionAr : post.descriptionEn).toLowerCase();
      const author = (isAr ? post.authorAr : post.authorEn).toLowerCase();
      const keywords = post.keywords.join(' ').toLowerCase();

      return (
        title.includes(q) ||
        desc.includes(q) ||
        author.includes(q) ||
        keywords.includes(q)
      );
    });
  }, [posts, selectedCategory, searchQuery, isAr]);

  // Pagination calculation
  const totalPages = Math.ceil(filteredPosts.length / ITEMS_PER_PAGE) || 1;
  const paginatedPosts = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredPosts.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredPosts, currentPage]);

  const handleCategoryChange = (cat: string) => {
    setSelectedCategory(cat);
    setCurrentPage(1);
  };

  const handleSearchChange = (val: string) => {
    setSearchQuery(val);
    setCurrentPage(1);
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setCurrentPage(1);
  };

  return (
    <div className="space-y-10">
      {/* Search & Category Filter Controls */}
      <div className="space-y-6">
        {/* Search Bar */}
        <div className="relative max-w-2xl mx-auto sm:mx-0">
          <Search className="w-5 h-5 absolute start-4 top-1/2 -translate-y-1/2 text-ink-muted pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            placeholder={
              isAr
                ? 'ابحث في مقالات المدونة (مثل: الفوترة، نظام PDPL، العمولات، ولاء العملاء)...'
                : 'Search blog guides (e.g. ZATCA, PDPL, commissions, loyalty)...'
            }
            className="w-full ps-12 pe-10 py-3.5 rounded-2xl bg-white border border-mist-gray focus:border-dusty-blue focus:ring-2 focus:ring-dusty-blue/20 outline-none text-sm text-ink transition-all shadow-xs"
          />
          {searchQuery && (
            <button
              onClick={() => handleSearchChange('')}
              className="absolute end-3.5 top-1/2 -translate-y-1/2 p-1 rounded-lg text-ink-muted hover:text-ink hover:bg-mist-gray/60 transition-colors"
              aria-label={isAr ? 'مسح البحث' : 'Clear search'}
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => handleCategoryChange('all')}
            className={`px-4 py-2 rounded-xl text-xs font-medium transition-all active:scale-95 ${
              selectedCategory === 'all'
                ? 'bg-ink text-white shadow-xs'
                : 'bg-white border border-mist-gray text-ink hover:bg-mist-gray/60'
            }`}
          >
            {isAr ? 'جميع التصنيفات' : 'All Categories'}
            <span className="ms-1.5 opacity-70 font-mono text-[11px]">
              ({posts.length})
            </span>
          </button>

          {categories.map((cat) => {
            const count = posts.filter((p) => p.category === cat.key).length;
            const isSelected = selectedCategory === cat.key;
            return (
              <button
                key={cat.key}
                onClick={() => handleCategoryChange(cat.key)}
                className={`px-4 py-2 rounded-xl text-xs font-medium transition-all active:scale-95 ${
                  isSelected
                    ? 'bg-dusty-blue text-black shadow-xs'
                    : 'bg-white border border-mist-gray text-ink hover:bg-mist-gray/60'
                }`}
              >
                {cat.name}
                <span className="ms-1.5 opacity-70 font-mono text-[11px]">
                  ({count})
                </span>
              </button>
            );
          })}
        </div>

        {/* Active Results Summary */}
        <div className="flex items-center justify-between text-xs text-ink-muted pt-2 border-t border-mist-gray/60">
          <div>
            {isAr ? (
              <>
                عرض <span className="font-semibold text-ink">{filteredPosts.length}</span> من أصل{' '}
                <span className="font-semibold text-ink">{posts.length}</span> مقالاً
                {searchQuery && (
                  <span className="ms-1">
                    لمطابقة &ldquo;<span className="text-dusty-blue font-semibold">{searchQuery}</span>&rdquo;
                  </span>
                )}
              </>
            ) : (
              <>
                Showing <span className="font-semibold text-ink">{filteredPosts.length}</span> of{' '}
                <span className="font-semibold text-ink">{posts.length}</span> guides
                {searchQuery && (
                  <span className="ms-1">
                    matching &ldquo;<span className="text-dusty-blue font-semibold">{searchQuery}</span>&rdquo;
                  </span>
                )}
              </>
            )}
          </div>

          {(selectedCategory !== 'all' || searchQuery) && (
            <button
              onClick={handleClearFilters}
              className="text-dusty-blue hover:underline font-medium text-xs"
            >
              {isAr ? 'إعادة ضبط التصفية' : 'Reset filters'}
            </button>
          )}
        </div>
      </div>

      {/* Posts Grid */}
      {paginatedPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginatedPosts.map((post) => (
            <article
              key={post.slug}
              className="rounded-3xl bg-white border border-mist-gray p-6 sm:p-7 hover:border-dusty-blue/40 hover:shadow-md transition-all flex flex-col justify-between space-y-5 group"
            >
              <div className="space-y-3.5">
                {/* Meta Header */}
                <div className="flex items-center justify-between text-[11px] text-ink-muted">
                  <span className="px-2.5 py-1 rounded-full bg-mist-gray font-medium text-ink">
                    {isAr ? post.categoryAr : post.categoryEn}
                  </span>
                  <span className="inline-flex items-center gap-1 font-mono">
                    <Clock className="w-3 h-3 text-dusty-blue" />
                    <span>{isAr ? post.readTimeAr : post.readTimeEn}</span>
                  </span>
                </div>

                {/* Title */}
                <h2 className="text-base sm:text-lg font-semibold text-ink leading-snug group-hover:text-dusty-blue transition-colors">
                  <Link href={`/${locale}/blog/${post.slug}`}>
                    {isAr ? post.titleAr : post.titleEn}
                  </Link>
                </h2>

                {/* Description */}
                <p className="text-xs sm:text-sm text-ink-muted leading-relaxed line-clamp-3 font-normal">
                  {isAr ? post.descriptionAr : post.descriptionEn}
                </p>
              </div>

              {/* Author & Read Link Footer */}
              <div className="pt-4 border-t border-mist-gray/70 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-ink text-white text-[9px] font-semibold flex items-center justify-center">
                      {post.authorType === 'founder' ? 'MR' : 'RX'}
                    </div>
                    <span className="font-medium text-ink text-[11px] truncate max-w-[130px]">
                      {isAr ? post.authorAr : post.authorEn}
                    </span>
                  </div>

                  <span className="text-[11px] text-ink-muted font-mono">
                    {post.datePublished}
                  </span>
                </div>

                <div className="pt-1 flex items-center justify-end">
                  <Link
                    href={`/${locale}/blog/${post.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-ink group-hover:text-dusty-blue transition-colors"
                  >
                    <span>{isAr ? 'قراءة الدليل كاملاً' : 'Read Full Guide'}</span>
                    <ArrowIcon className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="rounded-3xl bg-white border border-mist-gray p-12 text-center space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-mist-gray/60 mx-auto flex items-center justify-center text-ink-muted">
            <Search className="w-8 h-8 text-dusty-blue" />
          </div>
          <h3 className="text-lg sm:text-xl font-semibold text-ink">
            {isAr ? 'لم نعثر على مقالات مطابقة' : 'No Matching Guides Found'}
          </h3>
          <p className="text-xs sm:text-sm text-ink-muted max-w-md mx-auto leading-relaxed font-normal">
            {isAr
              ? 'جرّب تعديل كلمات البحث أو تصفح جميع التصنيفات لاستعراض الأدلة الإرشادية المتوفرة.'
              : 'Try adjusting your search query or clear filters to view all available guides.'}
          </p>
          <button
            onClick={handleClearFilters}
            className="px-5 py-2.5 rounded-xl bg-ink text-white text-xs sm:text-sm font-semibold hover:bg-ink/90 transition-colors"
          >
            {isAr ? 'إعادة ضبط التصفية' : 'Reset All Filters'}
          </button>
        </div>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-mist-gray">
          <div className="text-xs text-ink-muted">
            {isAr
              ? `صفحة ${currentPage} من أصل ${totalPages}`
              : `Page ${currentPage} of ${totalPages}`}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="px-3.5 py-2 rounded-xl text-xs font-medium border border-mist-gray bg-white text-ink disabled:opacity-40 disabled:cursor-not-allowed hover:bg-mist-gray/60 transition-colors inline-flex items-center gap-1"
            >
              <ArrowLeft className="w-3.5 h-3.5 rtl:rotate-180" />
              <span>{isAr ? 'السابق' : 'Previous'}</span>
            </button>

            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, idx) => idx + 1).map((pageNum) => (
                <button
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  className={`w-9 h-9 rounded-xl text-xs font-medium transition-all ${
                    currentPage === pageNum
                      ? 'bg-ink text-white shadow-xs'
                      : 'bg-white border border-mist-gray text-ink hover:bg-mist-gray/60'
                  }`}
                >
                  {pageNum}
                </button>
              ))}
            </div>

            <button
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-3.5 py-2 rounded-xl text-xs font-medium border border-mist-gray bg-white text-ink disabled:opacity-40 disabled:cursor-not-allowed hover:bg-mist-gray/60 transition-colors inline-flex items-center gap-1"
            >
              <span>{isAr ? 'التالي' : 'Next'}</span>
              <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

