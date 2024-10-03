const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const {isLoggedIn, isOwner, validateListing} = require("../middleware.js");
const listingController = require("../controllers/listings.js");
const multer  = require('multer'); // form ke data ko parse krne ke liye hm multer ko use krnge.
const {storage} = require("../cloudConfig.js");
const upload = multer({ storage }); // multer forms ke data se files ko nikalega aur cloudinary ki storage me jakr save krwa dega.


//Index Route + Create Route
router
  .route("/")
  .get(wrapAsync(listingController.index))
  .post(isLoggedIn, upload.single("listing[image]"), validateListing, wrapAsync(listingController.createListing));
  

// New Route
router.get("/new", isLoggedIn, listingController.renderNewForm);

// Show Route + Update Route + Delete Route
router
  .route("/:id")
  .get(wrapAsync(listingController.showListings))
  .put(isLoggedIn, isOwner, upload.single("listing[image]"), validateListing, wrapAsync(listingController.updateListing))
  .delete(isLoggedIn, isOwner, wrapAsync(listingController.destroyListing));

//Edit Route
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingController.renderEditForm));

module.exports = router;


//Index Route
// router.get("/", wrapAsync(listingController.index));



//Create Route
// router.post("/", isLoggedIn, validateListing, wrapAsync(listingController.createListing));

// Show Route
// router.get("/:id", wrapAsync(listingController.showListings));



//Update Route
// router.put("/:id", isLoggedIn, isOwner, validateListing, wrapAsync(listingController.updateListing));

//Delete Route
// router.delete("/:id", isLoggedIn, isOwner, wrapAsync(listingController.destroyListing));  

