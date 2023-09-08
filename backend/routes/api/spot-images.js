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

    await spotImage.destroy()
    res.status(200)
    return res.json({
        message: "Successfully deleted"
    })
})

// Find all spot images
// router.get('/all', requireAuth, async (req, res) => {
//     const allSpotImages = await SpotImage.findAll()
//     return res.json(allSpotImages)
// })

module.exports = router;