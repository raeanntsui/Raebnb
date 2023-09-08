const express = require('express');
const { Booking, Spot, SpotImage } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const { handleValidationErrors } = require('../../utils/validation');
const { check } = require('express-validator')
const router = express.Router();

router.get('/current', requireAuth, async (req, res) => {
    const booking = await Booking.findAll({
        where: {
            userId: req.user.id
        },
        include: [
            {
                model: Spot,
                include:[
                    {
                        model: SpotImage,
                        attributes: [ "preview" ]
                    }
                ]
            }
        ]
    })
    return res.json(booking)
})

module.exports = router;