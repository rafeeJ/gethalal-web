import React, { useEffect } from 'react'

export const MapComponent = ({ zoom, center }) => {
    const ref = useRef();

    useEffect(() => {
      new window.google.maps.Map(ref.current, {
        center,
        zoom,
      });
    });
  
    return <div ref={ref} id="map" />;
};
