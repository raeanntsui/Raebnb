const express = require('express');
const { Spot, SpotImage, Review } = require('../../db/models');
const router = express.Router();

router.get('/', async(req, res) => {
    const allSpots = await Spot.findAll({
        include: 
        [{
            model: SpotImage,
            attributes: "url"
        },
        {
            model: Review
        }]
    });

    let spotsList = [];
    allSpots.forEach(oneSpot => {
        spotsList.push(oneSpot.toJSON())
    })

    res.json(spotsList);
})

module.exports = router;