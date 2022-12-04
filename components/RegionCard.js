import { GoogleMap, MarkerF, OverlayViewF, useLoadScript } from '@react-google-maps/api'
import { useRouter } from 'next/router'
import React, { useState, useRef, useEffect } from 'react'
import { PulseButton } from './PulseButton'
import { FiArrowUp } from "react-icons/fi"
import { filter } from 'lodash'

const Map = ({ points, selectedRestaurantID }) => {
    const [res, setRes] = useState(null);
    const { isLoaded } = useLoadScript({ googleMapsApiKey: process.env.GOOGLE_MAPS_API, });

    useEffect(() => {
        if (!selectedRestaurantID) {
            setRes(null)
        }
        const objects = filter(points, { place_id: selectedRestaurantID })
        setRes(objects[0])
    }, [selectedRestaurantID, points])

    const center = res ?
        { lat: res.geometry.location.lat, lng: res.geometry.location.lng } :
        { lat: points[0].geometry.location.lat, lng: points[0].geometry.location.lng }

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
                    <GoogleMap center={center} zoom={selectedRestaurantID ? 16 : 9} mapContainerClassName="w-80 md:w-[30rem] h-[30rem] rounded-md">
                        {
                            points.map((point, idx) => {
                                try {
                                    const coord = { lat: points[idx].geometry.location.lat, lng: points[idx].geometry.location.lng }
                                    return (
                                        <>
                                            <MarkerF key={idx} position={coord} onClick={() => router.push(`/${region}/${point.place_id}`)} />
                                            {
                                                selectedRestaurantID === point.place_id ?
                                                    <OverlayViewF key={idx} position={coord} mapPaneName={'markerLayer'} getPixelPositionOffset={centerOverlay}>
                                                        <div onClick={() => router.push(`/${region}/${point.place_id}`)} className='animate-bounce flex flex-col justify-center items-center'>
                                                            <div className='bg-rose-200 p-1 rounded-md'>{point.name}</div>
                                                            <div className="w-4 border-solid border-t-rose-200 border-t-8 border-x-transparent border-x-8 border-b-0" />
                                                        </div>
                                                    </OverlayViewF>
                                                    : <></>
                                            }

                                        </>
                                    )
                                } catch (error) { }

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

    const renderItem = (index, restaurant) => {
        return (
            <PulseButton
                color=''
                className='hover:bg-lime-100'
                pulse={false}
                key={index}
                title={restaurant.name}
                callback={() => setIndex(restaurant.place_id)} />
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
                <Map points={restaurants} selectedRestaurantID={index} />
            </div>

            <div className="relative">
                <div>
                    <h1 className='font-serif text-xl text-center'>Restaurants</h1>
                    <h1 className='font-sans text-sm text-center'>Click a name below to zoom in!</h1>
                    <h1 className='font-sans text-sm text-center'>Tap the pin to find out more.</h1>
                </div>

                <div ref={topRef} className='overflow-auto h-[26rem] w-80 grid grid-cols-1 md:px-5 scroll-smooth'>
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