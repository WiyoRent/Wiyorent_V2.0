export default function DescriptionSection({ description }) {
  return (
    <section className="bg-base-100 rounded-box p-6 shadow-sm">
      <h2 className="font-primary text-base font-extrabold text-base-content uppercase tracking-widest mb-4 flex items-center gap-3">
        <span className="w-1 h-5 bg-accent rounded-full inline-block" />
        Description
      </h2>
      <p className="font-secondary text-sm leading-relaxed text-base-content/70">
        {description}
      </p>
    </section>
  );
}