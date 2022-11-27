import { GoogleMap, MarkerF, useLoadScript } from '@react-google-maps/api'
import { useRouter } from 'next/router'
import React, { useState } from 'react'

const WrapperMarker = ({ position, idx}) => {
    return(
        <MarkerF key={idx} position={position}/>
    )
}

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

    return (
        <div>
            {
                points ?
                    <GoogleMap center={center} zoom={idx || idx === 0 ? 16 : 9} mapContainerClassName="w-80 md:w-[30rem] h-80 rounded-md">
                        {
                            points.map((point, idx) => {
                                try {
                                    const coord = { lat: points[idx].geometry.location.lat, lng: points[idx].geometry.location.lng }
                                    return (<MarkerF key={idx} position={coord} onClick={() => router.push(`/${region}/${point.place_id}`)}/>)
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

    const renderItem = (index, key) => {
        return (
        <div key={key} className="bg-white mb-1 p-1 rounded-md inline-flex flex-1 shadow-md" onClick={() => setIndex(index)}>
            {restaurants[index].name}
        </div>
        );
    }

    return (
        <div className='inline-flex flex-col md:flex-row bg-rose-300 justify-center p-5 rounded-xl shadow-2xl' onMouseLeave={() => setIndex(null)}>
            <Map points={restaurants} idx={index}/>
            <div className='overflow-auto max-h-80 w-80 grid grid-cols-1 md:px-5'>
                {
                    restaurants.map((r, i) => renderItem(i, r))
                }
            </div>
        </div>
    )
}