const express = require('express');
const { Spot, SpotImage, Review, ReviewImage, User, Booking } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const { handleValidationErrors } = require('../../utils/validation');
const { check } = require('express-validator')
const router = express.Router();
const { Op } = require('sequelize')

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

const queryFilter = [
    check("page")
        .optional()
        .isInt({ min: 1 })
        .withMessage("Page must be greater than or equal to 1"),
    check("size")
        .optional()
        .isInt({ min: 1 })
        .withMessage("Size must be greater than or equal to 1"),
    check("maxLat")
        .optional()
        .isDecimal()
        .isInt({ min: -500, max: 500 })
        .withMessage("Maximum latitude is invalid"),
    check("minLat")
        .optional()
        .isDecimal()
        .isInt({ min: -500, max: 500 })
        .withMessage("Minimum latitude is invalid"),
    check("maxLng")
        .optional()
        .isDecimal()
        .isInt({ min: -500, max: 500 })
        .withMessage("Maximum longitude is invalid"),
    check("minLat")
        .optional()
        .isDecimal()
        .isInt({ min: -500, max: 500 })
        .withMessage("Minimum longitude is invalid"),
    check("minPrice")
        .optional()
        .isInt({ min: 0 })
        .isDecimal()
        .withMessage("Minimum price must be greater than or equal to 0"),
    check("maxPrice")
        .optional()
        .isInt({ min: 0 })
        .isDecimal()
        .withMessage("Maximum price must be greater than or equal to 0"),
    handleValidationErrors,
  ];

//! *************** Get all Bookings for a Spot based on the Spot's id
router.get('/:spotId/bookings', requireAuth, async (req, res) => {
    const spot = await Spot.findByPk(req.params.spotId)
    
    // check if a spot exists
    if (!spot) {
        res.status(404)
        return res.json({
            message: "Spot couldn't be found"
        })
    }

    if (spot) {
        // check if spot owner and current user are not the same
        if (spot.ownerId !== req.user.id) {
            const allBookings = await Booking.findAll({
                where: {
                    spotId: req.params.spotId
                },
                attributes: [ "spotId", "startDate", "endDate" ]
            })
            return res.json({ Bookings: allBookings })
        } else {
            // otherwise if you are the owner of the spot then...
            // find all the bookings associated with the user
            const allBookings = await Booking.findAll({
                where: {
                    spotId: req.params.spotId
                },
                include: [{
                    model: User,
                    attributes: [ "id", "firstName", "lastName" ]
                }]
            })
            return res.json({ Bookings: allBookings })
        }
    }
})

//! *************** Get all Reviews by a Spot's id
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

//! *************** Get all Spots owned by the Current User
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
router.get('/', queryFilter, async(req, res) => {

    // query filter
    let { page, size } = req.query

    // set the default for page and size if they do not yet exist
    if (!page || page > 10 || isNaN(page)) page = 1
    if (!size || size > 20 || isNaN(size)) size = 20

    page = parseInt(page)
    size = parseInt(size)

    const pagination = {
        limit: size,
        offset: (page - 1) * size
    }

    const allSpots = await Spot.findAll({
        include: [
        {
            model: SpotImage
        },
        {
            model: Review        
        }
        ], ...pagination   
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
    
    return res.json({
        Spots: spotsList,
        page: page,
        size: size
    });
})

//! *************** Get details of a Spot from an id
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


//! *************** CREATE A BOOKING FROM A SPOT BASED ON THE SPOT'S ID
router.post('/:spotId/bookings', requireAuth, async (req, res) => {
    const spot = await Spot.findByPk(req.params.spotId)
    
    // if a spot does not exist...
    if (!spot) {
        // if a spot does not exist, return an error
        res.status(404)
        return res.json({
            message: "Spot couldn't be found"
        })
    }

    // destructure the req.body to be used later
    const { startDate, endDate } = req.body
    
    // convert the given req.body startDate & endDate from STRING to OBJECT
    const newBookingStartDate = new Date(startDate)
    const newBookingEndDate = new Date(endDate)
    
    if (spot.ownerId === req.user.id) {
        res.status(403)
        return res.json({
            message: "Spot does not belong to the current user. Cannot create a booking."
        })
    }

    // check if dates are valid before booking (date validation check)
    if (newBookingStartDate >= newBookingEndDate) {
        res.status(400)
        return res.json({
            message: "Bad Request",
            errors: {
                endDate: "endDate cannot be on or before startDate"
            }
        })
    }

    // find an existing booking
    const existingBooking = await Booking.findOne({
        where: {
            spotId: spot.id,
            startDate: { [Op.lte]: newBookingStartDate },
            endDate: { [Op.gte]: newBookingEndDate }
        }, 
    })
    
    // check for an existing booking
    if (existingBooking) {
        res.status(403)
        return res.json({
            message: "Sorry, this spot is already booked for the specified dates",
            errors: {
                startDate: "Start date conflicts with an existing booking",
                endDate: "End date conflicts with an existing booking"
            }
        })
    }
    
    // if a spot exists & no errors then create a new booking
    const newBooking = await Booking.create({
        spot: spot.id,
        user: req.user.id,
        startDate: newBookingStartDate,
        endDate: newBookingEndDate
    })
    res.status(200)
    return res.json(newBooking)
})

//! *************** Create a Review for a Spot based on the Spot's id
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

//! *************** ADD AN IMAGE TO A SPOT BASED ON THE SPOT'S ID
/*
//! below copy is correct
// router.post('/:spotId/images', requireAuth, async(req, res) => {
//     // find specific spot by :spotId
//     const spot = await Spot.findByPk(req.params.spotId)
//     const { user } = req

//     // const user = await User.findByPk(req.user.id)
    
//     if (spot) {
//         if (user.id === spot.ownerId) {
//             const { url, preview } = req.body
//             const newImageForSpot = await SpotImage.create({
//                 spotId: req.params.spotId,
//                 url,
//                 preview
//             })
//             res.status(201)
//             return res.json({
//                 id: newImageForSpot.id,
//                 url: newImageForSpot.url,
//                 preview: newImageForSpot.preview
//             })
//         } else {
//             res.status(403)
//             return res.json({
//                 message: "Cannot add image, you are not the spot owner"
//             })
//         }
//         // check if user making the request to add an image is the same as the ownerId of the current spot
//     } else {
//         res.status(404)
//         return res.json({
//             message: "Spot couldn't be found"
//         })
//     }
// })
*/

router.post('/:spotId/images', requireAuth, async(req, res) => {
    // find specific spot by :spotId
    const spot = await Spot.findByPk(req.params.spotId)
    const user = await User.findByPk(req.user.id)
    const { url, preview } = req.body
    
    if (!spot) {
        res.status(404)
        return res.json({
            message: "Spot couldn't be found"
        })
    }

    if (spot && (user.id !== spot.ownerId)) {
        res.status(404)
        return res.json({
            message: "Spot must belong to the current user"
        })
    }

    if (spot && (user.id === spot.ownerId)) {
        // check if user making the request to add an image is the same as the ownerId of the current spot
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
})

//! *************** Create a Spot
router.post('/', requireAuth, validateSpot, async (req, res) => {
    const { address, city, state, country, lat, lng, name, description, price } = req.body    
    const newSpot = await Spot.create({
       ownerId: req.user.id, address, city, state, country, lat, lng, name, description, price
    })

    if (!req.body) {
        res.status(400)
        return res.json(validateSpot)
    }

    // const owner = { ...newSpot.toJSON(), ownerId: req.user.id }

    res.status(201)
    res.json(newSpot)
})

//! *************** Edit a Spot
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

//! *************** Delete a Spot
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