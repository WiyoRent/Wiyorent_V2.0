export default function Stats() {
  return (
    <section className="bg-white py-16 px-6 lg:px-16">
      <div className="container mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8">
        <div className="text-center">
          <h3 className="font-primary text-5xl lg:text-6xl font-bold text-accent mb-2">
            150+
          </h3>
          <p className="font-secondary text-sm text-secondary/60 uppercase tracking-wide">
            Students Served
          </p>
        </div>

        <div className="text-center">
          <h3 className="font-primary text-5xl lg:text-6xl font-bold text-accent mb-2">
            50+
          </h3>
          <p className="font-secondary text-sm text-secondary/60 uppercase tracking-wide">
            Verified Properties
          </p>
        </div>

        <div className="text-center">
          <h3 className="font-primary text-5xl lg:text-6xl font-bold text-accent mb-2">
            100%
          </h3>
          <p className="font-secondary text-sm text-secondary/60 uppercase tracking-wide">
            Satisfaction Rate
          </p>
        </div>

        <div className="text-center">
          <h3 className="font-primary text-5xl lg:text-6xl font-bold text-accent mb-2">
            24/7
          </h3>
          <p className="font-secondary text-sm text-secondary/60 uppercase tracking-wide">
            Support
          </p>
        </div>
      </div>
    </section>
  );
}
