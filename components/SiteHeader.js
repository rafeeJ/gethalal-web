import React from 'react'
import Image from "next/future/image"

import icon from '../public/icon.svg'

export default function SiteHeader() {
    return (
        <div className='flex h-10 m-2'>
            <div className='flex flex-row items-center'>
                <Image src={icon} alt='logo' style={{ width: 40, height: 40 }} />
                <text className='text-2xl'>GetHalal</text>
            </div>
        </div>
    )
}
