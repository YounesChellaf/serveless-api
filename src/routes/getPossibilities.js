const express = require('express');
const helper = require('../utils/helpers.js');
const getShippingPossibilities = require('../service/shippingPossibilitiesService');

const router = express.Router();

router.post('/',(req,res) => {

    const startDate = new Date(req.body.start_date);
    const endDate = new Date(req.body.end_date);
    const dateRange = helper.getDatesRange(startDate,endDate);
    const possibilities = [];

    // for each date from the date range, return shipment possibilities
    dateRange.forEach((date)=>{
        const shippingPossibilty = getShippingPossibilities(date);
        if (shippingPossibilty.length>0) possibilities.push(shippingPossibilty)
    })

    return res.json({
        "shipping_possibilities": possibilities
    })
});

module.exports = { getPossibilities: router};