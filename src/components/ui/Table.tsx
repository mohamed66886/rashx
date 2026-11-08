'use client';

import React, { useState, useMemo } from 'react';
import {
  ChevronUp,
  ChevronDown,
  ChevronsUpDown,
  ChevronLeft,
  ChevronRight,
  Search,
  Check,
  AlertCircle,
  Loader2,
} from 'lucide-react';

/* =========================================================================
   1. TABLE PRIMITIVE COMPONENTS (Compound Components)
   ========================================================================= */

export interface TableProps extends React.HTMLAttributes<HTMLTableElement> {
  containerClassName?: string;
  striped?: boolean;
  hoverable?: boolean;
  bordered?: boolean;
}

export const Table = React.forwardRef<HTMLTableElement, TableProps>(
  (
    {
      className = '',
      containerClassName = '',
      striped = false,
      hoverable = true,
      bordered = true,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <div
        className={`w-full overflow-x-auto rounded-2xl ${
          bordered ? 'border border-[#E5E9E8] shadow-xs' : ''
        } bg-white ${containerClassName}`}
      >
        <table
          ref={ref}
          className={`w-full text-right text-sm text-black border-collapse ${
            striped ? '[&_tbody_tr:nth-child(even)]:bg-[#E5E9E8]/20' : ''
          } ${
            hoverable
              ? '[&_tbody_tr:hover]:bg-[#E5E9E8]/40 [&_tbody_tr]:transition-colors'
              : ''
          } ${className}`}
          {...props}
        >
          {children}
        </table>
      </div>
    );
  }
);
Table.displayName = 'Table';

export const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className = '', children, ...props }, ref) => (
  <thead
    ref={ref}
    className={`bg-[#E5E9E8]/70 border-b border-[#E5E9E8] text-xs font-bold text-black ${className}`}
    {...props}
  >
    {children}
  </thead>
));
TableHeader.displayName = 'TableHeader';

export const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className = '', children, ...props }, ref) => (
  <tbody
    ref={ref}
    className={`divide-y divide-[#E5E9E8] bg-white ${className}`}
    {...props}
  >
    {children}
  </tbody>
));
TableBody.displayName = 'TableBody';

export const TableFooter = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className = '', children, ...props }, ref) => (
  <tfoot
    ref={ref}
    className={`border-t border-[#E5E9E8] bg-[#E5E9E8]/40 font-semibold text-black ${className}`}
    {...props}
  >
    {children}
  </tfoot>
));
TableFooter.displayName = 'TableFooter';

export interface TableRowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  selected?: boolean;
}

export const TableRow = React.forwardRef<HTMLTableRowElement, TableRowProps>(
  ({ className = '', selected = false, children, ...props }, ref) => (
    <tr
      ref={ref}
      className={`${
        selected ? 'bg-[#91B8C0]/15 hover:bg-[#91B8C0]/25' : ''
      } ${className}`}
      {...props}
    >
      {children}
    </tr>
  )
);
TableRow.displayName = 'TableRow';

export interface TableHeadProps
  extends React.ThHTMLAttributes<HTMLTableCellElement> {
  sortable?: boolean;
  sortDirection?: 'asc' | 'desc' | false;
  onSort?: () => void;
  align?: 'right' | 'center' | 'left';
}

export const TableHead = React.forwardRef<HTMLTableCellElement, TableHeadProps>(
  (
    {
      className = '',
      sortable = false,
      sortDirection = false,
      onSort,
      align = 'right',
      children,
      ...props
    },
    ref
  ) => {
    const alignClass =
      align === 'center'
        ? 'text-center'
        : align === 'left'
        ? 'text-left'
        : 'text-right';

    return (
      <th
        ref={ref}
        className={`px-4 py-3.5 font-bold tracking-tight select-none ${alignClass} ${
          sortable ? 'cursor-pointer hover:bg-[#E5E9E8] transition-colors' : ''
        } ${className}`}
        onClick={sortable ? onSort : undefined}
        {...props}
      >
        <div
          className={`inline-flex items-center gap-1.5 ${
            align === 'center'
              ? 'justify-center'
              : align === 'left'
              ? 'justify-end flex-row-reverse'
              : 'justify-start'
          }`}
        >
          <span>{children}</span>
          {sortable && (
            <span className="text-[#5E6665]">
              {sortDirection === 'asc' ? (
                <ChevronUp className="w-3.5 h-3.5 text-black" />
              ) : sortDirection === 'desc' ? (
                <ChevronDown className="w-3.5 h-3.5 text-black" />
              ) : (
                <ChevronsUpDown className="w-3.5 h-3.5 opacity-50" />
              )}
            </span>
          )}
        </div>
      </th>
    );
  }
);
TableHead.displayName = 'TableHead';

