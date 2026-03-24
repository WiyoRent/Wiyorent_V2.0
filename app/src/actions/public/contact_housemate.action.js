"use server"

import { auth } from "@/auth";
import { getBaseURL } from "@/lib/getBaseURL";

export async function contactHousemate (profile_id){

    const session = await auth()
    const userId = session?.user?.id || null

    try {
        const endpoint = getBaseURL() + `api/v1/public/fetchHousemateContactDetail/${profile_id}`

        const response = await fetch(endpoint, {
            headers : {
                'X-INTERNAL-API-KEY' : process.env.INTERNAL_BACKEND_KEY,
                'X-User-Id' : userId
            }
        })

        if(!response.ok){
            throw new Error("An error occured when fetching user contact")
        }

        const result = await response.json()
        const housemate = result.data[0]

        if(!result){
            return null
        }

        if(housemate?.preferred_method == 'email'){

            const senderName = session?.user?.full_name || "A student";
            const subject = encodeURIComponent(`New Housemate Inquiry - Wiyorent (${senderName})`);

            // Using backticks for a clean, readable layout
            const body = encodeURIComponent(
            `Hi there,

            I found your profile on Wiyorent while looking for housemates in Kigali. I liked your bio and think we might be a good match for a shared space!

            I'd love to chat more about your preferences and perhaps meet up at the campus or a cafe to discuss.

            Best regards,
            ${senderName}
            Sent via Wiyorent`
            );

            return {
                url : `mailto:${housemate.email}?subject=${subject}&body=${body}`,
                preferred_contact_method : housemate.preferred_method
            };
        }
        
        const senderName = session?.user?.full_name || "A student";
        // Including "Wiyorent" so they know it's about the house-hunting app
        const message = encodeURIComponent(
            `Hi! I'm ${senderName}. 🏠 I saw your profile on the Wiyorent website and I'm interested in being your housemate! Are you still looking?`
        );

        const cleanNumber = housemate?.phone_number?.replace(/\D/g, '');        
        return {
            url : `https://wa.me/${cleanNumber}?text=${message}`,
            preferred_contact_method : housemate.preferred_method
        };
    } catch (error) {
        console.error(error)
        return null
    }
    
}