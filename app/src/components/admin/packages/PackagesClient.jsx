'use client';

import { useState } from 'react';
import { toast } from 'react-toastify';
import PackageCard from '@/components/admin/packages/PackageCard';
import PackageModal from '@/components/admin/packages/PackageModal';
import PageHeader from '@/components/admin/packages/PageHeader';
import { createPackage, updatePackage } from '@/services/admin/package.service';
import { deletePackage } from '@/actions/admin/package.action';

const empty_package = {
  package_id: null,
  name: '',
  description: '',
  price: '',
  is_popular: false,
  inclusions: [],
};

export default function PackagesClient({ initial_packages }) {
  const [packages, set_packages] = useState(initial_packages ?? []);
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
  const handle_save = async (saved_package) => {
    const is_edit = Boolean(saved_package.package_id);
    const payload = {
      name: saved_package.name,
      price: Number(saved_package.price),
      description: saved_package.description,
      inclusions: saved_package.inclusions,
      is_popular: saved_package.is_popular,
    };

    if (is_edit) {
      const previous = packages;
      // Optimistic update
      set_packages((prev) =>
        prev.map((p) => (p.package_id === saved_package.package_id ? saved_package : p))
      );
      close_modal();

      try {
        const updated = await updatePackage(saved_package.package_id, payload);
        set_packages((prev) =>
          prev.map((p) => (p.package_id === saved_package.package_id ? updated : p))
        );
      } catch (error) {
        toast.error(error.message || "Couldn't update package.");
        set_packages(previous);
      }
    } else {
      const optimistic = { ...saved_package, package_id: `optimistic_${Date.now()}`, _optimistic: true };
      set_packages((prev) => [...prev, optimistic]);
      close_modal();

      try {
        const created = await createPackage(payload);
        set_packages((prev) =>
          prev.map((p) => (p.package_id === optimistic.package_id ? created : p))
        );
      } catch (error) {
        toast.error(error.message || "Couldn't create package.");
        set_packages((prev) => prev.filter((p) => p.package_id !== optimistic.package_id));
      }
    }
  };

  // ── Delete ──────────────────────────────────────────────────────────────────
  const handle_delete = async (id) => {
    const snapshot = packages;
    set_packages((prev) => prev.filter((p) => p.package_id !== id));

    try {
      await deletePackage(id);
    } catch (error) {
      toast.error(error.message || "Couldn't delete package.");
      set_packages(snapshot);
    }
  };

  // ── Render ──────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-base-200 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <PageHeader on_create={open_create_modal} />

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
                on_delete={handle_delete}
              />
            ))}
          </div>
        )}
      </div>

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
