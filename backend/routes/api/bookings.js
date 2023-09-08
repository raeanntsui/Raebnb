const express = require('express');
const { Booking, Spot, SpotImage } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const { handleValidationErrors } = require('../../utils/validation');
const { check } = require('express-validator')
const router = express.Router();

const validateBooking = [
    check('endDate')
        .exists({ checkFalsy: true })
        .withMessage('Street address is required'),
        handleValidationErrors
]

//! Get all of the Current User's Bookings
router.get('/current', requireAuth, async (req, res) => {
    const bookings = await Booking.findAll({
        where: { userId: req.user.id },
        include: [ 
            { 
            model: Spot, 
            attributes: ["id", "ownerId", "address", "city", "state", "country", "lat", "lng", "name", "price"],
                include:[
                    { model: SpotImage, attributes: [ "url","preview" ] }
                ]
            }
        ]
    })

    const bookingsArray = [];
    bookings.forEach(booking => {
        bookingsArray.push(booking.toJSON())
    })

    bookingsArray.forEach(booking => {
        booking.Spot.SpotImages.forEach(image => {
            if (image.preview) booking.Spot.previewImage = image.url
        })

        if (!booking.Spot.previewImage) {
            booking.Spot.previewImage = "No preview image for Booking found"
        }
        delete booking.Spot.SpotImages
    })
    return res.json({Bookings: bookingsArray})
})

//! Edit a Booking
//! Need to create a body validation error function (above incomplete)
// errors: {
//     "endDate": "endDate cannot come before startDate"
//   }
router.put('/:bookingId', requireAuth, async (req, res) => {
    const booking = await Booking.findByPk(req.params.bookingId)

    // if a booking currently exists...
    if (booking) {
        // check if the booking's user id and the current user id are the same
        if (booking.userId === req.user.id) {
            // if they are the same, continue to edit the booking as intended
            const { startDate, endDate } = req.body

            // converts date from string to object
            const editStartDate = new Date(startDate)
            const editEndDate = new Date(endDate)

            // check if the (new end date) editEndDate does not come before the (new start date) editStartDate
            if (editStartDate < editEndDate ) {
                // update the booking with the given req.body components
                await booking.update({
                    spotId: booking.userId, 
                    userId: req.user.id, 
                    startDate, 
                    endDate
                })
                return res.json(booking)
            } else {
                // if the new endDate comes before the new startDate, throw error
                //? Body validation errors
                res.status(400)
                return res.json({
                    message: "Bad Request",
                    error: "endDate cannot come before startDate"
                })
            }


        } else {
            // if booking does not have a matching booking user id and current user id
            //? Error response: Couldn't find a Booking with the specified id
            res.status(404)
            res.json({
                message: "Booking couldn't be found"
            })
        }
    } 

    //! Error response: Can't edit a booking that's past the end date

})


module.exports = router;