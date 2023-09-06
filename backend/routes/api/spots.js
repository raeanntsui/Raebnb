const express = require('express');
const { Spot, SpotImage, Review, User, Booking, ReviewImage } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const { handleValidationErrors } = require('../../utils/validation');
const { check } = require('express-validator')
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
    const currentSpot = await Spot.findAll({
        where: {
            ownerId: req.user.id
        },
        include: [
            {
                model: Review
            },
            {
                model: SpotImage
            }
        ]
    });

    let spotArray = [];
    currentSpot.forEach(spot => {
        spotArray.push(spot.toJSON())
    })

    //iterate thru spots for 1 review + add
    spotArray.forEach(spot => {
        spot.avgRating = 0;
        spot.Reviews.forEach(review => {
            spot.avgRating = spot.avgRating + review.stars;
        })
        spot.avgRating = spot.avgRating / spot.Reviews.length;
        if(!spot.avgRating) spot.avgRating = "No average rating for Spot found.";
        delete spot.Reviews;
    })    

    //iterate thru spots for images
    spotArray.forEach(spot => {
        spot.SpotImages.forEach(image => {
            if(image.preview !== undefined) spot.previewImage = image.url;
        })

        if (spot.previewImage === undefined) spot.previewImage = "No URL for Spot found.";
        delete spot.SpotImages;
    })
    res.json(spotArray);
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
                model: User,
                attributes: ["id", "firstName", "lastName"]
            },
            {
                model: Review
            }
        ]
    });

    const spotOwner = { ...allSpots.toJSON(), Owner: allSpots.User}
    delete spotOwner.User

    spotOwner.numReviews = spotOwner.Reviews.length;

    spotOwner.avgRating = 0;
    spotOwner.Reviews.forEach(review => {
        spotOwner.avgRating = spotOwner.avgRating + review.stars
    })

    spotOwner.avgRating = spotOwner.avgRating / spotOwner.Reviews.length
    
    if (!allSpots) {
        res.status(404)
        return res.json({
            message: "Spot couldn't be found."
        })
    }

    res.json(spotOwner)
})

//!Create a Spot
const validateSpotCreation = [
    check('address')
        .exists({ checkFalsy: true })
        .withMessage('Street address is required'),
    check('city')
        .exists({ checkFalsy: true })
        .withMessage('City is required'),
    check('state')
        .exists({ checkFalsy: true })
        .withMessage('State is required'),
    check('lat')
        .exists({ checkFalsy: true })
        .isDecimal()
        .withMessage('Latitude is not valid'),
    check('lng')
        .exists({ checkFalsy: true })
        .isDecimal()
        .withMessage('Longitude is not valid'),
    check('name')
        .exists({ checkFalsy: true })
        .isLength({ max: 49 })
        .withMessage('Name must be less than 50 characters'),
    check('description')
        .exists({ checkFalsy: true })
        .withMessage('Description is required'),
    check('price')
        .exists({ checkFalsy: true })
        .isDecimal()
        .withMessage('Price per day is required'),
    handleValidationErrors
]

router.post('/', requireAuth, validateSpotCreation, async (req, res) => {
    const { address, city, state, country, lat, lng, name, description, price } = req.body    
    const newSpot = await Spot.create({
        address, city, state, country, lat, lng, name, description, price
    })

    if (!req.body) {
        res.status(400)
        return res.json(validateSpotCreation)
    }

    const owner = { ...newSpot.toJSON(), ownerId: req.user.id }

    res.status(201)
    res.json(owner)
})

//! Add an Image to a Spot based on the Spot's id

module.exports = router;