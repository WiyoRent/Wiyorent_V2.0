import FilterTooltip from '@/components/public/shared/FilterTooltip';

export default function FieldLabel({ children, tip }) {
  return (
    <label className="flex items-center gap-1 font-secondary text-[11px] font-semibold text-base-content/50 tracking-wide mb-1.5">
      {children}
      {tip && <FilterTooltip text={tip} />}
    </label>
  );
}
