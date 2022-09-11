import { logEvent } from 'firebase/analytics';
import React from 'react'
import { analytics } from '../firebase/clientApp';

export default function SiteFooter() {
    return (
        <footer className="justify-items-center bg-offwhite h-10 flex justify-center pb-2 md:pb-0">
            <h1 className="font-merri text-center m-3">{new Date().getFullYear()} Relli</h1>
            <h1 className="font-merri text-center m-3">-</h1>
            <h1 className="font-merri text-center m-3 underline" onClick={() => { window.location.href = 'mailto:rafee@gethalal.app'; logEvent(analytics, 'email_me') }}>Get in Touch</h1>
        </footer>
    )
}
