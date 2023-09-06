const express = require('express');
const { Spot, SpotImage, Review, User, Booking, ReviewImage } = require('../../db/models');
// const { requireAuth } = require('../../utils')
const router = express.Router();

//! Get All Spots
router.get('/', async(req, res) => {
    const allSpots = await Spot.findAll({
        include: [
        {
            model: SpotImage
        },
        {
            model: Review        
        }
        ]   
    });

    //! Spots
    // find all spots + add oneSpot in JSON form to spotsList array
    let spotsList = [];
    allSpots.forEach(oneSpot => {
        spotsList.push(oneSpot.toJSON())
    })
    
    //! Reviews => stars
    // find star rating for each spot
    spotsList.forEach(oneSpot => {
        // set intial rating to 0
        oneSpot.avgRating = 0;
        console.log("***********oneSpot = ", oneSpot);
        oneSpot.Reviews.forEach(star => {
            console.log("***********star", star) 
            oneSpot.avgRating = oneSpot.avgRating + star.stars
        })

        // now actually avg the avgRating
        oneSpot.avgRating = oneSpot.avgRating / oneSpot.Reviews.length;
        
        if(!oneSpot.avgRating) oneSpot.avgRating = "No average rating for Spot found."
        delete oneSpot.Reviews;
    })

    // find boolean for preview for each spot
    //! SpotImages => preview => url
    spotsList.forEach(oneSpot => {
        console.log("***********SpotImage => oneSpot", oneSpot)
        oneSpot.SpotImages.forEach(image => {
            // console.log(image.preview)
            console.log("***********image", image);
            if (image.preview === true) {
                // console.log(image)
                oneSpot.previewImage = image.url;
            }
        })

        if (!oneSpot.previewImage) oneSpot.previewImage = "No URL for preview image for Spot found.";
        delete oneSpot.SpotImages;
    })
    
    res.json(spotsList);
})

//! Get all Spots owned by the Current User
//? Need to add authentication portion for this endpoint
router.get('/current', async(req, res) => {
    // const <plural-of-table-name> = await <singular-form-table-name>.<method-of-search>();
    const currentUser = await Spot.findAll({
        // where: {
        //     ownerId: req.
        // },
        include: [
            {
                model: Review
            },
            {
                model: SpotImage
            }
        ]
    });

    let currentUserInformation = [];
    // console.log("************* Current User Information", currentUserInformation);
    currentUserInformation.push(currentUser.toJSON())

    const firstUser = currentUserInformation[0];
    
    firstUser.avgRating = 0;

    firstUser.Reviews.forEach(oneSpot => {
        firstUser.avgRating = firstUser.avgRating + oneSpot.stars;
    })
    
    firstUser.avgRating = firstUser.avgRating / firstUser.Reviews.length;
    if(!firstUser.avgRating) firstUser.avgRating = "No average rating for Spot found.";
    delete firstUser.Reviews;

    firstUser.SpotImages.forEach(image => {
        if (image.preview === true) {
            firstUser.previewImage = image.url;
        }
    })
    if (!firstUser.previewImage) firstUser.previewImage = "No URL for preview image for Spot found."
    delete firstUser.SpotImages;


    res.json(currentUserInformation);
    // res.json(allSpots);
})

//! Get details of a Spot from an id
router.get('/:spotId', async(req, res) => {
    const allSpots = await Spot.findByPk(req.params.spotId, {
        include: [
            {
                model: SpotImage,
                attributes: ["id", "url", "preview"]
            },
            {
                //! might need to change User => Owner
                model: User,
                attributes: ["id", "firstName", "lastName"]
            },
        ]
    });
    
    if (!allSpots) {
        res.status(404)
        res.json({
            message: "Spot couldn't be found."
        })
    }

    const owner = { allSpots, Owner: allSpots.User }
    res.json(owner);
    res
})

// router.post('/', async (req, res) => {
//     // const newSpot = await Spot.
// })
module.exports = router;