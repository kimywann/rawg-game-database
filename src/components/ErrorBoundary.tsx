"use client";

import { ErrorBoundary as ReactErrorBoundary } from "react-error-boundary";

interface ErrorFallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
}

const ErrorFallback = ({ error, resetErrorBoundary }: ErrorFallbackProps) => {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-4 p-8 text-center">
      <div className="text-red-500">
        <svg
          className="mx-auto h-12 w-12"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
          />
        </svg>
      </div>

      <div className="space-y-2">
        <h2 className="text-xl font-semibold text-white">
          게임을 불러오는 중 오류가 발생했습니다
        </h2>
        <p className="text-sm text-red-500">
          {error.message || "알 수 없는 오류가 발생했습니다."}
        </p>
      </div>

      <div className="flex gap-3">
        <button
          onClick={resetErrorBoundary}
          className="cursor-pointer rounded-md border border-red-300 bg-white px-4 py-2 text-sm font-medium text-red-700 hover:bg-red-50 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:outline-none"
        >
          다시 시도
        </button>
        <button
          onClick={() => window.location.reload()}
          className="cursor-pointer rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:outline-none"
        >
          페이지 새로고침
        </button>
      </div>
    </div>
  );
};

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ComponentType<ErrorFallbackProps>;
}

export const ErrorBoundary = ({
  children,
  fallback: Fallback = ErrorFallback,
}: ErrorBoundaryProps) => {
  const handleError = (error: Error, errorInfo: React.ErrorInfo) => {
    // 에러 로깅 (선택사항)
    console.error("ErrorBoundary caught an error:", error, errorInfo);

    // 실제 프로덕션에서는 에러 리포팅 서비스로 전송
    // 예: Sentry, LogRocket 등
  };

  return (
    <ReactErrorBoundary FallbackComponent={Fallback} onError={handleError}>
      {children}
    </ReactErrorBoundary>
  );
};

export default ErrorBoundary;
