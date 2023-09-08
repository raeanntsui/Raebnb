const express = require('express');
const { Spot, Review, ReviewImage } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const router = express.Router();

//! Delete a Review Image
router.delete('/:imageId', requireAuth, async (req, res) => {
    const reviewImage = await ReviewImage.findByPk(req.params.imageId)
    const review = await Review.findByPk(req.user.id)

    if (req.user.id === review.userId) {
        await reviewImage.destroy()
        res.status(200)
        return res.json({
            message: "Successfully deleted"
        })
    }

    if (!reviewImage) {
        res.status(404)
        return res.json({
            message: "Spot Image couldn't be found"
        })
    }
})

// router.delete('/:imageId', requireAuth, async (req, res) => {
//     const reviewImage = await ReviewImage.findByPk(req.params.imageId)    

//     if (!reviewImage) {
//         res.status(404)
//         return res.json({
//             message: "Review Image couldn't be found"
//         })
//     }

//     await reviewImage.destroy()
//     res.status(200)
//     return res.json({
//         message: "Successfully deleted"
//     })
// })

module.exports = router;