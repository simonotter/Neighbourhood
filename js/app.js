var markers = {};
var map;

// ViewModel
var ViewModel = function() {
    var self = this;

    this.placeList = ko.observableArray([]);

    places.forEach(function(place) {
        self.placeList.push(new Place(place));
    });

    this.currentPlace = ko.observable(null);

    this.placeTypes = ko.observableArray(['Show all', 'Cafe', 'Groceries', 'Restaurant']);

    this.chosenType = ko.observable(this.placeTypes()[0]);

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

    // Behaviours
    this.setCurrentPlace = function(clickedPlace) {
        self.currentPlace(clickedPlace);

        // Clear all markers
        self.placeList().forEach(function(place){
            place.marker.setMap(null);
        });

        // Make map marker visible
        clickedPlace.marker.setMap(map);
    };

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
