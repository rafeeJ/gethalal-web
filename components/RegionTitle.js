import { startCase } from 'lodash';
import React, { useEffect, useState } from 'react'
import TextTransition, { presets } from "react-text-transition";

export default function RegionTitle({ regions }) {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setIndex(index => index + 1)
        },
            3000 // every 3 seconds
        );
        return () => clearTimeout(intervalId);
    }, [])

    return (
        <div className="flex flex-col justify-center items-center">
            <div className="text-4xl font-semibold">
                Find halal restaurants, in:
                <div className="font-bold mb-2 flex justify-center">
                    <TextTransition springConfig={presets.wobbly}>{startCase(regions[index % regions.length])}</TextTransition>
                </div>
            </div>
        </div>
    )
}
