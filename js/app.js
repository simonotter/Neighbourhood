// ViewModel
var ViewModel = function() {
    var self = this;

    this.placeList = ko.observableArray([]);

    places.forEach(function(place) {
        self.placeList.push(new Place(place));
    });


    this.currentPlace = ko.observable(this.placeList()[0]);

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
    };

    this.setCurrentType = function(clickedType) {
        self.chosenType(clickedType);
    };
}

// Kickoff the knockout app
ko.applyBindings(new ViewModel())

function init_map() {

    var var_location = new google.maps.LatLng(53.370289, -1.491737);

    var var_mapoptions = {
        center: var_location,

        zoom: 14
    };

    var var_marker = new google.maps.Marker({
        position: var_location,
        map: var_map,
        title: "New York"
    });

    var var_map = new google.maps.Map(document.getElementById("map-container"),
        var_mapoptions);

    var_marker.setMap(var_map);

}

google.maps.event.addDomListener(window, 'load', init_map);
