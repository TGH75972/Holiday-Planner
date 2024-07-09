function requestLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

function showPosition(position) {
    const lat = position.coords.latitude;
    const lng = position.coords.longitude;
    getFamousPlaces(lat, lng);
}

function showError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            alert("User denied the request for Geolocation.");
            break;
        case error.POSITION_UNAVAILABLE:
            alert("Location information is unavailable.");
            break;
        case error.TIMEOUT:
            alert("The request to get user location timed out.");
            break;
        case error.UNKNOWN_ERROR:
            alert("An unknown error occurred.");
            break;
    }
}

function getFamousPlaces(lat, lng) {
    const url = `https://en.wikipedia.org/w/api.php?action=query&list=geosearch&gscoord=${lat}|${lng}&gsradius=10000&gslimit=10&format=json&origin=*`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            displayPlaces(data.query.geosearch);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}

function displayPlaces(places) {
    const placesContainer = document.getElementById('places');
    placesContainer.innerHTML = '';

    places.forEach(place => {
        const placeDiv = document.createElement('div');
        placeDiv.className = 'place';
        
        const placeName = document.createElement('h2');
        placeName.textContent = place.title;
        placeDiv.appendChild(placeName);
        
        const placeDistance = document.createElement('p');
        placeDistance.textContent = `Distance: ${place.dist} meters`;
        placeDiv.appendChild(placeDistance);
        
        placesContainer.appendChild(placeDiv);
    });
}
