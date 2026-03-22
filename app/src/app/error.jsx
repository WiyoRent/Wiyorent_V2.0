'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import { RefreshCw, Home } from 'lucide-react';

export default function ErrorPage({ error, reset }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-secondary flex flex-col items-center justify-center px-6 text-center relative overflow-hidden">

      <style>{`
        @keyframes scan {
          0%   { top: -2px; opacity: 0; }
          8%   { opacity: 1; }
          92%  { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
        @keyframes errFlicker {
          0%, 100% { opacity: 0.04; }
          50%       { opacity: 0.075; }
        }
      `}</style>

      {/* Scanning line — the signature element that distinguishes this from 404 */}
      <div
        className="absolute left-0 w-full pointer-events-none"
        style={{
          height: '1px',
          background: 'oklch(75% 0.15 85 / 0.35)',
          animation: 'scan 5s linear infinite',
        }}
      />

      {/* Ghosted backdrop */}
      <span
        className="font-primary font-extrabold leading-none select-none pointer-events-none text-white absolute"
        style={{
          fontSize: 'clamp(7rem, 20vw, 16rem)',
          animation: 'errFlicker 4s ease-in-out infinite',
          opacity: 0.04,
        }}
      >
        ERR
      </span>

      {/* Content — lifted above the backdrop */}
      <div className="relative flex flex-col items-center gap-6 max-w-sm">

        <div className="flex items-center gap-2">
          <span className="w-6 h-px bg-accent" />
          <span className="font-secondary text-xs font-semibold text-accent uppercase tracking-widest">
            Something went wrong
          </span>
          <span className="w-6 h-px bg-accent" />
        </div>

        <h1 className="font-primary text-3xl sm:text-4xl font-bold text-white uppercase leading-tight">
          We hit a snag.
        </h1>

        <p className="font-secondary text-sm text-white/50 leading-relaxed">
          This could be a temporary connection issue. Try refreshing — it usually fixes things.
        </p>

        {error?.digest && (
          <p className="font-mono text-xs text-white/20 bg-white/5 border border-white/8 px-3 py-1.5 rounded">
            {error.digest}
          </p>
        )}

        <div className="flex flex-col sm:flex-row items-center gap-3 mt-2">
          <button
            onClick={reset}
            className="btn btn-accent rounded-lg font-primary font-bold text-sm uppercase tracking-wide gap-2"
          >
            <RefreshCw size={15} />
            Try Again
          </button>
          <Link href="/">
            <button className="btn btn-outline text-white border-white/20 hover:bg-white/10 hover:border-white/40 hover:text-white rounded-lg font-primary font-bold text-sm uppercase tracking-wide gap-2">
              <Home size={15} />
              Go Home
            </button>
          </Link>
        </div>

      </div>
    </div>
  );
}
