'use client';

import React, { Component, type ReactNode } from 'react';

interface SilentErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface SilentErrorBoundaryState {
  hasError: boolean;
}

export class SilentErrorBoundary extends Component<SilentErrorBoundaryProps, SilentErrorBoundaryState> {
  constructor(props: SilentErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): SilentErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('[InvoicesBadge ErrorBoundary] Suppressed failure:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback ?? null;
    }
    return this.props.children;
  }
}

