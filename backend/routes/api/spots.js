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
    check('country')
        .exists({ checkFalsy: true })
        .withMessage('Country is required'),
    check('lat')
        .exists()
        .isDecimal()
        .isFloat({ min: -90, max: 90 })
        .withMessage('Latitude is not valid'),
    check('lng')
        .exists()
        .isDecimal()
        .isFloat({ min: -180, max: 180 })
        .withMessage('Longitude is not valid'),
    check('name')
        .exists({ checkFalsy: true })
        .isLength({ max: 50 })
        .withMessage('Name must be less than 50 characters'),
    check('name')
        .exists({ checkFalsy: true })
        .isLength({ min: 1 })
        .withMessage('Name is required'),
    check('description')
        .exists({ checkFalsy: true })
        .withMessage('Description is required'),
    check('price')
        .exists({ checkFalsy: true })
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

//! *************** GET ALL BOOKINGS FOR A SPOT BASED ON THE SPOT'S ID
router.get('/:spotId/bookings', requireAuth, async (req, res) => {
    const spot = await Spot.findByPk(req.params.spotId)
    
    // if a spot does not exist return an error message
    if (!spot) {
        res.status(404)
        return res.json({
            message: "Spot couldn't be found"
        })
    }

    // check if spot owner and current user are not the same
    if (spot.ownerId !== req.user.id) {
        const allBookings = await Booking.findAll({
            where: {
                spotId: req.params.spotId
            },
                attributes: [ "spotId", "startDate", "endDate" ]
        })
        
        res.status(200)
        return res.json({ 
            Bookings: allBookings.map(aBooking => ({
                ...aBooking.toJSON(),
                startDate: aBooking.startDate.toISOString().split("T")[0],
                endDate: aBooking.endDate.toISOString().split("T")[0],
            }))
         })

    } else {
        // otherwise if you are the owner of the spot then...
        // find all the bookings associated with the user
        const allBookings = await Booking.findAll({
            where: { spotId: spot.id },
            include: [{
                model: User,
                attributes: [ "id", "firstName", "lastName" ]
            }]
        })
        res.status(200)
        return res.json({ 
            Bookings: allBookings.map(aBooking => ({
                ...aBooking.toJSON(),
                startDate: aBooking.startDate.toISOString().split("T")[0],
                endDate: aBooking.endDate.toISOString().split("T")[0],
                createdAt: aBooking.createdAt.toISOString().replace("T", " ").split(".")[0],
                updatedAt: aBooking.updatedAt.toISOString().replace("T", " ").split(".")[0]
            }))
         })
    }
    
})

//! *************** GET ALL REVIEWS BY A SPOT'S ID
//? Get Reviews by Spot Id
router.get('/:spotId/reviews', async (req, res) => {
    const spot = await Spot.findByPk(req.params.spotId)
   
    // if no spot exists, then return error
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

    res.status(200)
    return res.json({ Reviews: allReviewsBySpotId })
})

