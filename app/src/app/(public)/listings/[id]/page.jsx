
import ImageGallery from '@/components/public/listing/ImageGallery';
import ListingHeader from '@/components/public/listing/ListingHeader';
import DescriptionSection from '@/components/public/listing/DescriptionSection';
import AmenitiesSection from '@/components/public/listing/AmenitiesSection';
import HouseRulesSection from '@/components/public/listing/HouseRulesSection';
import ReviewsSection from '@/components/public/listing/ReviewsSection';
import PricingSidebar from '@/components/public/listing/PricingSidebar';
import { getBaseURL } from '@/lib/getBaseURL.js';
import { auth } from '@/auth';

// ---------------------------------------------------------------------------
// Mock listing detail — replace this async fetch in production:
//   const listing_detail = await fetch(`/api/listings/${params.id}`).then(r => r.json())
// ---------------------------------------------------------------------------
// const listing_detail = {
//   listing_id: 'house_8826',
//   title: 'Luxury Apartment in Remera',
//   financials: {
//     price_per_month: 300000,
//     commission_fee: 30000,   // 10% of one month rent (default)
//     caution_fee: 300000,     // refundable by default
//   },
//   specifications: {
//     bedroom_number: 2,
//     bathroom_number: 2,
//     max_roommates: 3,
//     property_type: 'apartment',
//   },
//   amenities: [
//     'wifi',
//     'stove',
//     'microwave',
//     'blender',
//     'security',
//     'parking',
//     'water_tank',
//   ],
//   neighborhood: 'Remera',
//   city: 'Kigali',
//   country: 'Rwanda',
//   available_status: 'available',
//   is_furnished: true,
//   is_verified: true,
//   thumbnail_url:
//     'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&q=80',
//   description:
//     'A stunning, high-end apartment located in the heart of Remera. This property offers modern finishes, plenty of natural light, and is situated within walking distance to the Kigali Arena and top-tier restaurants. Perfect for professionals or small families seeking comfort and security.',
//   image_urls: [
//     'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200',
//     'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=1200',
//     'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=1200',
//   ],
//   house_rules: [
//     'No smoking inside the property',
//     'No pets allowed',
//     'Quiet hours from 10 PM to 7 AM',
//     'Visitors must leave by 10 PM',
//     'Keep common areas clean',
//     'Respect your roommates and neighbors',
//   ],
//   reviews: {
//     average_rating: 4.8,
//     total_count: 112,
//     entries: [
//       {
//         id: 'rev_01',
//         name: 'John Mutabazi',
//         rating: 5,
//         comment:
//           'Great place for a student! Very close to the university and the landlord is super helpful. The Wi-Fi is also very reliable.',
//         avatar: 'https://i.pravatar.cc/150?u=john',
//         date: '2024-01-15',
//       },
//       {
//         id: 'rev_02',
//         name: 'Alice Uwera',
//         rating: 4,
//         comment:
//         "The apartment is clean and modern. My only complaint is the occasional noise from the street, but it's not a major issue.",
//         avatar: 'https://i.pravatar.cc/150?u=alice',
//         date: '2024-02-01',
//       },
//     ],
//   },
// };



