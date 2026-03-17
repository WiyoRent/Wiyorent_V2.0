import PillChipGroup from '@/components/public/profile/PillChipGroup';
import FilterTooltip from '@/components/public/shared/FilterTooltip';

export default function PrefRow({ label, tooltip, options, value, onChange, full_width = false }) {
  return (
    <div className={`flex flex-wrap items-center justify-between gap-3 bg-base-200 rounded-field px-4 py-3${full_width ? ' sm:col-span-2' : ''}`}>
      <span className="flex items-center gap-1.5 font-secondary text-sm text-base-content">
        {label}
        {tooltip && <FilterTooltip text={tooltip} />}
      </span>
      <PillChipGroup options={options} value={value} onChange={onChange} />
    </div>
  );
}
