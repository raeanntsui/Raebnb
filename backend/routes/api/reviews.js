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

//! **************** GET ALL REVIEWS OF THE CURRENT USER
//? Get Reviews of Current User
router.get('/current', requireAuth, async (req, res) => {
    const allReviews = await Review.findAll({
        where: { userId: req.user.id },
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

    res.status(200)
    return res.json({ Reviews: reviewArray })
})

//! **************** ADD AN IMAGE TO A REVIEW BASED ON THE REVIEW'S ID
//? Create an Image for a Review
//TODO Need to delete the reviewId, createdAt, and updatedAt fields from the response, everything else is working fine
router.post('/:reviewId/images', requireAuth, async(req, res) => {

    // find the review at the specified review id
    const review = await Review.findByPk(req.params.reviewId, {
        include: ReviewImage
    })

    // const user = await User.findByPk(req.user.id)
    // const reviewImages = await ReviewImage.findAll()

    // grab the incoming url from the req body
    const { url } = req.body
    
    // if no reviews exist, return a 404 error
    if (!review) {
        res.status(404)
        return res.json({
            message: "Review couldn't be found"
        })
    }

    // if the current user and review's user id match...
    if (req.user.id === review.userId) {
        // and if the current review has less than 10 images
        if (review.ReviewImages.length < 10) {
            // go ahead and create a new image for the current review
            const newReviewImage = await review.createReviewImage({
                url,
                // reviewId: req.params.reviewId
            })    
        
            // delete the review, createdAt, and updatedAt attributes in the response
            
            await newReviewImage.save()
            res.status(200)
            return res.json(newReviewImage)
        // if the current review exceeds 10 images, return 403 error
        } else if (review.ReviewImages.length >= 10) {
            res.status(403)
            return res.json({
                message: "Maximum number of images for this resource was reached"
            })
        }

    // if the current user and review's user id DO NOT MATCH, return 403 error
    } else if (req.user.id !== review.userId) {
        res.status(403)
        return res.json({
            message: "Forbidden: Review must belong to the current user in order to add an image for a review"
        })
    }

})
    
//! **************** EDIT A REVIEW
//? Edit a Review
router.put('/:reviewId', requireAuth, validateReview, async (req, res) => {
    const oneReview = await Review.findByPk(req.params.reviewId)

    // check if the current user is authorized to edit a review
    if (req.user.id !== oneReview.userId) {
        res.status(403)
        return res.json({ 
            message: "Forbidden: Current user is not authorized to edit this review" 
        })
    }

    // if the current review does not exist
    if (!oneReview) {
        res.status(404)
        return res.json({ 
            message: "Review couldn't be found" 
        })
    }

    const { review, stars } = req.body;

    await oneReview.update({ review, stars })

    res.status(200)
    return res.json(oneReview)
})

//! **************** DELETE A REVIEW
//? Delete a Review
router.delete('/:reviewId', requireAuth, async (req, res) => {
    const currentReview = await Review.findByPk(req.params.reviewId)
    console.log("*************** CURRENT REVIEW", currentReview)
    console.log("*************** req.params.reviewId", req.params.reviewId)
    
    // if current review does not exist, return 404 error
    if (!currentReview) {
        res.status(404)
        return res.json({
            message: "Review couldn't be found."
        })
    }
    
    // check if the current user is authorized to delete the current review
    if (req.user.id !== currentReview.userId) {
        res.status(403)
        return res.json({
            message: "Forbidden: Current user is not authorized to delete this review"
        })
    }

    // if no errors are hit, proceed with deletion of review
    await currentReview.destroy()
    res.status(200)
    return res.json({
        message: "Successfully deleted."
    })
})

module.exports = router;