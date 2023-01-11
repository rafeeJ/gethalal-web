import React, { useEffect, useState } from 'react'
import { isAndroid, isIOS } from 'react-device-detect'
import AndroidBadge from './AndroidBadge'
import IOSBadge from './IOSBadge'

export default function AppBadge() {
    const [isIOSDevice, setIsIOSDevice] = useState(false)

    useEffect(() => {
        setIsIOSDevice(isIOS)
    }, [])

    return isIOSDevice ? <IOSBadge /> : <AndroidBadge />

}
