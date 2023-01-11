import React from 'react'

export const PulseButton = ({ type = undefined, className = '', pulse = true, title, url, color = 'white', callback }) => {
    return (
        <a onClick={() => callback()}>
            <div id="ping" className={`relative py-1`} >
                {pulse ? <div className="absolute w-2 h-2 -right-0.5 top-0.5">
                    <div className="w-2 h-2 bg-red-400 animate-ping absolute rounded-full"></div>
                    <div className="w-2 h-2 bg-red-500 absolute rounded-full"></div>
                </div> : <></>}
                <div id="button" style={{ backgroundColor: color }} className={`flex border rounded-lg shadow appearance-none ${className}`}>
                    <button type={type} className="grow px-8 py-1">{title}</button>
                </div>
            </div>
        </a>
    )
}