export interface TableCellProps
  extends React.TdHTMLAttributes<HTMLTableCellElement> {
  align?: 'right' | 'center' | 'left';
}

export const TableCell = React.forwardRef<HTMLTableCellElement, TableCellProps>(
  ({ className = '', align = 'right', children, ...props }, ref) => {
    const alignClass =
      align === 'center'
        ? 'text-center'
        : align === 'left'
        ? 'text-left'
        : 'text-right';

    return (
      <td
        ref={ref}
        className={`px-4 py-3.5 text-sm font-normal text-black align-middle ${alignClass} ${className}`}
        {...props}
      >
        {children}
      </td>
    );
  }
);
TableCell.displayName = 'TableCell';

export const TableCaption = React.forwardRef<
  HTMLTableCaptionElement,
  React.HTMLAttributes<HTMLTableCaptionElement>
>(({ className = '', children, ...props }, ref) => (
  <caption
    ref={ref}
    className={`mt-3 text-xs text-[#5E6665] text-right px-4 ${className}`}
    {...props}
  >
    {children}
  </caption>
));
TableCaption.displayName = 'TableCaption';

/* =========================================================================
   2. HIGH-LEVEL SMART DATA TABLE COMPONENT (DataTable)
   ========================================================================= */

export interface DataTableColumn<T> {
  key: string;
  header: React.ReactNode;
  accessor?: (row: T) => React.ReactNode;
  sortable?: boolean;
  align?: 'right' | 'center' | 'left';
  width?: string;
}

export interface DataTableProps<T> {
  data: T[];
  columns: DataTableColumn<T>[];
  keyExtractor: (item: T) => string | number;
  title?: string;
  description?: string;
  searchable?: boolean;
  searchPlaceholder?: string;
  searchFilter?: (item: T, query: string) => boolean;
  selectable?: boolean;
  selectedIds?: (string | number)[];
  onSelectionChange?: (selectedIds: (string | number)[]) => void;
  pageSize?: number;
  pageSizeOptions?: number[];
  showPagination?: boolean;
  isLoading?: boolean;
  emptyMessage?: string;
  actions?: React.ReactNode;
  className?: string;
}

