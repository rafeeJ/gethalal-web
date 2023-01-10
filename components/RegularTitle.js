import React from 'react'

export default function RegularTitle({ className = '' }) {
    return (
        <div className={`text-4xl font-semibold drop-shadow-xl ${className}`}>Find halal restaurants. <div className="font-bold">Fast.</div></div>
    )
}
