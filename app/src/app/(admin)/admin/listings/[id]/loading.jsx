export default function Loading() {
  return (
    <div className="min-h-screen bg-base-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Page title */}
        <div className="mb-6">
          <div className="skeleton h-9 w-48 rounded-field mb-2" />
          <div className="skeleton h-3 w-40 rounded-field" />
        </div>

        {/* Status & analytics bar */}
        <div className="bg-base-100 rounded-box shadow-sm p-5 mb-6 flex items-center gap-4 flex-wrap">
          <div className="skeleton h-8 w-28 rounded-field" />
          <div className="skeleton h-8 w-28 rounded-field" />
          <div className="skeleton h-8 w-36 rounded-field" />
          <div className="ml-auto skeleton h-8 w-24 rounded-field" />
          <div className="skeleton h-8 w-24 rounded-field" />
        </div>

        <div className="flex flex-col gap-6">
          {/* Basic info section */}
          <div className="bg-base-100 rounded-box shadow-sm p-6">
            <div className="skeleton h-5 w-28 rounded-field mb-5" />
            <div className="flex flex-col gap-4">
              <div className="skeleton h-10 w-full rounded-field" />
              <div className="skeleton h-24 w-full rounded-field" />
              <div className="grid grid-cols-2 gap-4">
                <div className="skeleton h-10 w-full rounded-field" />
                <div className="skeleton h-10 w-full rounded-field" />
              </div>
            </div>
          </div>

          {/* Landlord & availability section */}
          <div className="bg-base-100 rounded-box shadow-sm p-6">
            <div className="skeleton h-5 w-44 rounded-field mb-5" />
            <div className="grid grid-cols-2 gap-4">
              <div className="skeleton h-10 w-full rounded-field" />
              <div className="skeleton h-10 w-full rounded-field" />
            </div>
          </div>

          {/* Financials & specs section */}
          <div className="bg-base-100 rounded-box shadow-sm p-6">
            <div className="skeleton h-5 w-48 rounded-field mb-5" />
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="skeleton h-10 w-full rounded-field" />
              ))}
            </div>
          </div>

          {/* Amenities & house rules */}
          <div className="bg-base-100 rounded-box shadow-sm p-6">
            <div className="skeleton h-5 w-40 rounded-field mb-5" />
            <div className="flex flex-wrap gap-2 mb-4">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="skeleton h-8 w-24 rounded-field" />
              ))}
            </div>
            <div className="flex flex-col gap-2">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="skeleton h-8 w-full rounded-field" />
              ))}
            </div>
          </div>
        </div>

        {/* Save button */}
        <div className="flex justify-end gap-3 mt-6">
          <div className="skeleton h-10 w-28 rounded-field" />
          <div className="skeleton h-10 w-32 rounded-field" />
        </div>
      </div>
    </div>
  );
}
