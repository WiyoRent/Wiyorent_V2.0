'use client'

import { useEffect } from 'react';
import { trackHousemateView } from '@/actions/public/track_view.action';

export default function TrackHousemateView({ housemate_id }) {
    useEffect(() => {
        trackHousemateView(housemate_id)
    }, [housemate_id])

    return null
}