const fetchSingleListing = async (id, userId = null) => {
  try {
    const params = userId ? `?userId=${userId}` : ''
    const url = getBaseURL() + `api/v1/public/getSingleListing/${id}${params}`

    const response = await fetch(url, { next: { revalidate: 300 } })

    if(!response.ok){
      throw new Error("An error occured. Couldn't fetch listing")
    }

    const result = await response.json()

    const listing = result.data

    return listing || []

  } catch (error) {
    console.error(error.message)
    return null
  }
  
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const listing = await fetchSingleListing(id);

  if (!listing) {
    return {
      title: "Listing Not Found | WiyoRent",
      description: "This student housing listing could not be found on WiyoRent.",
      robots: { index: false, follow: false },
    };
  }

  const price = listing.financials?.price_per_month
    ? `${listing.financials.price_per_month.toLocaleString()} RWF/month`
    : null;

  const bedrooms = listing.specifications?.bedroom_number;
  const bathrooms = listing.specifications?.bathroom_number;
  const furnished = listing.is_furnished ? "Furnished" : "Unfurnished";
  const location = [listing.neighborhood, listing.city].filter(Boolean).join(", ");
  const verified = listing.is_verified;

  const description = listing.description
    ? listing.description.slice(0, 155)
    : `${furnished} ${bedrooms ? `${bedrooms}-bedroom` : ""} student ${listing.specifications?.property_type ?? "property"} in ${location}${price ? ` from ${price}` : ""}. ${verified ? "Verified listing" : ""} on WiyoRent — no visiting fees, no hidden charges.`;

  return {
    title: `${listing.title} | Student House in ${location} | WiyoRent`,
    description,
    openGraph: {
      title: `${listing.title} | WiyoRent`,
      description,
      url: `https://wiyorent.com/listings/${id}`,
      siteName: "WiyoRent",
      locale: "en_US",
      type: "website",
      ...(listing.thumbnail_url && {
        images: [
          {
            url: listing.thumbnail_url,
            width: 1200,
            height: 630,
            alt: `${listing.title} — student housing in ${location}`,
          },
        ],
      }),
    },
    twitter: {
      card: "summary_large_image",
      title: `${listing.title} | WiyoRent`,
      description,
      ...(listing.thumbnail_url && { images: [listing.thumbnail_url] }),
    },
    robots: {
      index: listing.available_status === "available" ? true : false,
      follow: true,
    },
  };
}

export default async function ListingDetailPage({ params }) {

  const {id} = await params

  const session = await auth()
  const user = session?.user
  const full_name = user?.full_name

  const listing_detail = await fetchSingleListing(id, user?.id)

  const { financials, specifications, reviews} = listing_detail;

  // Total first payment calculation
  const upfront_months = financials?.upfront_months ?? 1;
  const is_a_wiyorent_house = listing_detail?.is_a_wiyorent_house;
  const total_first_payment =
    financials?.price_per_month * upfront_months +
    financials?.caution_fee +
    (is_a_wiyorent_house ? 0 : financials?.commission_fee);

  return (
    <div className="min-h-screen bg-base-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* ── Image Gallery (full width) ─────────────────────── */}
        <ImageGallery
          image_urls={listing_detail?.image_urls}
          title={listing_detail?.title}
        />

        {/* ── Two-column layout below gallery ───────────────── */}
        <div className="mt-8 flex flex-col lg:flex-row gap-8 items-start">

          {/* ── LEFT COLUMN ──────────────────────────────────── */}
          <div className="flex-1 min-w-0 flex flex-col gap-8">

            <ListingHeader
              title={listing_detail?.title}
              street_address={listing_detail?.street_address}
              neighborhood={listing_detail?.neighborhood}
              city={listing_detail?.city}
              country={listing_detail?.country}
              specifications={specifications}
              is_verified={listing_detail?.is_verified}
              is_furnished={listing_detail?.is_furnished}
              is_a_wiyorent_house={listing_detail?.is_a_wiyorent_house}
              listing_id={id}
              available_from={listing_detail?.available_from}
            />

            <DescriptionSection description={listing_detail?.description} />

            <AmenitiesSection amenities={listing_detail?.amenities} />

            <HouseRulesSection house_rules={listing_detail?.house_rules} />

            <ReviewsSection listing_title={listing_detail?.title} listing_id={listing_detail?.listing_id} user_full_name={full_name} current_user={user} reviews={reviews} />

          </div>

          {/* ── RIGHT COLUMN — Sticky Sidebar ─────────────────── */}
          <aside className="w-full lg:w-80 xl:w-96 flex-shrink-0">
            <div className="lg:sticky lg:top-24">
              <PricingSidebar
                financials={financials}
                total_first_payment={total_first_payment}
                listing_id={listing_detail.listing_id}
                is_a_wiyorent_house={is_a_wiyorent_house}
                available_status={listing_detail?.available_status}
                is_on_waitlist={listing_detail?.is_on_waitlist}
              />
            </div>
          </aside>

        </div>
      </div>
    </div>
  );
}