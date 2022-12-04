import { GoogleMap, MarkerF, OverlayViewF, useLoadScript } from '@react-google-maps/api'
import { useRouter } from 'next/router'
import React, { useState, useRef } from 'react'
import { PulseButton } from './PulseButton'
import { FiArrowUp } from "react-icons/fi"

const Map = ({ points, idx }) => {
    const { isLoaded } = useLoadScript({ googleMapsApiKey: process.env.GOOGLE_MAPS_API, })
    const center = { lat: points[idx || idx === 0 ? idx : 0].geometry.location.lat, lng: points[idx ? idx : 0].geometry.location.lng }

    const router = useRouter();
    const {
        query: { region },
    } = router;

    if (!isLoaded) {
        return (<div>Loading</div>)
    }

    const centerOverlay = (w, h) => {
        return {
            x: -(w / 2),
            y: -(h / 2) - 45
        }
    }

    return (
        <div>
            {
                points ?
                    <GoogleMap center={center} zoom={idx || idx === 0 ? 16 : 9} mapContainerClassName="w-80 md:w-[30rem] h-[30rem] rounded-md">
                        {
                            points.map((point, idx) => {
                                try {
                                    const coord = { lat: points[idx].geometry.location.lat, lng: points[idx].geometry.location.lng }
                                    return (
                                        <>
                                        <OverlayViewF position={coord} mapPaneName={'markerLayer'} getPixelPositionOffset={centerOverlay}>
                                            <div className='bg-orange-500 p-1 rounded-md' id='marker-ting'>{point.name}</div>
                                        </OverlayViewF>
                                            <MarkerF key={idx} position={coord} onClick={() => router.push(`/${region}/${point.place_id}`)}/>
                                        </>
                                    )
                                } catch (error) {
                                    console.error(error)
                                }

                            })
                        }
                    </GoogleMap> : <>ree</>
            }
        </div>
    )
}

export default function RegionCard({ restaurants }) {

    const [index, setIndex] = useState(null)
    const topRef = useRef(null)

    const renderItem = (index, key) => {
        return (
            <PulseButton 
            color='' 
            className='hover:bg-lime-100' 
            pulse={false} 
            key={key} 
            title={restaurants[index].name} 
            callback={() => setIndex(index)} />
        )
    }
    const handleScroll = () => {
        topRef.current.scrollTo({
            top: topRef.current,
            behaviour: "smooth"
        })
    }

    return (
        <div className='inline-flex flex-col md:flex-row bg-white justify-center p-5 rounded-xl shadow-2xl align-middle' onMouseLeave={() => setIndex(null)}>
            <div className="flex items-center">
                <Map points={restaurants} idx={index} />
            </div>
            <div className="relative">
                <div>
                    <h1 className='font-serif text-xl text-center'>Restaurants</h1>
                    <h1 className='font-serif text-md text-center'>Click on a pin to learn more.</h1>
                </div>
                <div ref={topRef} className='overflow-auto h-[27rem] w-80 grid grid-cols-1 md:px-5 scroll-smooth'>
                    {
                        restaurants.map((r, i) => renderItem(i, r))
                    }
                    <div className="bg-rose-400 p-2 rounded-full absolute right-0 bottom-0" onClick={() => handleScroll()}>
                        <FiArrowUp color="white" />
                    </div>
                </div>
            </div>
        </div>
    )
}