import FilterTooltip from '@/components/public/shared/FilterTooltip';

export default function FieldLabel({ children, tip }) {
  return (
    <label className="flex items-center gap-1 font-secondary text-[10px] font-medium text-base-content/40 uppercase tracking-widest mb-1.5">
      {children}
      {tip && <FilterTooltip text={tip} />}
    </label>
  );
}
