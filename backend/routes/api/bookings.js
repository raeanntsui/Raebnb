const express = require('express');
const { Booking, Spot, SpotImage, User } = require('../../db/models');
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
// router.put('/:bookingId', requireAuth, async (req, res) => {
//     const booking = await Booking.findByPk(req.params.bookingId)

//     // if a booking currently exists...
//     if (booking) {
//         // check if the booking's user id and the current user id are the same
//         if (booking.userId === req.user.id) {
//             // if they are the same, continue to edit the booking as intended
//             const { startDate, endDate } = req.body

//             // converts date from string to object
//             const editStartDate = new Date(startDate)
//             const editEndDate = new Date(endDate)

//             // check if the (new end date) editEndDate does not come before the (new start date) editStartDate
//             if (editStartDate < editEndDate ) {
//                 // update the booking with the given req.body components
//                 await booking.update({
//                     spotId: booking.userId, 
//                     userId: req.user.id, 
//                     startDate, 
//                     endDate
//                 })
//                 return res.json(booking)
//             } else {
//                 // if the new endDate comes before the new startDate, throw error
//                 //? Body validation errors
//                 res.status(400)
//                 return res.json({
//                     message: "Bad Request",
//                     error: "endDate cannot come before startDate"
//                 })
//             }
//         } 
        
//         if (booking.userId !== req.user.id) {
//             // if booking does not have a matching booking user id and current user id
//             //? Error response: Couldn't find a Booking with the specified id
//             res.status(404)
//             return res.json({
//                 message: "Booking couldn't be found"
//             })
//         }
//         return res.json(booking)
//     } 

//! Error response: Can't edit a booking that's past the end date

// })

router.put('/:bookingId', requireAuth, async (req, res) => {
    const booking = await Booking.findByPk(req.params.bookingId)
    
    // if booking does not exist, throw error
    if (!booking) {
        res.status(404)
        return res.json({
            message: "Booking couldn't be found"
        })
    }
    
    // if they are the same, continue to edit the booking as intended
    const { startDate, endDate } = req.body

    // converts date from string to object
    const editStartDate = new Date(startDate)
    const editEndDate = new Date(endDate)
    
    //? Error response: Can't edit a booking that's past the end date
    const currentBookingDate = new Date()
    if (currentBookingDate > editEndDate) {
        res.status(403)
        return res.json({
            message: "Past bookings can't be modified"
        })
    } 
    
    // if a booking currently exists... and if the booking's user id and the current user id are the same
    if (booking && (booking.userId === req.user.id)) {

        // check if the (new end date) editEndDate does not come before the (new start date) editStartDate
        if (editStartDate < editEndDate ) {
            // update the booking with the given req.body components
            await booking.update({
                spotId: booking.userId, 
                userId: req.user.id, 
                startDate, 
                endDate
            })
            res.status(200)
            return res.json(booking)
        } else {
            // if the (new end date) editEndDate comes BEFORE the (new start date) editStartDate, throw error
            res.status(400)
            return res.json({
                message: "Bad Request",
                error: "endDate cannot come before startDate"
            })
        }
    } 

    //? Error response: Bookings that have been started can't be deleted
    //! not sure what this means
    if (currentBookingDate === editStartDate) {
        res.status(403)
        res.json({
            message: "Start date conflicts with an existing booking"
        })
    }

    if (currentBookingDate === editEndDate) {
        res.status(403)
        res.json({
            message: "End date conflicts with an existing booking"
        })
    }

})

//! Delete a Booking
router.delete('/:bookingId', requireAuth, async (req, res) => {
    const user = await User.findByPk(req.user.id)
    const spot = await Spot.findByPk(req.user.id)
    const booking = await Booking.findByPk(req.params.bookingId)
    
    // check if booking OR spot belongs to the current user 
    if ((booking.userId === req.user.id) || (spot.ownerId === req.user.id)) {
        await booking.destroy()
        res.status(200)
        res.json({
            message: "Successfully deleted"
        })
    } else {
        res.status(404)
        res.json({
            message: "Booking couldn't be found"
        })
    }
    
    // convert the existing booking date from string to object(used later for comparison)
    const existingBookingDate = new Date(booking.startDate)

    // create a new variable for the time RIGHT NOW
    const dateRightNow = new Date()
    if (existingBookingDate < dateRightNow) {
        res.status(403)
        res.json({
            message: "Bookings that have been started can't be deleted"
        })
    }
})

module.exports = router;