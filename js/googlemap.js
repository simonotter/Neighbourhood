function initMap() {

    var centerLocation = new google.maps.LatLng(53.370300, -1.491737);

    var mapOptions = {
        center: centerLocation,
        zoom: 15,
        scrollwheel: false,
        streetViewControl: false,
        mapTypeControl: false,
        scaleControl: true
    };

    map = new google.maps.Map(document.getElementById("map-container"),
        mapOptions);

}

// Populates the infoWindow when the marker is clicked. Only one infoWindow
// which will open at the marker that is clicked and populate based on that
// marker's content.
function populateInfoWindow(marker, infoWindow) {
    // Check to make sure the infoWindow is not already opened on this marker.
    if (infoWindow.marker !=marker) {
        infoWindow.marker = marker;
        infoWindow.setContent('<div>' + marker.title + '</div>');
        infoWindow.open(map, marker);

        // Make sure the marker property is cleared if the infoWindow is closed.
        infoWindow.addListener('closeclick', function() {
            infoWindow.setMarker(null);
        });
    }
}
