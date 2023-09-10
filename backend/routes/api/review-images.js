const express = require('express');
const { Review, ReviewImage } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const router = express.Router();

//! Delete a Review Image
router.delete('/:imageId', requireAuth, async (req, res) => {
    const reviewImage = await ReviewImage.findByPk(req.params.imageId)
    
    if (!reviewImage) {
        res.status(404)
        return res.json({
            message: "Review Image couldn't be found"
        })
    }
    
    const review = await Review.findByPk(req.user.id)
    
    if (req.user.id !== review.userId) {
        res.status(403)
        return res.json({
            message: "Forbidden: Review must belong to the current user"
        })
    }

    // if (req.user.id === review.userId) {
        await reviewImage.destroy()
        res.status(200)
        return res.json({
            message: "Successfully deleted"
        })
    // }
})

module.exports = router;