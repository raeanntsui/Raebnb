const express = require('express');
const { Spot, SpotImage, Review, User, Booking, ReviewImage } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const { handleValidationErrors } = require('../../utils/validation');
const { check } = require('express-validator')
const router = express.Router();

const validateSpot = [
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
    
//! Get all Spots owned by the Current User
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

    spotArray.forEach(spot => {
        spot.avgRating = 0;
        spot.Reviews.forEach(review => {
            spot.avgRating = spot.avgRating + review.stars;
        })
        spot.avgRating = spot.avgRating / spot.Reviews.length;
        if(!spot.avgRating) spot.avgRating = "No average rating for Spot found.";
        delete spot.Reviews;
    })    

    spotArray.forEach(spot => {
        spot.SpotImages.forEach(image => {
            if(image.preview !== undefined) spot.previewImage = image.url;
        })

        if (spot.previewImage === undefined) spot.previewImage = "No URL for Spot found.";
        delete spot.SpotImages;
    })
    res.json(spotArray);
})

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

    // find all spots + add oneSpot in JSON form to spotsList array
    let spotsList = [];
    allSpots.forEach(oneSpot => {
        spotsList.push(oneSpot.toJSON())
    })
    
    // find star rating for each spot
    spotsList.forEach(oneSpot => {
        oneSpot.avgRating = 0;
        oneSpot.Reviews.forEach(star => {
            oneSpot.avgRating = oneSpot.avgRating + star.stars
        })

        oneSpot.avgRating = oneSpot.avgRating / oneSpot.Reviews.length;
        
        if(!oneSpot.avgRating) oneSpot.avgRating = "No average rating for Spot found."
        delete oneSpot.Reviews;
    })

    spotsList.forEach(oneSpot => {
        oneSpot.SpotImages.forEach(image => {
            if (image.preview === true) {
                oneSpot.previewImage = image.url;
            }
        })

        if (!oneSpot.previewImage) oneSpot.previewImage = "No URL for preview image for Spot found.";
        delete oneSpot.SpotImages;
    })
    
    res.json(spotsList);
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

//! Add an Image to a Spot based on the Spot's id
router.post('/:spotId/images', requireAuth, async(req, res) => {
    // find specific spot by :spotId
    const spot = await Spot.findByPk(req.params.spotId)
    const { url, preview } = req.body
    
    if (spot) {
        // check if user making the request to add an image is the same as the ownerId of the current spot
        if (req.user.id === spot.ownerId) {
            const newImageForSpot = await SpotImage.create({
                spotId: req.params.spotId,
                url,
                preview
            })
        
            return res.json({
                id: newImageForSpot.id,
                url: newImageForSpot.url,
                preview: newImageForSpot.preview
            })
        }
    }

    // if no spot exists, return error
    if (!spot) {
        res.status(404)
        return res.json({
            message: "Spot couldn't be found"
        })
    }

})

//! Create a Spot
router.post('/', requireAuth, validateSpot, async (req, res) => {
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

//! Edit a Spot
router.put('/:spotId', requireAuth, validateSpot, async (req, res) => {
    const spot = await Spot.findByPk(req.params.spotId)

    const { address, city, state, country, lat, lng, name, description, price } = req.body

    if (spot) {
        if (spot.ownerId === req.user.id) {
            spot.ownerId = req.user.id;
            spot.address = address;
            spot.city = city;
            spot.state = state;
            spot.country = country;
            spot.lat = lat;
            spot.lng = lng;
            spot.name = name;
            spot.description = description;
            spot.price = price;
        }
    }

    if (!spot) {
        res.status(400)
        return res.json({
            message: "Spot couldn't be found"
        })
    }
    await spot.save()
    return res.json(spot)
})

//! Delete a Spot
router.delete('/:spotId', requireAuth, async (req, res) => {
    const spot = await Spot.findByPk(req.params.spotId)
    // console.log("req.params.spotId", spotId)
    // console.log("req.user.id", req.user.id)
    // console.log("spot", spot)
    if (spot) {
        // check if the ownerId of the current spot is the same as the current user in session
        if (spot.ownerId === req.user.id) {
            await spot.destroy()
            res.json({
                message: "Successfully deleted."
            })
        }
    }
    
    else if (!spot) {
        res.status(404)
        res.json({
            message: "Spot couldn't be found"
        })
    }
})



module.exports = router;