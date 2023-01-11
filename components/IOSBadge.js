import Image from 'next/future/image'
import React from 'react'
import ios from '../public/badges/ios.svg';

export default function IOSBadge() {
    return (
        <a><Image src={ios} alt="GetHalal iOS App" width={100} height={100} /></a>
    )
}
