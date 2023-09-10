const express = require('express');
const { Spot, SpotImage } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const router = express.Router();

//! Delete a Spot Image
router.delete('/:imageId', requireAuth, async (req, res) => {
    const spotImage = await SpotImage.findByPk(req.params.imageId)    
    
    if (!spotImage) {
        res.status(404)
        return res.json({
            message: "Spot Image couldn't be found"
        })
    }
    
    const spot = await Spot.findByPk(spotImage.spotId)

    if (!spot) {
        res.status(404)
        return res.json({
            message: "Spot couldn't be found"
        })
    }
    
    if (req.user.id !== spot.ownerId) {
        res.status(403)
        return res.json({
            message: "Forbidden: Spot must belong to the current user"
        })
    }

    await spotImage.destroy()
    res.status(200)
    return res.json({
        message: "Successfully deleted"
    })
})

module.exports = router;