const express = require('express');
const { Spot, SpotImage, Review, ReviewImage, User } = require('../../db/models');
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

//! ***************Get all Reviews by a Spot's id
router.get('/:spotId/reviews', async (req, res) => {
    const spot = await Spot.findByPk(req.params.spotId)
   
    // check if spot exists FIRST! before finding reviews for the spot
    if (!spot) {
        res.status(404)
        return res.json({
            message: "Spot couldn't be found."
        })
    }
    
    const allReviewsBySpotId = await Review.findAll({
        where: { spotId: spot.id },
        include: 
        [
            {
                model: User,
                attributes: [ "id", "firstName", "lastName" ]
            },
            {
                model: ReviewImage,
                attributes: [ "id", "url" ]
            }]
        })  

    return res.json({
        Reviews: allReviewsBySpotId
    })
})

//! ***************Get all Spots owned by the Current User
router.get('/current', async(req, res) => {
    const allSpots = await Spot.findAll({
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
    allSpots.forEach(spot => {
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

//! *************** GET ALL SPOTS & ADD QUERY FILTERS TO GET ALL SPOTS
router.get('/', async(req, res) => {

    // query filter
    const { page, size } = req.query
    page = parseInt(page)
    size = parseInt(size)

    
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

    // find url for each spot
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

const queryFilter = [
    check('page')
        .isInt({ min: 1, max: 10})
        .withMessage(''),
    check('size')
        .isInt({ min: 1, max: 20})
        .withMessage(''),
    check('minLat')
        .isDecimal()
        .optional()
        .withMessage('Minimum latitude is invalid'),
    check('maxLat')
        .isDecimal()
        .optional()
        .withMessage('Maximum latitude is invalid'),
    check('minLng')
        .isDecimal()
        .optional()
        .withMessage('Minimum longitude is invalid'),
    check('maxLng')
        .isDecimal()
        .optional()
        .withMessage('Maximum longitude is invalid'),
    check('minPrice')
        .isDecimal({ min: 0 })
        .optional()
        .withMessage('Minimum price must be greater than or equal to 0'),
    check('maxPrice')
        .isDecimal({ min: 0 })
        .optional()
        .withMessage('Maximum price must be greater than or equal to 0'),
    handleValidationErrors
]
//! ***************Get details of a Spot from an id
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

const validateReview = [
    check('review')
        .exists({ checkFalsy: true })
        .withMessage('Review text is required.'),
    check('stars')
        .exists({ checkFalsy: true })
        .isInt({ min: 1, max: 5 })
        .withMessage('Stars must be an integer from 1 to 5.'),
    handleValidationErrors
]

//! ***************Create a Booking from a Spot based on the Spot's id
router.post('/:spotId/bookings', requireAuth, async (req, res) => {
    const booking = await Booking.findByPk(req.params.spotId)
    const user = await User.findByPk(req.user.id)
    const spot = await Spot.findByPk(req.params.spotId)

    if (booking.userId === req.user.id) {
        res.status(403)
        return res.json({
            message: "Sorry, this spot is already booked for the specified dates"
        })
    }

    if (!spot.ownerId) {

    }

    const { startDate, endDate } = req.body
    const newBooking = await Booking.create({
        spotId: parseInt(req.params.spotId),
        userId,
        startDate,
        endDate
    })


})

//! ***************Create a Review for a Spot based on the Spot's id
router.post('/:spotId/reviews', requireAuth, validateReview, async (req, res) => {
    // find specified spot by :spotId
    const spot = await Spot.findByPk(req.params.spotId)
    
    // check if a spot exists first before creating a review
    if (!spot) {
        res.status(404)
        return res.json({
            message: "Spot couldn't be found"
        })
    }
    
    // find review that matches req.user.id
    const existingReview = await Review.findOne({
        where: {
            spotId: parseInt(req.params.spotId),
            userId: req.user.id
        }
    })

    // check if current review already exists
    if (existingReview) {
        res.status(500)
        return res.json({
            message: "User already has a review for this spot"
        })
    } else {
        // destructure the incoming attributes from the req.body
        const { review, stars } = req.body
    
        // create a new review
        const newReviewForSpot = await Review.create({
            userId: req.user.id,
            spotId: parseInt(req.params.spotId),
            review,
            stars
        })
        res.status(201)
        return res.json(newReviewForSpot)
    }
})

//! ***************Add an Image to a Spot based on the Spot's id
router.post('/:spotId/images', requireAuth, async(req, res) => {
    // find specific spot by :spotId
    const spot = await Spot.findByPk(req.params.spotId)
    const user = await User.findByPk(req.user.id)
    const { url, preview } = req.body
    
    if (spot) {
        // check if user making the request to add an image is the same as the ownerId of the current spot
        if (user.id === spot.ownerId) {
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

//! ***************Create a Spot
router.post('/', requireAuth, validateSpot, async (req, res) => {
    const { address, city, state, country, lat, lng, name, description, price } = req.body    
    const newSpot = await Spot.create({
        address, city, state, country, lat, lng, name, description, price
    })

    if (!req.body) {
        res.status(400)
        return res.json(validateSpot)
    }

    const owner = { ...newSpot.toJSON(), ownerId: req.user.id }

    res.status(201)
    res.json(owner)
})

//! ***************Edit a Spot
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

//! ***************Delete a Spot
router.delete('/:spotId', requireAuth, async (req, res) => {
    const spot = await Spot.findByPk(req.params.spotId)
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