var markers = {};
var map;

// ViewModel
var ViewModel = function() {
    var self = this;

    // Create the places array
    this.placeList = ko.observableArray([]);
    var tempPlace;
    var markerImage;
    var largeInfowindow = new google.maps.InfoWindow();

    places.forEach(function(place) {
        tempPlace = new Place(place);

        // Add Google map markers detail
        if (place.type == 'Cafe') {
            markerImage = 'img/icons/Coffee_1.svg';
        } else if (place.type == 'Groceries') {
            markerImage = 'img/icons/Shop_2.svg';
        } else if (place.type == 'Restaurant') {
            markerImage = 'img/icons/Food_5.svg';
        } else {
            markerImage = 'img/icons/Arrow_7.svg';
        }
        tempPlace.marker = new google.maps.Marker({
            position: place.location,
            icon: markerImage,
            title: place.name,
            animation: google.maps.Animation.DROP,
            id: place.name
        });

        // Put the place on the placeList
        self.placeList.push(tempPlace);

        // Create an onclick event to open an infoWindow at each marker.
        tempPlace.marker.addListener('click', function() {
            populateInfoWindow(this, largeInfowindow);
        });

    });

    // Creat the list of place types
    // TODO: Move this data to the model
    this.placeTypes = ko.observableArray(['Show all', 'Cafe', 'Groceries', 'Restaurant']);

    //Set the initial place to nothing
    this.currentPlace = ko.observable(null);

    //Set the initial type to the first type (Show all)
    this.chosenType = ko.observable(this.placeTypes()[0]);

    //Filter the places based on the chosen type
    this.filteredPlaces = ko.computed(function() {
        var filter = self.chosenType();

        if (!filter || filter == self.placeTypes()[0]) {
            return self.placeList();
        } else {
            return ko.utils.arrayFilter(self.placeList(), function(place) {
                return place.type() == filter;
            });
        }
    });

    // Set the current place
    this.setCurrentPlace = function(clickedPlace) {
        self.currentPlace(clickedPlace);

        // Clear all markers
        self.placeList().forEach(function(place){
            place.marker.setMap(null);
        });

        // Make map marker visible for the place clicked
        clickedPlace.marker.setMap(map);

        clickedPlace.marker.addListener('click', function() {
            if (clickedPlace.marker.getAnimation() !== null) {
              clickedPlace.marker.setAnimation(null);
            } else {
              clickedPlace.marker.setAnimation(google.maps.Animation.BOUNCE);
            }
        })
    };

    // Set the current type
    this.setCurrentType = function(clickedType) {
        self.chosenType(clickedType);
        self.currentPlace(null);

        // Clear all markers
        self.placeList().forEach(function(place){
            place.marker.setMap(null);
        });

        // Make map markers visible for chosen type
        self.filteredPlaces().forEach(function(place){
            place.marker.setMap(map);
        });
    };

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

// Create Google Map
initMap();
// Kickoff the knockout app
ko.applyBindings(new ViewModel())

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
