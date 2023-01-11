import { logEvent } from 'firebase/analytics';
import Image from 'next/future/image';
import React from 'react'
import { analytics } from '../firebase/clientApp';
import android from '../public/badges/android.png';

export default function AndroidBadge() {
    const handleAndroidClick = () => {
        window.open('https://play.google.com/store/apps/details?id=com.jenkins.halalmaps&pli=1', '_blank');
        // log analytics
        logEvent(analytics, 'click_android_badge', {
            content_type: 'badge',
            item_id: 'android_badge'
        })
    }
    return (
        <a onClick={handleAndroidClick}>
            <Image src={android} alt="GetHalal Android App" width={100} height={130} />
        </a>
    )
}
