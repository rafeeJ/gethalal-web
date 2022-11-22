import { Status, Wrapper } from '@googlemaps/react-wrapper'
import React, { useEffect, useRef } from 'react'

const render = (status) => {
    if (status === Status.LOADING) return <h3>{status} ..</h3>;
    if (status === Status.FAILURE) return <h3>{status} ...</h3>;
    return null;
};

const MapComponentTest = ({ zoom, center }) => {
    const ref = useRef();

    useEffect(() => {
        new window.google.maps.Map(ref.current, {
            center,
            zoom,
        });
    });

    return <div className='w-80 h-80' ref={ref} id="map" />;
};

export default function RestaurantCard() {

    const center = { lat: -34.397, lng: 150.644 };
    const zoom = 4;

    return (
        <div className='inline-flex flex-row bg-white justify-center p-5 rounded-xl'>
            <Wrapper apiKey={process.env.GOOGLE_MAPS_API} render={render}>
                <MapComponentTest center={center} zoom={zoom} />
            </Wrapper>
            <div className='w-80 h-80 bg-green-600' />
        </div>
    )
}
