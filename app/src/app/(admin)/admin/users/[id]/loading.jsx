export default function Loading() {
  return (
    <div className="min-h-screen bg-base-200">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* ── ProfileHero ─────────────────────────────────── */}
        <div className="bg-base-100 rounded-box shadow-sm overflow-hidden">
          <div className="h-2 bg-accent w-full" />
          <div className="p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center gap-6">
            {/* Avatar */}
            <div className="skeleton w-24 h-24 sm:w-28 sm:h-28 rounded-full flex-shrink-0" />
            {/* Info */}
            <div className="flex-1 flex flex-col gap-3">
              {/* Name + badges */}
              <div className="flex items-center gap-3 flex-wrap">
                <div className="skeleton h-9 w-56 rounded-field" />
                <div className="skeleton h-6 w-20 rounded-field" />
                <div className="skeleton h-6 w-28 rounded-field" />
              </div>
              {/* Nationality chip */}
              <div className="skeleton h-6 w-28 rounded-field" />
              {/* University */}
              <div className="skeleton h-4 w-48 rounded-field" />
              {/* Budget */}
              <div className="skeleton h-4 w-40 rounded-field" />
              {/* Location pills */}
              <div className="flex gap-2">
                <div className="skeleton h-7 w-20 rounded-field" />
                <div className="skeleton h-7 w-20 rounded-field" />
              </div>
            </div>
          </div>
        </div>

        {/* ── UserListingSection (optional but skeleton it anyway) ── */}
        <div className="mt-8 bg-base-100 rounded-box shadow-sm overflow-hidden">
          {/* Header */}
          <div className="px-6 sm:px-8 pt-6 pb-4 border-b border-base-200 flex items-center gap-3">
            <div className="skeleton w-9 h-9 rounded-field flex-shrink-0" />
            <div className="flex flex-col gap-2">
              <div className="skeleton h-5 w-36 rounded-field" />
              <div className="skeleton h-3 w-64 rounded-field" />
            </div>
          </div>
          {/* Body */}
          <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Carousel placeholder */}
            <div className="skeleton w-full aspect-video rounded-box" />
            {/* Details */}
            <div className="flex flex-col gap-4">
              <div className="skeleton h-9 w-40 rounded-field" />
              <div className="skeleton h-4 w-24 rounded-field" />
              <div className="flex gap-2 flex-wrap">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="skeleton h-8 w-24 rounded-field" />
                ))}
              </div>
              <div className="skeleton h-16 w-full rounded-field" />
              <div className="flex gap-2 flex-wrap">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="skeleton h-7 w-20 rounded-field" />
                ))}
              </div>
              <div className="flex gap-2 flex-wrap">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="skeleton h-7 w-24 rounded-field" />
                ))}
              </div>
              <div className="mt-auto pt-4 border-t border-base-200 flex justify-between">
                <div className="skeleton h-4 w-40 rounded-field" />
                <div className="skeleton h-4 w-28 rounded-field" />
              </div>
            </div>
          </div>
        </div>

        {/* ── Three-column grid ───────────────────────────── */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">

          {/* Column 1 — About + Lifestyle */}
          <div className="flex flex-col gap-6">
            <div className="bg-base-100 rounded-box shadow-sm p-6">
              <div className="skeleton h-5 w-20 rounded-field mb-4" />
              <div className="flex flex-col gap-2">
                <div className="skeleton h-3 w-full rounded-field" />
                <div className="skeleton h-3 w-full rounded-field" />
                <div className="skeleton h-3 w-4/5 rounded-field" />
                <div className="skeleton h-3 w-3/4 rounded-field" />
              </div>
            </div>
            <div className="bg-base-100 rounded-box shadow-sm p-6">
              <div className="skeleton h-5 w-28 rounded-field mb-4" />
              <div className="flex flex-col gap-3">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="flex justify-between items-center">
                    <div className="skeleton h-3 w-24 rounded-field" />
                    <div className="skeleton h-6 w-20 rounded-field" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Column 2 — Basic profile + Housing prefs */}
          <div className="flex flex-col gap-6">
            <div className="bg-base-100 rounded-box shadow-sm p-6">
              <div className="skeleton h-5 w-32 rounded-field mb-4" />
              <div className="flex flex-col gap-3">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="flex justify-between items-center">
                    <div className="skeleton h-3 w-20 rounded-field" />
                    <div className="skeleton h-6 w-24 rounded-field" />
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-base-100 rounded-box shadow-sm p-6">
              <div className="skeleton h-5 w-44 rounded-field mb-4" />
              <div className="flex flex-col gap-3">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="flex justify-between items-center">
                    <div className="skeleton h-3 w-28 rounded-field" />
                    <div className="skeleton h-6 w-20 rounded-field" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Column 3 — Contact card */}
          <div className="bg-base-100 rounded-box shadow-sm p-6">
            <div className="skeleton h-5 w-28 rounded-field mb-6" />
            <div className="flex flex-col gap-3">
              <div className="skeleton h-11 w-full rounded-field" />
              <div className="skeleton h-11 w-full rounded-field" />
              <div className="skeleton h-11 w-full rounded-field" />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}