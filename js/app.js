var markers = {};
var map;

// ViewModel
var ViewModel = function() {
    var self = this;

    // Create the places array
    this.placeList = ko.observableArray([]);
    places.forEach(function(place) {
        self.placeList.push(new Place(place));
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

        // Make map marker visible
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
