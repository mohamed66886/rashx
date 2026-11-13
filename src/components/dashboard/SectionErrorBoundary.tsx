'use client';

import React, { Component, startTransition, type ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { AlertTriangle, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallbackTitle?: string;
  onReset?: () => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class SectionErrorBoundaryInner extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('[SectionErrorBoundary] caught error:', error, errorInfo);
  }

  reset = () => {
    this.props.onReset?.();
    this.setState({ hasError: false });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center gap-2.5 rounded-2xl border border-neutral bg-base p-6 text-center">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-rose-50 text-rose-600">
            <AlertTriangle className="h-5 w-5" aria-hidden="true" />
          </div>
          <p className="text-xs font-bold text-ink">
            {this.props.fallbackTitle || 'تعذر تحميل هذا القسم'}
          </p>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={this.reset}
            leftIcon={<RotateCcw className="h-3.5 w-3.5" />}
            className="mt-1 h-8 text-xs font-bold text-ink"
          >
            إعادة المحاولة
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}

export function SectionErrorBoundary({
  children,
  fallbackTitle,
}: {
  children: ReactNode;
  fallbackTitle?: string;
}) {
  const router = useRouter();

  const handleReset = () => {
    startTransition(() => {
      router.refresh();
    });
  };

  return (
    <SectionErrorBoundaryInner fallbackTitle={fallbackTitle} onReset={handleReset}>
      {children}
    </SectionErrorBoundaryInner>
  );
}

