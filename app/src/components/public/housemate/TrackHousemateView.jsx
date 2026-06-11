'use client'

import { useEffect } from 'react';
import { trackHousemateView } from '@/actions/public/track_view.action';

// Renders nothing - fires the trackHousemateView server action once on mount
// to record a profile view (server-side dedupes repeat views per hour via a
// session cookie).
export default function TrackHousemateView({ housemate_id }) {
    useEffect(() => {
        trackHousemateView(housemate_id)
    }, [housemate_id])

    return null
}
