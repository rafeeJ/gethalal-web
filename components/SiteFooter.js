import React from 'react'

export default function SiteFooter() {
    return (
        <footer className="justify-items-center bg-offwhite h-10 flex justify-center">
            <h1 className="font-merri text-center m-3">{new Date().getFullYear()} Rafee Jenkins</h1>
            <h1 className="font-merri text-center m-3">-</h1>
            <h1 className="font-merri text-center m-3 underline" onClick={() => { window.location.href = 'mailto:rafeejenkins@gmail.com' }}>Get in Touch</h1>
        </footer>
    )
}
