const express = require('express');
const { Booking, Spot, SpotImage, User } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const { handleValidationErrors } = require('../../utils/validation');
const { check } = require('express-validator')
const router = express.Router();
const { Op } = require("sequelize")

const validateBooking = [
    check('endDate')
        .exists({ checkFalsy: true })
        .withMessage('Street address is required'),
        handleValidationErrors
]

//! *************** GET ALL OF THE CURRENT USER'S BOOKINGS
//? Get All Current User's Bookings
router.get('/current', requireAuth, async (req, res) => {
    const bookings = await Booking.findAll({
        where: { userId: req.user.id },
        include: [
          {
            model: Spot,
            include: [
                { 
                    model: SpotImage 
                }
            ],
            attributes: [
              "id",
              "ownerId",
              "address",
              "city",
              "state",
              "country",
              "lat",
              "lng",
              "name",
              "price",
            ],
          },
        ],
      });

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

    res.status(200)
    return res.json({
        Bookings: bookingsArray.map(aBooking => ({
            ...aBooking,
            startDate: aBooking.startDate.toISOString().split("T")[0],
            endDate: aBooking.endDate.toISOString().split("T")[0],
            createdAt: aBooking.createdAt.toISOString().replace("T", " ").split(".")[0],
            updatedAt: aBooking.updatedAt.toISOString().replace("T", " ").split(".")[0]
        }))
    })
})

//! *************** EDIT A BOOKING
//? Edit a Booking
// router.put('/:bookingId', requireAuth, async (req, res) => {
//     const booking = await Booking.findByPk(req.params.bookingId)

//     // booking check: check if a booking does not exist...
//     if (!booking) {
//         res.status(404)
//         return res.json({
//             message: "Booking couldn't be found"
//         })
//     }

//     // authorization check: check if the booking belongs to the current user
//     if (booking.userId !== req.user.id) {
//         res.status(403)
//         return res.json({
//             message: "Booking must belong to the current user"
//         })
//     }

//     const { startDate, endDate } = req.body
    
//     // converts date from string to object
//     const editStartDate = new Date(startDate)
//     const editEndDate = new Date(endDate)
//     const dateRightNow = new Date()


//     // check if the (new end date) editEndDate occurs before the (new start date) editStartDate
//     if (editStartDate > editEndDate ) {
//         res.status(400)
//         return res.json({
//             message: "Bad Request",
//             errors: {
//                 endDate: "endDate cannot come before startDate"
//             }
//         })
//     }

//     // find an existing booking
//     const existingBooking = await Booking.findOne({
//         // where: {
//         //     spotId: booking.spotId,
//         //     id: {
//         //         // check if booking id is not equal booking id
//         //         [Op.ne]: booking.id
//         //     },
//         //     startDate: { [Op.lt]: editEndDate },
//         //     endDate: { [Op.gt]: editStartDate }
//         //     }
//         where: {
//             id: { [Op.not]: booking.id },
//             spotId: booking.spotId,
//             [Op.or]: [
//               { 
//                 startDate: { 
//                     [Op.between]: [editStartDate, editEndDate] 
//                 } 
//             },
//               { 
//                 endDate: { 
//                     [Op.between]: [editStartDate, editEndDate] 
//                 } 
//             },
//             ],
//           },
//     })

//     // if the existing booking end date is already past, then you cannot edit the booking
//     if (booking.endDate < dateRightNow) {
//         res.status(403)
//         return res.json({
//             message: "Past bookings can't be modified"
//         })
//     }

//     // check if the existing booking actually exists already
//     if (existingBooking) {
//         res.status(403)
//         return res.json({
//             message: "Sorry, this spot is already booked for the specified dates",
//             errors: {
//                 startDate: "Start date conflicts with an existing booking",
//                 endDate: "End date conflicts with an existing booking"
//             }
//         })
//     }
    
//     await booking.update({
//         spotId: booking.userId, 
//         userId: req.user.id, 
//         startDate, 
//         endDate
//     })

