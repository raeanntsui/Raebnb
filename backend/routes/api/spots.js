const express = require('express');
const { Spot, SpotImage, Review } = require('../../db/models');
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
    // note to self:
    // const <plural-of-table-name> = await <singular-form-table-name>.<method-of-search>();
    const currentUser = await Spot.findOne({
        where: req.query.current,
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
    console.log("************* Current User Information", currentUserInformation);
    currentUserInformation.forEach(column => {
        currentUserInformation.push(column.toJSON())
    })

    currentUserInformation.forEach(attribute => {
        attribute.SpotImages.forEach(image => {
            if (image.preview === true) {
                attribute.previewImage = image.url;
            }
        })
        if (!attribute.previewImage) attribute.previewImage = "No URL for preview image for Spot found."
        delete attribute.SpotImages;
    })


    res.json(currentUser);
    // res.json(allSpots);
})

//! Get details of a Spot from an id
router.get('/:id', async(req, res) => {
    const allSpots = await Spot.findByPk(req.query.id);
    res.json(allSpots);
})

module.exports = router;