import Link from "next/link";
import { ArrowLeft, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-secondary flex flex-col items-center justify-center px-6 text-center">

      {/* Large 404 */}
      <span className="font-primary text-[10rem] sm:text-[14rem] font-extrabold leading-none text-white/5 select-none pointer-events-none">
        404
      </span>

      {/* Content — overlaid on the 404 */}
      <div className="-mt-16 sm:-mt-24 flex flex-col items-center gap-6">

        <div className="flex items-center gap-2">
          <span className="w-6 h-px bg-accent" />
          <span className="font-secondary text-xs font-semibold text-accent uppercase tracking-widest">
            Page Not Found
          </span>
          <span className="w-6 h-px bg-accent" />
        </div>

        <h1 className="font-primary text-3xl sm:text-4xl font-bold text-white uppercase leading-tight max-w-md">
          This page doesn't exist
        </h1>

        <p className="font-secondary text-sm text-white/50 max-w-xs leading-relaxed">
          The link may be broken, or the page may have been removed.
          Head back to find verified housing in Kigali.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-3 mt-2">
          <Link href="/">
            <button className="btn btn-accent rounded-lg font-primary font-bold text-sm uppercase tracking-wide gap-2">
              <Home size={15} />
              Back to Home
            </button>
          </Link>
          <Link href="/listings">
            <button className="btn btn-outline text-white border-white/20 hover:bg-white/10 hover:border-white/40 hover:text-white rounded-lg font-primary font-bold text-sm uppercase tracking-wide gap-2">
              <ArrowLeft size={15} />
              Browse Listings
            </button>
          </Link>
        </div>
      </div>

    </div>
  );
}
