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
        console.log("oneSpot = ", oneSpot);
        oneSpot.Reviews.forEach(star => {
            console.log("star", star) 
            oneSpot.avgRating = oneSpot.avgRating + star.stars
        })

        // now actually avg the avgRating
        oneSpot.avgRating = oneSpot.avgRating / oneSpot.Reviews.length;
        
        if(!oneSpot.avgRating) oneSpot.avgRating = "No average rating for Spot found."
        delete oneSpot.Reviews;
    })

    // find boolean for preview for each spot
    //! SpotImages => preview
    spotsList.forEach(oneSpot => {
        console.log("SpotImage oneSpot", oneSpot)
        oneSpot.SpotImages.forEach(image => {
            // console.log(image.preview)
            console.log("image", image);
            if (image.preview) {
                // console.log(image)
                oneSpot.previewImage = image.preview;
            }
        })

        if (!oneSpot.previewImage) oneSpot.preview = "No preview image for Spot found.";
        delete oneSpot.SpotImages;
    })
    
    res.json(spotsList);
})

module.exports = router;