//     return res.json({
//         ...booking.toJSON(),
//         startDate: booking.startDate.toISOString().split("T")[0],
//         endDate: booking.endDate.toISOString().split("T")[0],
//         createdAt: booking.createdAt.toISOString().replace("T", " ").split(".")[0],
//         updatedAt: booking.updatedAt.toISOString().replace("T", " ").split(".")[0]
//     })
// })

router.put("/:bookingId", requireAuth, async (req, res) => {
    const booking = await Booking.findByPk(req.params.bookingId);
    const user = await User.findByPk(req.user.id);
    const { startDate, endDate } = req.body;
  
    const newStartDate = new Date(startDate);
    const newEndDate = new Date(endDate);
    const currentDate = new Date();
  
    if (newEndDate <= newStartDate) {
      res.status(400);
      return res.json({
        message: "Bad Request",
        errors: { endDate: "endDate cannot be on or before startDate" },
      });
    }
  
    if (!booking) {
      res.status(404);
      return res.json({
        message: "Booking couldn't be found",
      });
    }
  
    if (booking.userId !== user.id) {
      res.status(403);
      return res.json({
        message: "Forbidden: Booking must belong to the current user",
      });
    }
  
    if (booking.endDate < currentDate) {
      res.status(403);
      return res.json({ message: "Past bookings can't be modified" });
    }
  
    const conflictingBooking = await Booking.findOne({
      where: {
        id: { [Op.not]: booking.id },
        spotId: booking.spotId,
        [Op.or]: [
          { startDate: { [Op.between]: [newStartDate, newEndDate] } },
          { endDate: { [Op.between]: [newStartDate, newEndDate] } },
        ],
      },
    });
  
    if (conflictingBooking) {
      res.status(403);
      return res.json({
        message: "Sorry, this spot is already booked for the specified dates",
        errors: {
          startDate: "Start date conflicts with an existing booking",
          endDate: "End date conflicts with an existing booking",
        },
      });
    }
  
    await booking.update({
      startDate,
      endDate,
    });
  
    res.json(booking);
    // return res.json({
    //     ...booking.toJSON(),
    //     startDate: booking.startDate.toISOString().split("T")[0],
    //     endDate: booking.endDate.toISOString().split("T")[0],
    //     createdAt: booking.createdAt.toISOString().replace("T", " ").split(".")[0],
    //     updatedAt: booking.updatedAt.toISOString().replace("T", " ").split(".")[0]
    // });
  });

//! *************** DELETE A BOOKING
router.delete('/:bookingId', requireAuth, async (req, res) => {
    // const user = await User.findByPk(req.user.id)
    const booking = await Booking.findByPk(req.params.bookingId)
    const spot = await Spot.findByPk(req.user.id)
    
    if (!booking) {
        res.status(404)
        return res.json({
            message: "Booking couldn't be found"
        })
    }

    // check if booking OR spot belongs to the current user 
    if (booking.userId !== req.user.id) {
        if (spot.ownerId !== req.user.id) {
            res.status(403)
            return res.json({
                message: "Forbidden: Spot does not belong to the current user"
            })
        }
        res.status(403)
        return res.json({
            message: "Forbidden: Booking does not belong to the current user"
        })
    }

    // console.log("booking.userId *** ", booking.userId)
    // console.log("req.user.id *** ", req.user.id)   
    // console.log("spot.ownerId *** ", spot.ownerId)

    // convert the existing booking date from string to object(used later for comparison)
    const existingBookingDate = new Date(booking.startDate)
    
    // create a new variable for the time RIGHT NOW
    const dateRightNow = new Date()

    if (existingBookingDate < dateRightNow) {
        res.status(403)
        return res.json({
            message: "Bookings that have been started can't be deleted"
        })
    }

    if (booking && (booking.userId === req.user.id || spot.ownerId === req.user.id)) {
        // if no other errors are ran, continue to delete the booking
        await booking.destroy()
        res.status(200)
        return res.json({
            message: "Successfully deleted"
        })
    }
})

module.exports = router;