import { GoogleMap, MarkerF, useLoadScript } from '@react-google-maps/api';
import React from 'react';
import CardButton from './CardButton';
import { FiXCircle, FiCheckCircle } from "react-icons/fi";
import { chunk } from 'lodash';
import { analytics } from '../firebase/clientApp';
import { logEvent } from 'firebase/analytics';

const Map = ({ marker }) => {
    const center = { lat: marker.lat, lng: marker.lng }

    const { isLoaded } = useLoadScript({ googleMapsApiKey: process.env.GOOGLE_MAPS_API, })

    if (!isLoaded) {
        return (<div>Loading</div>)
    }
    return (
        <GoogleMap zoom={12} center={center} mapContainerClassName="w-80 md:w-[30rem] h-80">
            <MarkerF position={center} />
        </GoogleMap>)
}

const Chip = ({ title }) => {
    return (
        <div className='bg-red-200 rounded-full p-1.5 inline-flex text-sm shadow-md' >
            <text>{title}</text>
        </div>
    )
};

const CategoryRows = ({ categories }) => {
    const chunks = chunk(categories, 3);
    const chunkedViews = [];

    chunks.forEach(chunk => {
        let row =
            <div className='flex mb-1 justify-around'>
                {
                    chunk.map((cat, idx) => <Chip key={idx} title={cat} />)
                }
            </div>
        chunkedViews.push(row)
    });

    return (
        <div className='flex flex-col'>
            {
                chunkedViews
            }
        </div>
    )
};

const IconWrapper = ({ isPositive = true, color = 'orange' }) => {
    return (
        <div style={{ backgroundColor: color }} className="p-0.5 rounded-full">
            {isPositive ?
                <FiCheckCircle color='white' /> :
                <FiXCircle color='white' />
            }
        </div>
    )
}

const RestaurantInfo = ({ fullHalal, servesAlcohol }) => {
    return (
        <div className='flex flex-row justify-around rounded-sm my-2'>

            <div className='flex flex-col justify-center'>
                <text>Serves Alcohol</text>
                <div className='mx-auto'>
                    <IconWrapper isPositive={!servesAlcohol} color={servesAlcohol ? 'green' : 'orange'} />
                </div>
            </div>

            <div className='w-px h-100% bg-gray-200'></div>

            <div className='flex flex-col justify-center align-middle'>
                <text>Fully Halal Menu</text>
                <div className='mx-auto'>
                    <IconWrapper isPositive={!fullHalal} color={fullHalal ? 'orange' : 'green'} />
                </div>
            </div>

        </div>
    )
};

const PulseButton = ({className='', pulse=true, title, url, color='white', callback}) => {
    return (
        <a onClick={() => callback()}>
        <div id="ping" className={`relative py-1 my-2`} >
            { pulse ? <div className="absolute w-2 h-2 -right-0.5 top-0.5">
                <div className="w-2 h-2 bg-red-400 animate-ping absolute rounded-full"></div>
                <div className="w-2 h-2 bg-red-500 absolute rounded-full"></div>
            </div> : <></>}
            <div id="button" style={{backgroundColor: color}} className={`flex border rounded-lg shadow appearance-none ${className}`}>
                <button  className="grow px-8 py-1">{title}</button>
            </div>
        </div>
        </a>
    )
}

const handleVisitWebsite = ( url, name ) => {
    window.open(url)
    
    logEvent(analytics, "visit_restaurant_website", {
        restaurant: name,
        url: url,
        source: 'website'
    })
}

const handleVisitApp = ( url ) => {
    window.open(url)

    logEvent(analytics, "visit_ios_listing")
}

export default function RestaurantCard({ restaurant }) {
    return (
        <div className='inline-flex flex-col md:flex-row bg-rose-300 justify-center p-5 rounded-xl shadow-2xl'>
            <Map marker={restaurant?.geometry?.location} />
            <div className='w-80 h-80 bg-white p-4'>
                <h1 className='font-serif text-xl text-center'>{restaurant?.name}</h1>
                <RestaurantInfo fullHalal={restaurant?.fullHalal} servesAlcohol={restaurant?.servesAlcohol} />
                <CategoryRows categories={restaurant?.categories} />
                { restaurant.website ? 
                <PulseButton title='Visit their Website' pulse={false} callback={() => handleVisitWebsite(restaurant.website, restaurant?.name)}/> : <></>
                }
                <PulseButton title='Find out more in the app' color={'#84AF83'} callback={() => handleVisitApp('https://apps.apple.com/gb/app/gethalal-halal-food-near-you/id1637426257')}/>
            </div>
        </div>
    )
}
