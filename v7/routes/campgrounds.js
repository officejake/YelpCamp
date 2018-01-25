var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");

//INDEX ROUTE - show all campgrounds
router.get("/", function(req, res){
    //get all campgrounds from db
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log(err);
        } else {
            res.render("campgrounds/index", {campgrounds:allCampgrounds});
        }
    });
});

//CREATE - add new campground
router.post("/", function(req, res){
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
router.get("/new", function(req, res){
    res.render("campgrounds/new");
});

//SHOW - one specific campground
router.get("/:id", function(req, res){
    //find campground with id
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err) {
            console.log(err);
        } else {
            //render template with that campground
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
});

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = router;