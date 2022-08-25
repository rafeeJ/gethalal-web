import React from 'react'

export default function SiteFooter() {
    return (
        <footer className="justify-items-center bg-offwhite h-10 flex justify-center">
            <h1 className="font-merri text-center m-3">{new Date().getFullYear()} Relli</h1>
            <h1 className="font-merri text-center m-3">-</h1>
            <h1 className="font-merri text-center m-3 underline" onClick={() => { window.location.href = 'mailto:me@rafeejenkins.com' }}>Get in Touch</h1>
        </footer>
    )
}
