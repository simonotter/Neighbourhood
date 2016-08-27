// Model
var places = [
    {
        name: 'Cafe Nero',
        type: 'Cafe'
    },
    {
        name: 'Graze',
        type: 'Restaurant'
    },
    {
        name: 'Craft and Dough',
        type: 'Restaurant'
    },
    {
        name: 'One Stop',
        type: 'Groceries'
    },
    {
        name: 'Marks & Spencers Food Hall',
        type: 'Groceries'
    }
]

var Place = function(data) {
    this.name = ko.observable(data.name);
    this.type = ko.observable(data.type);
}
