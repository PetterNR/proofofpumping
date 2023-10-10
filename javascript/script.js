
function some()
{
    return 1;
}

function isWithin100Meters(position) {
    const targetLat = 59.83012592192113;
    const targetLng = 10.41323448452563;
    const radius = 100; // in meters

    function toRad(deg) {
        return deg * (Math.PI/180);
    }

    const lat1 = position.coords.latitude;
    const lon1 = position.coords.longitude;
    const lat2 = targetLat;
    const lon2 = targetLng;

    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);

    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
              Math.sin(dLon/2) * Math.sin(dLon/2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    const distance = 6371000 * c; // Radius of the Earth in meters

    return distance <= radius;
}

function checkLocation() {
    navigator.geolocation.getCurrentPosition(
        (position) => {
            if (isWithin100Meters(position)) {
                console.log("Within 100 meters");
            } else {
                console.log("Not within 100 meters");
            }
        },
        (error) => {
            console.error('Error getting geolocation:', error);
        }
    );
}
setInterval(checkLocation, 5000);