export function DataTable<T>({
  data,
  columns,
  keyExtractor,
  title,
  description,
  searchable = true,
  searchPlaceholder = 'بحث في الجدول...',
  searchFilter,
  selectable = false,
  selectedIds = [],
  onSelectionChange,
  pageSize: initialPageSize = 5,
  pageSizeOptions = [5, 10, 25, 50],
  showPagination = true,
  isLoading = false,
  emptyMessage = 'لا توجد بيانات متوفرة حالياً.',
  actions,
  className = '',
}: DataTableProps<T>) {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(initialPageSize);
  const [internalSelected, setInternalSelected] = useState<(string | number)[]>(
    selectedIds
  );

  const activeSelected = onSelectionChange ? selectedIds : internalSelected;
  const updateSelected = (ids: (string | number)[]) => {
    if (onSelectionChange) {
      onSelectionChange(ids);
    } else {
      setInternalSelected(ids);
    }
  };

  // Filter Data
  const filteredData = useMemo(() => {
    if (!searchQuery.trim()) return data;
    const q = searchQuery.toLowerCase();

    if (searchFilter) {
      return data.filter((item) => searchFilter(item, q));
    }

    // Default deep object search
    return data.filter((item) => {
      return Object.values(item as Record<string, unknown>).some((val) => {
        if (val === null || val === undefined) return false;
        return String(val).toLowerCase().includes(q);
      });
    });
  }, [data, searchQuery, searchFilter]);

  // Sort Data
  const sortedData = useMemo(() => {
    if (!sortKey) return filteredData;

    return [...filteredData].sort((a, b) => {
      const aVal = (a as Record<string, unknown>)[sortKey];
      const bVal = (b as Record<string, unknown>)[sortKey];

      if (aVal === bVal) return 0;
      if (aVal === null || aVal === undefined) return 1;
      if (bVal === null || bVal === undefined) return -1;

      if (typeof aVal === 'number' && typeof bVal === 'number') {
        return sortDirection === 'asc' ? aVal - bVal : bVal - aVal;
      }

      const strA = String(aVal);
      const strB = String(bVal);
      return sortDirection === 'asc'
        ? strA.localeCompare(strB, 'ar')
        : strB.localeCompare(strA, 'ar');
    });
  }, [filteredData, sortKey, sortDirection]);

  // Paginate Data
  const totalItems = sortedData.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const safePage = Math.min(currentPage, totalPages);

  const paginatedData = useMemo(() => {
    if (!showPagination) return sortedData;
    const startIndex = (safePage - 1) * pageSize;
    return sortedData.slice(startIndex, startIndex + pageSize);
  }, [sortedData, safePage, pageSize, showPagination]);

  // Handle Sort Toggle
  const handleSort = (key: string) => {
    if (sortKey === key) {
      if (sortDirection === 'asc') {
        setSortDirection('desc');
      } else {
        setSortKey(null);
        setSortDirection('asc');
      }
    } else {
      setSortKey(key);
      setSortDirection('asc');
    }
  };

  // Selection handlers
  const handleSelectAll = () => {
    const pageKeys = paginatedData.map(keyExtractor);
    const allSelected = pageKeys.every((k) => activeSelected.includes(k));

    if (allSelected) {
      updateSelected(activeSelected.filter((k) => !pageKeys.includes(k)));
    } else {
      const merged = Array.from(new Set([...activeSelected, ...pageKeys]));
      updateSelected(merged);
    }
  };

  const handleSelectRow = (key: string | number) => {
    if (activeSelected.includes(key)) {
      updateSelected(activeSelected.filter((k) => k !== key));
    } else {
      updateSelected([...activeSelected, key]);
    }
  };

  const isAllPageSelected =
    paginatedData.length > 0 &&
    paginatedData.every((item) => activeSelected.includes(keyExtractor(item)));

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Table Header Controls (Title, Search & Custom Actions) */}
      {(title || searchable || actions) && (
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          <div>
            {title && (
              <h3 className="text-lg font-bold text-black">{title}</h3>
            )}
            {description && (
              <p className="text-xs text-[#5E6665] mt-0.5">{description}</p>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {searchable && (
              <div className="relative flex-1 sm:w-64">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                  placeholder={searchPlaceholder}
                  className="w-full h-9.5 pr-9 pl-3 text-xs bg-white border border-[#E5E9E8] rounded-xl outline-none placeholder:text-[#5E6665]/60 text-black focus:border-[#91B8C0] focus:ring-2 focus:ring-[#91B8C0]/25 transition-all"
                />
                <Search className="w-4 h-4 text-[#5E6665] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            )}
            {actions}
          </div>
        </div>
      )}

      {/* Main Table */}
      <Table>
        <TableHeader>
          <TableRow>
            {selectable && (
              <TableHead className="w-12 text-center">
                <button
                  type="button"
                  onClick={handleSelectAll}
                  className={`w-4.5 h-4.5 rounded-md border flex items-center justify-center transition-colors ${
                    isAllPageSelected
                      ? 'bg-[#91B8C0] border-[#91B8C0] text-black font-bold'
                      : 'border-[#E5E9E8] bg-white hover:border-[#91B8C0]'
                  }`}
                  aria-label="تحديد الكل"
                >
                  {isAllPageSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </button>
              </TableHead>
            )}

            {columns.map((col) => (
              <TableHead
                key={col.key}
                sortable={col.sortable}
                sortDirection={sortKey === col.key ? sortDirection : false}
                onSort={() => handleSort(col.key)}
                align={col.align}
                style={{ width: col.width }}
              >
                {col.header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>

        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell
                colSpan={columns.length + (selectable ? 1 : 0)}
                className="py-12 text-center text-[#5E6665]"
              >
                <div className="flex flex-col items-center justify-center gap-2">
                  <Loader2 className="w-6 h-6 animate-spin text-[#91B8C0]" />
                  <span className="text-xs">جاري تحميل البيانات...</span>
                </div>
              </TableCell>
            </TableRow>
          ) : paginatedData.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={columns.length + (selectable ? 1 : 0)}
                className="py-12 text-center text-[#5E6665]"
              >
                <div className="flex flex-col items-center justify-center gap-2">
                  <AlertCircle className="w-8 h-8 text-[#5E6665]/50 stroke-1" />
                  <span className="text-sm font-medium">{emptyMessage}</span>
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery('')}
                      className="text-xs text-[#91B8C0] font-bold hover:underline"
                    >
                      مسح نص البحث
                    </button>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ) : (
            paginatedData.map((item) => {
              const key = keyExtractor(item);
              const isSelected = activeSelected.includes(key);

              return (
                <TableRow key={key} selected={isSelected}>
                  {selectable && (
                    <TableCell className="w-12 text-center">
                      <button
                        type="button"
                        onClick={() => handleSelectRow(key)}
                        className={`w-4.5 h-4.5 rounded-md border flex items-center justify-center transition-colors ${
                          isSelected
                            ? 'bg-[#91B8C0] border-[#91B8C0] text-black font-bold'
                            : 'border-[#E5E9E8] bg-white hover:border-[#91B8C0]'
                        }`}
                        aria-label="تحديد الصف"
                      >
                        {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </button>
                    </TableCell>
                  )}

                  {columns.map((col) => (
                    <TableCell key={col.key} align={col.align}>
                      {col.accessor
                        ? col.accessor(item)
                        : (item as Record<string, unknown>)[col.key] !== undefined
                        ? String((item as Record<string, unknown>)[col.key])
                        : '—'}
                    </TableCell>
                  ))}
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>

      {/* Table Footer Pagination Controls */}
      {showPagination && totalItems > 0 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-2 pt-1 text-xs text-[#5E6665]">
          <div className="flex items-center gap-3">
            <span>
              عرض {(safePage - 1) * pageSize + 1} إلى{' '}
              {Math.min(safePage * pageSize, totalItems)} من أصل {totalItems} سجل
            </span>

            {selectable && activeSelected.length > 0 && (
              <span className="px-2.5 py-0.5 rounded-full bg-[#91B8C0]/25 text-black font-bold">
                تم تحديد {activeSelected.length}
              </span>
            )}
          </div>

          <div className="flex items-center gap-3">
            {/* Page Size Selector */}
            <div className="flex items-center gap-1.5">
              <span>لكل صفحة:</span>
              <select
                value={pageSize}
                onChange={(e) => {
                  setPageSize(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="bg-white border border-[#E5E9E8] rounded-lg px-2 py-1 text-xs text-black font-medium outline-none cursor-pointer focus:border-[#91B8C0]"
              >
                {pageSizeOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>

            {/* Pagination Buttons */}
            <div className="inline-flex items-center gap-1">
              <button
                type="button"
                disabled={safePage <= 1}
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                className="p-1.5 rounded-lg border border-[#E5E9E8] text-black hover:bg-[#E5E9E8]/60 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                title="الصفحة السابقة"
              >
                <ChevronRight className="w-4 h-4" />
              </button>

              <span className="px-3 py-1 font-semibold text-black">
                {safePage} / {totalPages}
              </span>

              <button
                type="button"
                disabled={safePage >= totalPages}
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                className="p-1.5 rounded-lg border border-[#E5E9E8] text-black hover:bg-[#E5E9E8]/60 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                title="الصفحة التالية"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Table;

