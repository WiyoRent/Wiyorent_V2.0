import { auth } from "@/auth"
import { getBaseURL } from "@/lib/getBaseURL"



export const fetchHousemates = async () => { 

    const session = await auth()
    const userId = session?.user?.id || null

    try {
        const url = getBaseURL() + 'api/v1/public/fetchHousemates'

        const response = await fetch(url, {
            headers : {
                'X-Internal-API-Key' : process.env.INTERNAL_BACKEND_KEY,
                'X-User-Id' : userId
            }
        }) 

        const result = await response.json()

        console.log(result, '--result fetch housemate')

        return result.data || []
    } catch (error) {
        console.error("Proxy Fetch Housemates Error", error)
        return [] 
    }
}

export const fetchHousemateDetail = async (housemateId) => {
    const session = await auth();
    const userId = session?.user?.id || null;

    const url = getBaseURL() + `api/v1/public/fetchHousemate/${housemateId}`;

    try {
        const response = await fetch(url, {
            headers: {
                'X-Internal-API-Key': process.env.INTERNAL_BACKEND_KEY,
                'X-User-ID': userId
            }
        });

        if (!response.ok) {
            throw new Error("An error occurred on fetch housemate details");
        }

        const result = await response.json();
        const rawData = result.data;

        if (!rawData) return null;

        console.log(rawData, '--rawdata fetch housemate')


        // --- Mapping logic to match your frontend expectation ---
        const mappedData = {
            profile_id: rawData.id,
            full_name: rawData.full_name,
            nationality: rawData.nationality,
            university_name: rawData.university_name,
            avatar_url: rawData.avatar_url,
            is_verified: rawData.is_verified,
            gender: rawData.gender?.toLowerCase(),
            about_me: rawData.about_me,
            preferred_method : rawData.preferred_method,
            urgency : rawData.urgency,
            
            basic_profile: {
                gender: rawData.gender,
                age: rawData.age,
                program: rawData.program,
                year_of_study: `${rawData.year_of_study} Year`, // Formatting as string like '3rd Year'
            },

            housing_preferences: {
                move_in_date: rawData.move_in_date?.split('T')[0], // Extracting date YYYY-MM-DD
                budget: { 
                    min: rawData.min, 
                    max: rawData.max 
                },
                max_housemates: rawData.max_housemates,
                preferred_locations: rawData.preferred_locations || [],
                is_furnished_preferred: rawData.is_furnished_preferred,
                allows_pets: rawData.allows_pets,
                is_smoker: rawData.is_smoker,
            },

            lifestyle_personality: {
                sleep_schedule: rawData.sleep_schedule,
                cleanliness: rawData.cleanliness,
                social_habits: rawData.social_habits,
            },

            saved : rawData.saved, 

            user_listing_data : rawData.price ? {
                price: rawData?.price,
                caution_fee : rawData?.caution_fee,
                bedrooms : rawData?.bedrooms,
                bathrooms : rawData?.bathrooms,
                is_furnished : rawData?.is_furnished,
                description : rawData?.description,
                neighborhood : rawData?.neighborhood,
                city: rawData?.city,
                available_from : rawData?.available_from,
                housemate_gender : rawData?.gender,
                amenities : rawData?.amenities,
                house_rules : rawData?.house_rules,
                image_urls : rawData?.image_urls
            } : null
        };

        console.log(mappedData, '--maped data ftch housemate')

        return mappedData;

    } catch (error) {
        console.error("Proxy Fetch Error:", error);
        return null; 
    }
}