//! *************** GET ALL SPOTS OWNED BY THE CURRENT USER
router.get('/current', async(req, res) => {
    const allSpots = await Spot.findAll({
        where: {
            ownerId: req.user.id
        },
        include: [{ model: Review }, { model: SpotImage }]
    });

    // create a variable that can hold all the spots as you iterate through the spots array
    let spotArray = [];
    allSpots.forEach(spot => {
        spotArray.push(spot.toJSON())
    })

    // find average rating
    spotArray.forEach(spot => {
        spot.avgRating = 0;
        spot.Reviews.forEach(review => {
            spot.avgRating = spot.avgRating + review.stars;
        })
        spot.avgRating = spot.avgRating / spot.Reviews.length;
        if (!spot.avgRating) spot.avgRating = "No average rating for Spot found.";
        delete spot.Reviews;
    })    

    // find preview image
    spotArray.forEach(spot => {
        spot.SpotImages.forEach(image => {
            if(image.preview !== undefined) spot.previewImage = image.url;
        })

        if (spot.previewImage === undefined) spot.previewImage = "No URL for Spot found.";
        delete spot.SpotImages;
    })

    res.status(200)
    return res.json({ Spots: spotArray });
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

//! *************** GET DETAILS OF A SPOT FROM AN ID
// router.get('/:spotId', async (req, res) => {
//     const spot = await Spot.findByPk(req.params.spotId, {
//         include: [
//             {
//                 model: SpotImage,
//                 as: "SpotImages",
//                 attributes: [ "id", "url", "preview" ]
//             },
//             {
//                 model: User,
//                 attributes: [ "id", "firstName", "lastName" ]
//             },
//             {
//                 model: Review,
//                 // attributes: [ "stars" ]
//             }
//         ]
//     });

//     // if a spot does not exist
//     if (!spot) {
//         res.status(404)
//         return res.json({
//             message: "Spot couldn't be found."
//         })
//     }

//     // get the total number of reviews
//     const numReviews = spot.Reviews.length

//     // find the TOTAL star rating & initialize current total star rating to 0
//     const totalStars = 0

//     // iterate through each review
//     for (let i = 0; i < spot.Reviews.length; i++) {
//         // get the current review in the loop
//         const review = spot.Reviews[i]
//         // add the star rating from each iterated review to totalStars
//         totalStars = totalStars + review.stars
//     }
    
//     // find the AVERAGE star rating & initialize current average star rating to 0
//     const avgStars = 0
//     if (spot.Reviews.length > 0) {
//         avgStars = totalStars / spot.Reviews.length
//     }

//     // remove the Reviews column from the response
//     delete spot.Reviews

//     res.status(200)
//     return res.json({
//         id: spot.id,
//         ownerId: spot.ownerId,
//         address: spot.address,
//         city: spot.city,
//         state: spot.state,
//         country: spot.country,
//         lat: spot.lat,
//         lng: spot.lng,
//         name: spot.name,
//         description: spot.description,
//         price: spot.price,
//         createdAt: spot.createdAt,
//         updatedAt: spot.updatedAt,
//         numReviews: numReviews,
//         avgRating: avgStars,
//         SpotImages: spot.SpotImages,
//         Owner: spot.User,
//     })

// })









router.get("/:spotId", async (req, res) => {
    const spotId = req.params.spotId;
  
    const spot = await Spot.findByPk(spotId, {
      include: [
        {
          model: User,
          attributes: ["id", "firstName", "lastName"],
        },
        {
          model: SpotImage,
          as: "SpotImages",
          attributes: ["id", "url", "preview"],
        },
        {
          model: Review,
          attributes: ["stars"],
        },
      ],
    });
  
    if (!spot) {
      return res.status(404).json({ message: "Spot couldn't be found" });
    }
  
    const numReviews = spot.Reviews.length;
    const totalStars = spot.Reviews.reduce(
      (total, review) => total + review.stars,
      0
    );
    let avgStarRating = 0;
  
    if (numReviews > 0) {
      avgStarRating = totalStars / numReviews;
    }
  
    return res.status(200).json({
      id: spot.id,
      ownerId: spot.ownerId,
      address: spot.address,
      city: spot.city,
      state: spot.state,
      country: spot.country,
      lat: spot.lat,
      lng: spot.lng,
      name: spot.name,
      description: spot.description,
      price: spot.price,
      createdAt: spot.createdAt,
      updatedAt: spot.updatedAt,
      numReviews: numReviews,
      avgRating: avgStarRating,
      SpotImages: spot.SpotImages,
      Owner: spot.User,
    });
  });









//! *************** CREATE A BOOKING FROM A SPOT BASED ON THE SPOT'S ID
//? Create a Booking Based on a Spot id
router.post('/:spotId/bookings', requireAuth, async (req, res) => {
    const spot = await Spot.findByPk(req.params.spotId)
    // const user = await User.findByPk(req.user.id)
    
    // spot check: if a spot does not exist...
    if (!spot) {
        // if a spot does not exist, return an error
        res.status(404)
        return res.json({
            message: "Spot couldn't be found"
        })
    }

    // authorization check: check if the current spot's owner is the same as the current user
    if (spot.ownerId === req.user.id) {
        res.status(403)
        return res.json({
            message: "Forbidden: Spot belongs to the current user. Cannot create a booking."
        })
    }

    // destructure the req.body to be used later
    const { startDate, endDate } = req.body
    
    // convert the given req.body startDate & endDate from STRING to OBJECT
    const newBookingStartDate = new Date(startDate)
    const newBookingEndDate = new Date(endDate)
    
    // date check: check if dates are valid before booking (date validation check)
    // if the new booking start date is ON or comes AFTER the new booking end date, return 400 error
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
            startDate: { [Op.lt]: newBookingEndDate },
            endDate: { [Op.gt]: newBookingStartDate }
        }, 
    })
    
    // existing booking check: check if an existing booking actually exists
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
    
    // if no errors are hit then create a new booking
    const newBooking = await Booking.create({
        spotId: spot.id,
        userId: req.user.id,
        startDate: startDate,
        endDate: endDate
    })
    res.status(200)
    return res.json({
        ...newBooking.toJSON(),
        createdAt: newBooking.createdAt.toISOString().replace("T", " ").split(".")[0],
        updatedAt: newBooking.updatedAt.toISOString().replace("T", " ").split(".")[0]
    })
})

//! *************** CREATE A REVIEW FOR A SPOT BASED ON THE SPOT'S ID
//? Create a Review for a Spot
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
//? Create an Image for a Spot
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

//! *************** CREATE A SPOT
//? Create a Spot
router.post('/', requireAuth, validateSpot, async (req, res) => {
    // extract components from req.body
    const { 
        address, 
        city, 
        state, 
        country, 
        lat, 
        lng, 
        name, 
        description, 
        price } = req.body    
    
    // create a new spot
    const newSpot = await Spot.create({
       ownerId: req.user.id, 
       address, 
       city, 
       state, 
       country, 
       lat, 
       lng, 
       name, 
       description, 
       price
    })

    res.status(201)
    return res.json(newSpot)
})


//! *************** EDIT A SPOT
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
        res.status(404)
        return res.json({
            message: "Spot couldn't be found"
        })
    }
    await spot.save()
    return res.json(spot)
})

//! *************** DELETE A SPOT
router.delete('/:spotId', requireAuth, async (req, res) => {
    const spot = await Spot.findByPk(req.params.spotId)
    if (spot) {
        // check if the ownerId of the current spot is the same as the current user in session
        if (spot.ownerId === req.user.id) {
            await spot.destroy()
            res.status(200)
            return res.json({
                message: "Successfully deleted."
            })
        } else {
            res.status(403)
            return res.json({
                message: "Forbidden: Current user is not authorized to delete this spot"
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