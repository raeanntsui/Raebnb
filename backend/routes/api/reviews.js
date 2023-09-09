const express = require('express');
const { Review, Spot, SpotImage, ReviewImage, User } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const { handleValidationErrors } = require('../../utils/validation');
const { check } = require('express-validator')
const router = express.Router();

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

router.get('/current', requireAuth, async (req, res) => {
    const allReviews = await Review.findAll({
        where: {
            userId: req.user.id
        },
        include: 
        [
        {
            model: User,
            attributes: [ "id", "firstName", "lastName" ]
        },
        {
            model: Spot,
            include: [
                {
                    model: SpotImage,
                    attributes: [ "preview" ]
                }
            ],
            attributes: [ "id", "ownerId", "address", "city", "state", "country", "lat", "lng", "name", "price" ]
        },
        {
            model: ReviewImage,
            attributes: [ "id", "url" ]
        }]
    })

    const reviewArray = []
    allReviews.forEach(review => {
        reviewArray.push(review.toJSON())
    })
    
    reviewArray.forEach(review => {
        review.Spot.SpotImages.forEach(image => {
            if (image.preview !== undefined) {
                review.Spot.previewImage = image.url
            }
        })

        if (review.Spot.previewImage === undefined) {
            review.Spot.previewImage = "No preview image for Review found"
            delete review.Spot.SpotImages
        }
    })

    res.json({
        Reviews: reviewArray
    })
})

//! **************** ADD AN IMAGE TO A REVIEW BASED ON THE REVIEW'S ID
//? Create an Image for a Review
//!MINE
router.post('/:reviewId/images', requireAuth, async(req, res) => {
    const review = await Review.findByPk(req.params.reviewId)
    const user = await User.findByPk(req.user.id)
    const reviewImages = await ReviewImage.findAll()
    const { url } = req.body
    
    // if no reviews exist, return a 404 error
    if (!review) {
        res.status(404)
        return res.json({
            message: "Review couldn't be found"
        })
    }
    
    // check if review exists
    if (review) {
        // check if review belongs to the current user
        if (review.userId === user.id) {
            // check if the current review has less than 10 reviews
            if (reviewImages.length <= 10) {
                // add the new image to review
                const newImageForReview = await ReviewImage.create({
                    reviewId: req.params.reviewId,
                    url
                })
                res.status(200)
                return res.json(newImageForReview)
    } else {
        // if there are too many reviews (over 10) return a 403 error
        res.status(403)
        return res.json({
            message: "Maximum number of images for this resource was reached"
        })
    }
        }
    }

})

//! Edit a Review
router.put('/:reviewId', requireAuth, validateReview, async (req, res) => {
      const oneReview = await Review.findByPk(req.params.reviewId)
      
      if (!oneReview || req.user.id !== oneReview.userId) {
        res.status(404)
        return res.json({ message: "Review couldn't be found" })
      }
      
      const { review, stars } = req.body;
  
      await oneReview.update({ review, stars })
      res.json(oneReview)
    }
  )

//! Delete a Review
router.delete('/:reviewId', requireAuth, async (req, res) => {
    const review = await Review.findByPk(req.params.reviewId)
    if (!review) {
            res.status(404)
            return res.json({
                message: "Review couldn't be found."
            })
        }

    await review.destroy()
    return res.json({
        message: "Successfully deleted."
    })
})

module.exports = router;