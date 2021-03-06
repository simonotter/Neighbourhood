"use strict";
var map;
var largeInfowindow;


// ViewModel
var ViewModel = function () {
    var self = this;

    // Create the places array
    self.placeList = ko.observableArray();
    var tempPlace;
    var markerImage;
    largeInfowindow = new google.maps.InfoWindow();


    places.forEach(function (place) {
        tempPlace = new Place(place);

        // Add Google map markers detail
        if (place.type === 'Cafe') {
            markerImage = 'img/icons/Coffee_1.svg';
        } else if (place.type === 'Groceries') {
            markerImage = 'img/icons/Shop_2.svg';
        } else if (place.type === 'Restaurant') {
            markerImage = 'img/icons/Food_5.svg';
        } else {
            markerImage = 'img/icons/Arrow_7.svg';
        }

        tempPlace.marker = new google.maps.Marker({
            position: place.location,
            icon: markerImage,
            title: place.name,
            animation: google.maps.Animation.DROP,
            id: place.name,
            foursquareVenue_id: place.foursquareVenue_id
        });

        // Put the place on the placeList
        self.placeList.push(tempPlace);

        // Create an onclick event to open an infoWindow at each marker.
        tempPlace.marker.addListener('click', function () {
            populateInfoWindow(this, largeInfowindow);
            self.animate(this);
        });

    });

    // Creat the list of place types
    // TODO: Move this data to the model
    self.placeTypes = ko.observableArray(['Show all', 'Cafe', 'Groceries', 'Restaurant']);

    //Set the initial place to nothing
    self.currentPlace = ko.observable(null);

    //Set the initial type to the first type (Show all)
    self.chosenType = ko.observable(this.placeTypes()[0]);

    //Filter the places based on the chosen type
    self.filteredPlaces = ko.computed(function () {
        var filter = self.chosenType();

        if (!filter || filter === self.placeTypes()[0]) {
            return self.placeList();
        } else {
            return ko.utils.arrayFilter(self.placeList(), function (place) {
                return place.type() === filter;
            });
        }
    });

    // Set the current place
    self.setCurrentPlace = function (clickedPlace) {
        self.currentPlace(clickedPlace);

        // Clear all markers
        self.placeList().forEach(function (place) {
            place.marker.setMap(null);
        });

        // Make map marker visible for the place clicked
        clickedPlace.marker.setMap(map);

        // Animate the marker
        self.animate(clickedPlace.marker);
        getFoursquareRating(clickedPlace.marker);
        largeInfowindow.open(map, clickedPlace.marker);

    };

    // Set the current type
    self.setCurrentType = function (clickedType) {
        self.chosenType(clickedType);
        self.currentPlace(null);

        // Clear all markers
        self.placeList().forEach(function (place) {
            place.marker.setMap(null);
        });

        var bounds = new google.maps.LatLngBounds();
        // Make map markers visible for chosen type
        self.filteredPlaces().forEach(function (place) {
            place.marker.setMap(map);
            bounds.extend(place.marker.position);
        });
        map.fitBounds(bounds);
    };

    self.animate = function(marker) {
        if (marker.getAnimation() !== null) {
            marker.setAnimation(null);
        } else {
            marker.setAnimation(google.maps.Animation.BOUNCE);
            marker.setAnimation(4);
        }
    };

    //Set the initial type to the first type (Show all)
    self.setCurrentType(self.placeTypes()[0]);

};

function googleSuccess() {
    // Create Google Map
    initMap();
    // Kickoff the knockout app
    ko.applyBindings(new ViewModel())
}

function googleError() {
    alert("Problem with Google Maps.");
}
