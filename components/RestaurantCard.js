import { GoogleMap, MarkerF, useLoadScript } from '@react-google-maps/api';
import React from 'react';

const Map = ({ marker }) => {
    const center = {lat: marker.lat, lng: marker.lng}
    
    const { isLoaded } = useLoadScript({ googleMapsApiKey: process.env.GOOGLE_MAPS_API, })

    if (!isLoaded) {
        return (<div>Loading</div>)
    }
    return (
    <GoogleMap zoom={12} center={center} mapContainerClassName="w-80 h-80">
        <MarkerF position={center} />
    </GoogleMap>)
}

export default function RestaurantCard({ restaurant }) {
    return (
        <div className='inline-flex flex-col md:flex-row bg-white justify-center p-5 rounded-xl shadow-2xl'>
            <Map marker={restaurant?.geometry?.location} />
            <div className='w-80 h-80 bg-green-600 rounded-r-xl'>
                {restaurant?.name}
            </div>
        </div>
    )
}
