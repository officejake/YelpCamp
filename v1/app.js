var express = require("express");
var app = express();
var bodyParser = require("body-parser")

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

var campgrounds = [
            {name: "125th Street Underpass", image: "https://livemap-tiles3.waze.com/tiles/17/37581/49901.png"},
            {name: "Rich Guys Backyard", image: "https://i.pinimg.com/736x/ac/ff/d9/acffd941400556f8524324799aad84a2--celebrity-mansions-rush-limbaugh.jpg"},
            {name: "Buckingham Palace", image: "https://pbs.twimg.com/profile_images/613703142610485248/4JtoEhf5_400x400.jpg"},
            {name: "125th Street Underpass", image: "https://livemap-tiles3.waze.com/tiles/17/37581/49901.png"},
            {name: "Rich Guys Backyard", image: "https://i.pinimg.com/736x/ac/ff/d9/acffd941400556f8524324799aad84a2--celebrity-mansions-rush-limbaugh.jpg"},
            {name: "Buckingham Palace", image: "https://pbs.twimg.com/profile_images/613703142610485248/4JtoEhf5_400x400.jpg"},
        ]

app.get("/", function(req, res){
    res.render("landing");
});

app.get("/campgrounds", function(req, res){
        res.render("campgrounds", {campgrounds: campgrounds});
});

app.post("/campgrounds", function(req, res){
    var name = req.body.name;
    var image = req.body.image
    var newCampground = {name: name, image: image}
    campgrounds.push(newCampground);
    //redirect to campground page
    res.redirect("/campgrounds")
});

app.get("/campgrounds/new", function(req, res){
    res.render("new.ejs");
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The YelpCamp Server has started");
});