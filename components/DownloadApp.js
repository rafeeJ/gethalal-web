import Image from 'next/future/image'
import React from 'react'
import { isDesktop, isMobile } from 'react-device-detect'
import AndroidBadge from './AndroidBadge'
import AppBadge from './AppBadge'
import IOSBadge from './IOSBadge'


export default function DownloadApp() {
    return (
        <div className="flex flex-col justify-center items-center">
            <div>Find GetHalal on the App Store!</div>
            <div className="flex flex-row justify-center items-center w-full">
                {isDesktop &&
                    <div className="flex flex-row justify-center items-center">
                        <AndroidBadge />
                        <IOSBadge />
                    </div>
                }
                {
                    isMobile && <AppBadge />
                }

            </div>
        </div>
    )
}
