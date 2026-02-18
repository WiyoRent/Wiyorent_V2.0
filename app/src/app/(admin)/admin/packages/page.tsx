'use client';

import { useState } from 'react';
import PackageCard from '@/components/admin/packages/PackageCard';
import PackageModal from '@/components/admin/packages/PackageModal';
import PageHeader from '@/components/admin/packages/PageHeader';

// ─── Mockup ───────────────────────────────────────────────────────────────────
const settlement_packages = [
  {
    package_id: 'pkg_01',
    name: 'STANDARD',
    description: 'Basic essentials to get you started.',
    price: 25000,
    is_popular: false,
    inclusions: ['Airport Pickup'],
  },
  {
    package_id: 'pkg_02',
    name: 'PREMIUM',
    description: 'Everything you need for a smooth transition.',
    price: 45000,
    is_popular: true,
    inclusions: ['Airport Pickup', 'Bank Account Setup', 'Sim-Card Setup'],
  },
];

// ─── Empty template for new packages ─────────────────────────────────────────
const empty_package = {
  package_id: null,
  name: '',
  description: '',
  price: '',
  is_popular: false,
  inclusions: [],
};

export default function SettlementPage() {
  const [packages, set_packages] = useState(settlement_packages);
  const [is_modal_open, set_is_modal_open] = useState(false);
  const [active_package, set_active_package] = useState(null);

  // ── Open modal ──────────────────────────────────────────────────────────────
  const open_create_modal = () => {
    set_active_package({ ...empty_package });
    set_is_modal_open(true);
  };

  const open_edit_modal = (pkg) => {
    set_active_package({ ...pkg, inclusions: [...pkg.inclusions] });
    set_is_modal_open(true);
  };

  // ── Close modal ─────────────────────────────────────────────────────────────
  const close_modal = () => {
    set_is_modal_open(false);
    set_active_package(null);
  };

  // ── Save (create or update) ─────────────────────────────────────────────────
  const handle_save = (saved_package) => {
    if (saved_package.package_id) {
      // Edit existing
      set_packages((prev) =>
        prev.map((p) =>
          p.package_id === saved_package.package_id ? saved_package : p
        )
      );
    } else {
      // Create new — generate a temporary id
      const new_pkg = {
        ...saved_package,
        package_id: `pkg_${Date.now()}`,
      };
      set_packages((prev) => [...prev, new_pkg]);
    }
    close_modal();
  };

  return (
    <div className="min-h-screen bg-base-200 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <PageHeader on_create={open_create_modal} />

        {/* Package Grid */}
        {packages.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 gap-3">
            <p className="font-secondary text-base-content/40 text-sm">
              No packages yet. Create your first one.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {packages.map((pkg) => (
              <PackageCard
                key={pkg.package_id}
                pkg={pkg}
                on_edit={() => open_edit_modal(pkg)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Shared Modal */}
      <PackageModal
        is_open={is_modal_open}
        active_package={active_package}
        set_active_package={set_active_package}
        on_save={handle_save}
        on_close={close_modal}
      />
    </div>
  );
}