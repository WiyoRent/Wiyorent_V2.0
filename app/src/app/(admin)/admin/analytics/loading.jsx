export default function AnalyticsLoading() {
  const CardSkeleton = () => (
    <div className="bg-base-100 rounded-box shadow-sm p-4 flex flex-col gap-3">
      <div className="skeleton h-3 w-20 rounded-field" />
      <div className="skeleton h-7 w-16 rounded-field" />
    </div>
  );

  const Section = ({ count = 8 }) => (
    <div className="mb-10">
      <div className="skeleton h-3 w-32 rounded-field mb-4" />
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {Array.from({ length: count }).map((_, i) => <CardSkeleton key={i} />)}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-base-200 p-6 sm:p-8">
      {/* Page header */}
      <div className="mb-8">
        <div className="skeleton h-7 w-48 rounded-field mb-2" />
        <div className="skeleton h-3 w-64 rounded-field" />
      </div>
      <Section count={12} />
      <Section count={8} />
      <Section count={5} />
      <Section count={8} />
    </div>
  );
}
