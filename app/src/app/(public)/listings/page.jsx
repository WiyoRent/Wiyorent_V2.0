
import ListingsGrid from '@/components/public/listings/ListingsGrid.jsx';
import FilterSidebar from '@/components/public/listings/FilterSidebar.jsx';
import ListingCard from '@/components/public/listings/ListingCard';
import { getListingsProxy } from '@/services/public/listings.service';

// Mock listings data matching the required data structure
// const listings = [
//   {
//     listing_id: "house_8821",
//     title: "Modern Room in Kicukiro",
//     financials: {
//       price_per_month: 150000,
//       commission_fee: 15000,
//       caution_fee: 150000,
//     },
//     specifications: {
//       bedroom_number: 1,
//       bathroom_number: 1,
//       max_roommates: 2,
//       property_type: "room",
//     },
//     amenities: ["wifi", "stove", "microwave", "blender"],
//     neighborhood: "Kicukiro",
//     city: "Kigali",
//     available_status: "booked",
//     is_furnished: true,
//     thumbnail_url: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80",
//   },
//   {
//     listing_id: "house_8822",
//     title: "Cozy Studio in Nyarugenge",
//     financials: {
//       price_per_month: 120000,
//       commission_fee: 12000,
//       caution_fee: 120000,
//     },
//     specifications: {
//       bedroom_number: 1,
//       bathroom_number: 1,
//       max_roommates: 1,
//       property_type: "studio",
//     },
//     amenities: ["wifi", "microwave"],
//     neighborhood: "Nyarugenge",
//     city: "Kigali",
//     available_status: "booked",
//     is_furnished: false,
//     thumbnail_url: "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=600&q=80",
//   },
//   {
//     listing_id: "house_8823",
//     title: "Shared Villa in Gasabo",
//     financials: {
//       price_per_month: 250000,
//       commission_fee: 25000,
//       caution_fee: 250000,
//     },
//     specifications: {
//       bedroom_number: 3,
//       bathroom_number: 2,
//       max_roommates: 4,
//       property_type: "villa",
//     },
//     amenities: ["wifi", "stove", "microwave", "blender"],
//     neighborhood: "Gasabo",
//     city: "Kigali",
//     available_status: "available",
//     is_furnished: true,
//     thumbnail_url: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=600&q=80",
//   },
//   {
//     listing_id: "house_8824",
//     title: "1 Bedroom House in Zindiro",
//     financials: {
//       price_per_month: 80000,
//       commission_fee: 8000,
//       caution_fee: 80000,
//     },
//     specifications: {
//       bedroom_number: 1,
//       bathroom_number: 1,
//       max_roommates: 2,
//       property_type: "house",
//     },
//     amenities: ["wifi", "stove"],
//     neighborhood: "Zindiro",
//     city: "Kigali",
//     available_status: "available",
//     is_furnished: true,
//     thumbnail_url: "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=600&q=80",
//   },
//   {
//     listing_id: "house_8825",
//     title: "Budget Room in Kimironko",
//     financials: {
//       price_per_month: 60000,
//       commission_fee: 6000,
//       caution_fee: 60000,
//     },
//     specifications: {
//       bedroom_number: 1,
//       bathroom_number: 1,
//       max_roommates: 1,
//       property_type: "room",
//     },
//     amenities: ["wifi"],
//     neighborhood: "Kimironko",
//     city: "Kigali",
//     available_status: "available",
//     is_furnished: false,
//     is_verified: false,
//     thumbnail_url: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
//   },
//   {
//     listing_id: "house_8826",
//     title: "Luxury Apartment in Remera",
//     financials: {
//       price_per_month: 300000,
//       commission_fee: 30000,
//       caution_fee: 300000,
//     },
//     specifications: {
//       bedroom_number: 2,
//       bathroom_number: 2,
//       max_roommates: 3,
//       property_type: "apartment",
//     },
//     amenities: ["wifi", "stove", "microwave", "blender"],
//     neighborhood: "Remera",
//     city: "Kigali",
//     available_status: "booked",
//     is_furnished: true,
//     is_verified: true,
//     thumbnail_url: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&q=80",
//   },
// ];

// const fetchListings = async () => {
//   try {
//     console.log(proxyListings, '---proxylistings')

//     const url = getBaseURL() + 'api/v1/public/getListings'
//     const response = await fetch(url)

//     if(!response.ok){
//       throw new Error("An error occured, couldn't fetch listings")
//     }

//     const result = await response.json()
//     return result.data
      
//   } catch (error) {
//       console.error(error)
//   }
// };



// Mock filter options - in production these come from the backend
const filter_options = {
  price_range: {
    min: 50000,
    max: 300000,
  },
  neighborhoods: [
    "Kicukiro",
    "Nyarugenge",
    "Gasabo",
    "Zindiro",
    "Kimironko",
    "Remera",
    "Gisozi",
    "Gikondo",
  ],
  furnishing_options: ["furnished", "unfurnished"],
  availability_options: ["available", "booked"],
};

export default async function ListingsPage({searchParams}) {

  const params = await searchParams
  const queryString = new URLSearchParams(params).toString()
  const listings = await getListingsProxy(queryString)


  return (
    <main className="min-h-screen bg-base-200">
      {/* Page Header */}
      <div className="bg-base-100 border-b border-base-300">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="font-primary text-4xl sm:text-5xl font-extrabold text-base-content uppercase tracking-tight">
            Verified Student Homes
          </h1>
          <p className="font-secondary text-base-content/60 mt-2 text-base">
            {listings?.length} homes available across Kigali
          </p>
        </div>
      </div>

      {/* Main Layout */}
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="lg:w-72 flex-shrink-0">
            <FilterSidebar filter_options={filter_options} />
          </aside>

          {/* Listings Grid */}
          <div className="flex-1 min-w-0">
            <ListingsGrid listings={listings} />
          </div>
        </div>
      </div>
    </main>
  );
}