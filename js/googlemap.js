function initMap() {
    "use strict";

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
    "use strict";
    // Check to make sure the infoWindow is not already opened on this marker.
    if (infoWindow.marker !== marker) {
        infoWindow.marker = marker;
        getFoursquareRating(marker);
        infoWindow.open(map, marker);
    }
}

// Get the venue rating from Foursquare if it exists
function getFoursquareRating(marker) {
    "use strict";
    var venue_id = marker.foursquareVenue_id;
    var client_id = 'XA3ZQEOYTTA5QGJ1Z01N5ZSLTPJITTZTBUZT5U0JX0NNZDFB';
    var client_secret = 'LMYGHDXVCZ0TJ3DN3HOA5XZ3VFPQSJM4PHYGVIBKENGIAR3C';
    var foursquareVenueAPI = 'https://api.foursquare.com/v2/venues/';

    var url = foursquareVenueAPI + venue_id + '?client_id=' + client_id + '&client_secret=' + client_secret + '&v=20160825';
    var foursquareRating;
    jQuery.getJSON(url, function (data) {
        if (data.response) {
            // if there is a rating for this venue
            if (data.response.venue.rating) {
                foursquareRating = data.response.venue.rating;
            } else {
                foursquareRating = 'unknown';
            }
        } else {
            foursquareRating = 'unknown';
        }
        // Update rating in Google marker infoWindow
        largeInfowindow.setContent('<div><strong>' + marker.title + '</strong><br>Foursquare Rating: (<span id="rate">' + foursquareRating + '</span>)' + '</div>');
    })
    .fail(function() {
        largeInfowindow.setContent('<div><strong>' + marker.title + '</strong><br>Foursquare Rating: (<span id="rate">unknown</span>)' + '</div>');
    });
}
