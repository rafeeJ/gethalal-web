import React from 'react'

export default function CardButton({ title, url, color='white' }) {
    return (
        <a href={url}>
            <div style={{backgroundColor: color}} className='border-black border flex justify-center rounded-sm shadow-lg text-black'>
                <text>{title}</text>
            </div>
        </a>
    )
}
