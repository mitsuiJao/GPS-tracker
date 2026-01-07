import { useEffect } from "react";

function CalcDist({ items, setDist }) {
    let totalDistance = 0;
    useEffect(() => {
        items.forEach((element, index) => {
            if (index === 0) return;
            if (index === items.length - 1) return;
            const from = new window.google.maps.LatLng(element.lat, element.lng);
            const to = new window.google.maps.LatLng(items[index + 1].lat, items[index + 1].lng);
            totalDistance += window.google.maps.geometry.spherical.computeDistanceBetween(from, to);
        });
        setDist(totalDistance);
    }, [items]);

    // return (
    //     <Text>Distance: {totalDistance}</Text>
    // );
}

export default CalcDist;