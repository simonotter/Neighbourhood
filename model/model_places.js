// Model
var places = [
    {
        name: 'Cafe Nero',
        type: 'Cafe',
        location: {lat: 53.371535, lng: -1.487944},
        img: 'https://mimagazine.net/wp-content/uploads/2015/06/Caffe-Nero-2.jpg',
        foursquareVenue_id: '4b781b1ff964a52010b62ee3'
    },
    {
        name: 'Graze Inn',
        type: 'Restaurant',
        location: {lat: 53.371088, lng: -1.489321},
        img: 'http://blog.thewhitecompany.com/wp-content/uploads/2015/05/Graze_Sheffield.jpg',
        foursquareVenue_id: '4b745e1ff964a5200fd82de3'
    },
    {
        name: 'Ashoka',
        type: 'Restaurant',
        location: {lat: 53.371725, lng: -1.488748},
        img: 'http://www.ourfaveplaces.co.uk/assets/images/venues/eat-drink/ashoka/Ashoka.jpg',
        foursquareVenue_id: '4bb63297ef159c74fe9075f7'
    },
    {
        name: 'Craft and Dough',
        type: 'Restaurant',
        location: {lat: 53.370643, lng: -1.490611},
        img: 'http://independent-sheffield.co.uk/wp-content/uploads/2015/08/V17A9631.jpg',
        foursquareVenue_id: '55b3d28c498e0739f0ae62ef'
    },
    {
        name: 'One Stop',
        type: 'Groceries',
        location: {lat: 53.370727, lng: -1.490348},
        img: 'http://www.slrmag.co.uk/wp-content/uploads/2015/03/one-stop-logo.jpg',
        foursquareVenue_id: '4ccda12cee23a143280127a8'
    },
    {
        name: 'Marks & Spencers Food Hall',
        type: 'Groceries',
        location: {lat: 53.37183, lng: -1.488331},
        img: 'https://i.guim.co.uk/img/static/sys-images/Guardian/About/General/2012/5/9/1336575693191/MS-Ecclesall-Road-store-i-008.jpg?w=620&q=55&auto=format&usm=12&fit=max&s=5fabf5a2a07073838731d35b91f6b66b',
        foursquareVenue_id: '4da7fe87a86e68edb7d317dc'
    }
];

var Place = function (data) {
    this.name = ko.observable(data.name);
    this.type = ko.observable(data.type);
    this.location = ko.observable(data.location);



    this.img = data.img;
};
