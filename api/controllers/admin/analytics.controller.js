import pool from "../../config/db.js"
import { errorMsg, successMsg } from "../../utils/returnMsg.js"

export const fetchAnalytics = async (req, res) => {
    try {
        const [mainResult, universitiesResult, locationsResult, nationalitiesResult] = await Promise.all([

            // ── Main aggregate ──────────────────────────────────────────────────
            pool.query(`
                SELECT
                    -- =====================
                    -- USER METRICS
                    -- =====================
                    (SELECT count(*) from users) as total_users,
                    (SELECT count(*) from users where is_onboarded = true) as total_number_of_onboarded_users,
                    (SELECT count(*) from users where is_onboarded = false) as total_number_of_non_onboarded_users,
                    (SELECT nationality from users GROUP BY users.nationality ORDER BY count(nationality) DESC LIMIT 1) as most_common_nationality,

                    (SELECT count(*) from users where verification_status = 'approved') as total_number_of_verified_users,
                    (SELECT count(*) from users where verification_status = 'pending') as total_number_of_pending_verification_users,
                    (SELECT count(*) from users where verification_status = 'rejected') as total_number_of_rejected_verification_users,

                    (SELECT count(*) from users where is_blocked = true) as total_number_of_blocked_users,
                    (SELECT count(*) from users where is_profile_public = false) as public_visibility_off,

                    (SELECT count(*) from users where urgency = 'not_urgent') as total_non_urgent_users,
                    (SELECT count(*) from users where urgency = 'slightly_urgent') as total_slightly_urgent_users,
                    (SELECT count(*) from users where urgency = 'extremely_urgent') as total_extremely_urgent_users,
                    (SELECT count(*) from users where urgency = 'flexible') as total_flexible_users,

                    (SELECT count(*) from users where has_house = true) as total_users_with_a_house,
                    (SELECT count(*) from users where gender = 'Male') as total_male_users,
                    (SELECT count(*) from users where gender = 'Female') as total_female_users,

                    (SELECT COUNT(*) FROM users WHERE created_at >= NOW() - INTERVAL '7 days') AS users_in_last_seven_days,
                    (SELECT COUNT(*) FROM users WHERE created_at >= NOW() - INTERVAL '30 days') AS users_in_last_30_days,

                    -- =====================
                    -- LISTING METRICS
                    -- =====================
                    (SELECT count(*) from listings) as total_listings,
                    (SELECT count(*) from listings where is_verified = true) as total_verified_listings,
                    (SELECT count(*) from listings where is_furnished = true) as total_furnished_listings,
                    (SELECT count(*) from listings where is_furnished = false) as total_unfurnished_listings,

                    (SELECT ROUND(avg(price_per_month)) from listings) as average_rent_per_month,
                    (SELECT ROUND(avg(commission_fee)) from listings) as average_commission_fee,
                    (SELECT ROUND(avg(caution_fee)) from listings) as average_caution_fee,

                    (SELECT count(*) from listings where created_at >= NOW() - INTERVAL '7 days') as new_listings_in_last_7_days,
                    (SELECT count(*) from listings where created_at >= NOW() - INTERVAL '30 days') as new_listings_in_last_30_days,

                    (SELECT count(*) from listings l LEFT JOIN listing_reviews lr ON lr.listing_id = l.id WHERE comment is not null) as total_number_of_listings_with_a_review,
                    (SELECT count(*) from listings l LEFT JOIN listing_reviews lr ON lr.listing_id = l.id WHERE comment is null) as total_number_of_listings_without_a_review,

                    (SELECT count(*) from listings l LEFT JOIN listing_reviews lr ON lr.listing_id = l.id WHERE rating = 5) as total_number_of_listings_with_five_stars,
                    (SELECT count(*) from listings l LEFT JOIN listing_reviews lr ON lr.listing_id = l.id WHERE rating BETWEEN 3 AND 5) as listing_with_three_to_five_stars,
                    (SELECT count(*) from listings l LEFT JOIN listing_reviews lr ON lr.listing_id = l.id WHERE rating < 3 AND rating != 0) as listing_with_one_to_three_stars,

                    -- =====================
                    -- MATCHING & ENGAGEMENT
                    -- =====================
                    (SELECT full_name from users ORDER BY view_count DESC LIMIT 1) as most_viewed_profile,
                    (SELECT view_count from users ORDER BY view_count DESC LIMIT 1) as most_viewed_profile_total_views,

                    (SELECT title from listings l left join saved_listings sl on sl.listing_id = l.id GROUP BY l.id, l.title ORDER by count(sl.listing_id) DESC LIMIT 1) as most_saved_listing,
                    (SELECT title from listings l left join waitlists w on w.listing_id = l.id GROUP BY l.id, l.title ORDER by count(w.listing_id) DESC LIMIT 1) as most_waitlisted_listing,
                    (SELECT title from listings ORDER BY view_count DESC LIMIT 1) as most_viewed_listing,
                    (SELECT view_count from listings ORDER BY view_count DESC LIMIT 1) as most_viewed_listing_total_views,

                    (SELECT count(DISTINCT u.id) from users u left join waitlists w on w.user_id = u.id) as total_number_of_users_on_waitlist,

                    -- =====================
                    -- COMPATIBILITY INSIGHTS
                    -- =====================
                    (SELECT ROUND(AVG(min)) from users) as average_user_minimum_budget,
                    (SELECT ROUND(AVG(max)) from users) as average_user_maximum_budget,

                    (SELECT COUNT(*) FROM users WHERE sleep_schedule = 'Early Bird') AS total_early_birds,
                    (SELECT COUNT(*) FROM users WHERE sleep_schedule = 'Night Owl') AS total_night_owls,

                    (SELECT COUNT(*) FROM users WHERE is_smoker = true) AS total_smokers,
                    (SELECT COUNT(*) FROM users WHERE is_smoker = false) AS total_non_smokers,

                    (SELECT COUNT(*) FROM users WHERE has_pet = true) AS total_pet_owners,
                    (SELECT COUNT(*) FROM users WHERE has_pet = false) AS total_non_pet_owners,

                    (SELECT COUNT(*) FROM users WHERE is_private_room_required = true) AS prefers_private_room,
                    (SELECT COUNT(*) FROM users WHERE is_private_room_required = false) AS does_not_prefer_private_room
            `),

            // ── University breakdown ────────────────────────────────────────────
            pool.query(`
                SELECT university_name AS university, COUNT(*) AS total
                FROM users
                WHERE university_name IS NOT NULL
                GROUP BY university_name
                ORDER BY total DESC
            `),

            // ── Preferred locations breakdown ───────────────────────────────────
            pool.query(`
                SELECT location, count(*) as total
                FROM users, UNNEST(preferred_locations) as location
                WHERE preferred_locations IS NOT NULL
                GROUP BY location
                ORDER BY total DESC
            `),

            // ── Nationality breakdown ───────────────────────────────────────────
            pool.query(`
                SELECT nationality, count(*) as total
                FROM users
                GROUP BY nationality
                ORDER BY total DESC
            `),
        ])

        const analytics = {
            ...mainResult.rows[0],
            universities: universitiesResult.rows,
            preferred_locations: locationsResult.rows,
            nationalities: nationalitiesResult.rows,
        }

        console.log(analytics, '---admin analytics')

        return successMsg(res, 200, '', analytics)

    } catch (error) {
        console.error('Error occurred on fetchAnalytics:', error)
        return errorMsg(res, 500, 'Something went wrong on our end. Please check your connection, refresh the page, or try again later. If the issue persists, contact support at wiyorent@gmail.com.')
    }
}
