import React, { useEffect, useState } from 'react';

const Map = () => {
    const [map, setMap] = useState(null);
    const [vehicleData, setVehicleData] = useState([]);

    useEffect(() => {
        const initializeMap = () => {
            const googleMaps = window.google.maps;
            const mapOptions = {
                zoom: 15,
                center: { lat: 17.385044, lng: 78.486671 },
                mapTypeId: googleMaps.MapTypeId.ROADMAP
            };
            const mapInstance = new googleMaps.Map(document.getElementById('map'), mapOptions);
            setMap(mapInstance);
        };

        // Initialize the map when Google Maps script is loaded
        if (window.google && window.google.maps) {
            initializeMap();
        } else {
            const script = document.createElement('script');
            script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`;
            script.async = true;
            script.defer = true;
            script.onload = initializeMap; // Call directly after loading
            document.head.appendChild(script);
        }
    }, []);

    useEffect(() => {
        const fetchVehicleData = async () => {
            try {
                const response = await fetch('https://vehicle-movement-fullstack-app.onrender.com/api/vehicle/data');
                const data = await response.json();
                setVehicleData(data);
            } catch (error) {
                console.error('Error fetching vehicle data:', error);
            }
        };

        fetchVehicleData();
        const intervalId = setInterval(fetchVehicleData, 5000); // Fetch data every 5 seconds

        return () => clearInterval(intervalId); // Cleanup on component unmount
    }, []);

    useEffect(() => {
        const updateMap = () => {
            if (map && vehicleData.length > 0) {
                const googleMaps = window.google.maps;

                // Clear existing markers and path
                map.markers?.forEach(marker => marker.setMap(null));
                map.path?.setMap(null);

                // Create markers and path
                const pathCoordinates = vehicleData.map(item => ({
                    lat: item.latitude,
                    lng: item.longitude
                }));

                // Center map on the first coordinate
                map.setCenter(pathCoordinates[0]);

                // Create and store markers
                const markers = pathCoordinates.map(coord => new googleMaps.Marker({
                    position: coord,
                    map: map,
                    icon: 'https://maps.google.com/mapfiles/ms/icons/car.png' // Vehicle icon
                }));
                map.markers = markers;

                // Draw path
                const path = new googleMaps.Polyline({
                    path: pathCoordinates,
                    geodesic: true,
                    strokeColor: '#FF0000',
                    strokeOpacity: 1.0,
                    strokeWeight: 2,
                    map: map
                });
                map.path = path;
            }
        };

        updateMap();
    }, [map, vehicleData]);

    return (
        <div id="map" style={{ height: '100vh', width: '100%' }}></div>
    );
};

export default Map;
