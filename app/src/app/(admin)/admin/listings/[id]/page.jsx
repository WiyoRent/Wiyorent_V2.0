import EditListingForm from '@/components/admin/listings/EditListingForm';

// ─────────────────────────────────────────────────────────────────────────────
// Mock listing detail — in production: await fetch(`/api/admin/listings/${params.id}`)
// ─────────────────────────────────────────────────────────────────────────────
const listing_detail = {
  listing_id: 'house_8826',
  title: 'Luxury Apartment in Remera',
  description:
    'A stunning, high-end apartment located in the heart of Remera. This property offers modern finishes, plenty of natural light, and is situated within walking distance to the Kigali Arena and top-tier restaurants. Perfect for professionals or small families seeking comfort and security.',
  is_active: true,
  is_verified: true,
  available_status: 'available', // available | booked | maintenance
  available_from: '2024-10-01',
  analytics: { number_of_saves: 142, number_of_views: 1205 },
  landlord: { full_name: 'WiyoRent Ltd', phone_number: '+250780000000' },
  financials: {
    price_per_month: 300000,
    commission_fee: 30000,
    caution_fee: 300000,
  },
  specifications: {
    bedroom_number: 2,
    bathroom_number: 2,
    max_roommates: 3,
    property_type: 'apartment',
    is_furnished: true,
  },
  amenities: ['wifi', 'stove', 'microwave', 'blender', 'security', 'parking'],
  house_rules: [
    'No smoking inside the property',
    'No pets allowed',
    'Quiet hours from 10 PM to 7 AM',
    'Visitors must leave by 10 PM',
  ],
  location: { neighborhood: 'Remera', city: 'Kigali', country: 'Rwanda' },
  image_urls: [
    'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600',
    'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=600',
    'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=600',
  ],
};

export async function generateMetadata({ params }) {
  return {
    title: `Edit ${listing_detail.title} | WiyoRent Admin`,
    description: 'Admin listing editor',
  };
}

export default function EditListingPage({ params }) {
  return (
    <div className="min-h-screen bg-base-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h1 className="font-primary text-3xl font-extrabold text-base-content uppercase tracking-tight">
            Edit Listing
          </h1>
          <p className="font-secondary text-sm text-base-content/50 mt-1">
            ID: {listing_detail.listing_id}
          </p>
        </div>

        <EditListingForm initial_data={listing_detail} />
      </div>
    </div>
  );
}