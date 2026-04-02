// /components/public/shared/BrowsePageLoading.jsx

function HousemateCardSkeleton() {
  return (
    <div className="bg-base-100 rounded-box shadow-sm overflow-hidden flex flex-col">
      {/* Avatar + name block */}
      <div className="p-6 pb-4 flex items-center gap-5">
        <div className="skeleton w-16 h-16 rounded-full flex-shrink-0" />
        <div className="flex-1 flex flex-col gap-2 min-w-0">
          <div className="skeleton h-4 w-3/4 rounded-field" />
          <div className="skeleton h-3 w-2/3 rounded-field" />
          <div className="skeleton h-3 w-1/2 rounded-field" />
        </div>
      </div>
      {/* Bio */}
      <div className="px-6 pb-4 flex flex-col gap-2">
        <div className="skeleton h-3 w-full rounded-field" />
        <div className="skeleton h-3 w-4/5 rounded-field" />
      </div>
      {/* Location pills */}
      <div className="px-6 pb-4 flex items-center gap-2">
        <div className="skeleton h-3 w-3 rounded-full flex-shrink-0" />
        <div className="skeleton h-6 w-24 rounded-field" />
        <div className="skeleton h-6 w-24 rounded-field" />
      </div>
      {/* Divider */}
      <div className="border-t border-base-200 mx-6" />
      {/* CTA row */}
      <div className="p-5 flex gap-2">
        <div className="skeleton h-9 flex-1 rounded-field" />
        <div className="skeleton h-9 w-9 rounded-field" />
        <div className="skeleton h-9 w-9 rounded-field" />
      </div>
    </div>
  );
}

function ListingCardSkeleton() {
  return (
    <div className="bg-base-100 rounded-box shadow-md overflow-hidden flex flex-col">
      {/* Image */}
      <div className="skeleton w-full h-48 sm:h-52" />
      <div className="p-4 flex flex-col gap-3">
        {/* Price */}
        <div className="skeleton h-7 w-32 rounded-field" />
        {/* Title + location */}
        <div className="flex flex-col gap-2">
          <div className="skeleton h-4 w-3/4 rounded-field" />
          <div className="skeleton h-3 w-1/2 rounded-field" />
        </div>
        {/* Specs */}
        <div className="flex items-center gap-3">
          <div className="skeleton h-4 w-12 rounded-field" />
          <div className="skeleton h-4 w-12 rounded-field" />
          <div className="skeleton h-4 w-12 rounded-field" />
        </div>
        {/* CTA */}
        <div className="skeleton h-9 w-full rounded-field mt-1" />
      </div>
    </div>
  );
}

export default function BrowsePageLoading({ title_width = 'w-48', card_type = 'listing' }) {
  const CardSkeleton = card_type === 'housemate' ? HousemateCardSkeleton : ListingCardSkeleton;

  return (
    <div className="min-h-screen bg-base-200">
      {/* Header bar */}
      <div className="bg-base-100 border-b border-base-300">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className={`skeleton h-12 ${title_width} rounded-field`} />
          <div className="skeleton h-4 w-40 rounded-field mt-3" />
        </div>
      </div>

      {/* Body */}
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">

          {/* Mobile filter button — visible only on small screens */}
          <div className="lg:hidden">
            <div className="skeleton h-10 w-32 rounded-field" />
          </div>

          {/* Sidebar — desktop only */}
          <aside className="hidden lg:block w-72 flex-shrink-0 self-start">
            <div className="bg-base-100 rounded-2xl shadow-md p-5 flex flex-col gap-5 border border-base-200 border-t-4 border-t-accent">
              <div className="skeleton h-5 w-16 rounded-field" />
              {/* Range filter */}
              <div className="flex flex-col gap-2">
                <div className="skeleton h-3 w-24 rounded-field" />
                <div className="skeleton h-8 w-full rounded-field" />
              </div>
              {/* Filter groups */}
              {[...Array(3)].map((_, i) => (
                <div key={i} className="flex flex-col gap-2">
                  <div className="skeleton h-3 w-28 rounded-field" />
                  <div className="flex flex-wrap gap-2">
                    {[...Array(4)].map((_, j) => (
                      <div key={j} className="skeleton h-7 w-20 rounded-field" />
                    ))}
                  </div>
                </div>
              ))}
              <div className="skeleton h-10 w-full rounded-field mt-2" />
            </div>
          </aside>

          {/* Card grid */}
          <div className="flex-1 min-w-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {[...Array(6)].map((_, i) => (
                <CardSkeleton key={i} />
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
