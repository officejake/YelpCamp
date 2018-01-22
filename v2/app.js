var express      = require("express"),
    app          = express(),
    bodyParser   = require("body-parser"),
    mongoose     = require("mongoose");

mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

//SCHEMA SET UP
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String,
});

var Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create(
//     {
//       name: "Buckingham Palace",
//       image: "https://pbs.twimg.com/profile_images/613703142610485248/4JtoEhf5_400x400.jpg",
//       description: "This is a palace wow"
        
//     }, function(err, campground){
//         if(err){
//             console.log(err);
//         } else {
//             console.log("NEWLY CREATED CAMPGROUND: ");
//             console.log(campground);
//         }
//     });


app.get("/", function(req, res){
    res.render("landing");
});

//INDEX ROUTE - show all campgrounds
app.get("/campgrounds", function(req, res){
    //get all campgrounds from db
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log(err);
        } else {
            res.render("index", {campgrounds:allCampgrounds});
        }
    });
});

//CREATE - add new campground
app.post("/campgrounds", function(req, res){
    var name = req.body.name;
    var image = req.body.image
    var desc = req.body.description
    var newCampground = {name: name, image: image, description: desc}
    //Create new campground and save to DB
    Campground.create(newCampground, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            //redirect to campground page
            res.redirect("/campgrounds")
        }
    })
});

//NEW - show form to create new campground
app.get("/campgrounds/new", function(req, res){
    res.render("new.ejs");
});

//SHOW - one specific campground
app.get("/campgrounds/:id", function(req, res){
    //find campground with id
    Campground.findById(req.params.id, function(err, foundCampground){
        if(err) {
            console.log(err);
        } else {
            //render template with that campground
            res.render("show", {campground: foundCampground})
        }
    });
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The YelpCamp Server has started");
});