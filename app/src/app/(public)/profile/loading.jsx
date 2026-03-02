export default function Loading() {
  return (
    <div className="min-h-screen bg-base-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Page heading */}
        <div className="mb-6">
          <div className="skeleton h-10 w-72 rounded-field" />
          <div className="skeleton h-4 w-48 rounded-field mt-2" />
        </div>

        {/* Form sections — each card */}
        <div className="flex flex-col gap-6">

          {/* Basic Profile — tallest, has avatar */}
          <div className="bg-base-100 rounded-box shadow-sm p-6 sm:p-8">
            <div className="skeleton h-5 w-36 rounded-field mb-6" />
            <div className="flex items-center gap-6 mb-6">
              <div className="skeleton w-24 h-24 rounded-full flex-shrink-0" />
              <div className="flex flex-col gap-2 flex-1">
                <div className="skeleton h-4 w-32 rounded-field" />
                <div className="skeleton h-4 w-24 rounded-field" />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="flex flex-col gap-2">
                  <div className="skeleton h-3 w-20 rounded-field" />
                  <div className="skeleton h-10 w-full rounded-field" />
                </div>
              ))}
            </div>
          </div>

          {/* About Me */}
          <div className="bg-base-100 rounded-box shadow-sm p-6 sm:p-8">
            <div className="skeleton h-5 w-24 rounded-field mb-6" />
            <div className="skeleton h-28 w-full rounded-field" />
          </div>

          {/* Lifestyle */}
          <div className="bg-base-100 rounded-box shadow-sm p-6 sm:p-8">
            <div className="skeleton h-5 w-40 rounded-field mb-6" />
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="flex flex-col gap-2">
                  <div className="skeleton h-3 w-24 rounded-field" />
                  <div className="skeleton h-10 w-full rounded-field" />
                </div>
              ))}
            </div>
          </div>

          {/* Housing Preferences */}
          <div className="bg-base-100 rounded-box shadow-sm p-6 sm:p-8">
            <div className="skeleton h-5 w-48 rounded-field mb-6" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="flex flex-col gap-2">
                  <div className="skeleton h-3 w-28 rounded-field" />
                  <div className="skeleton h-10 w-full rounded-field" />
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-2 mt-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="skeleton h-8 w-24 rounded-field" />
              ))}
            </div>
          </div>

          {/* House Listing */}
          <div className="bg-base-100 rounded-box shadow-sm p-6 sm:p-8">
            <div className="skeleton h-5 w-36 rounded-field mb-6" />
            <div className="skeleton h-12 w-full rounded-field mb-4" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="flex flex-col gap-2">
                  <div className="skeleton h-3 w-20 rounded-field" />
                  <div className="skeleton h-10 w-full rounded-field" />
                </div>
              ))}
            </div>
          </div>

          {/* Practical Info */}
          <div className="bg-base-100 rounded-box shadow-sm p-6 sm:p-8">
            <div className="skeleton h-5 w-40 rounded-field mb-6" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[...Array(2)].map((_, i) => (
                <div key={i} className="flex flex-col gap-2">
                  <div className="skeleton h-3 w-24 rounded-field" />
                  <div className="skeleton h-10 w-full rounded-field" />
                </div>
              ))}
            </div>
          </div>

          {/* Save button */}
          <div className="skeleton h-12 w-full rounded-field" />

        </div>
      </div>
    </div>
  );
}