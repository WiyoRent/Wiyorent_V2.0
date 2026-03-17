export default function FilterLabel({ children }) {
  return (
    <span className="font-primary text-[9px] uppercase tracking-[0.14em] text-base-content/55 font-bold mb-1.5 flex items-center gap-1.5">
      <span className="w-0.5 h-3 bg-accent/70 rounded-full flex-shrink-0" />
      {children}
    </span>
  );
}
