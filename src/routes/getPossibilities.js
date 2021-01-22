const express = require('express');
const helper = require('../utils/helpers.js');
const getShippingPossibilities = require('../service/shippingPossibilitiesService');

const router = express.Router();

router.post('/',(req,res) => {

    const start_date = new Date(req.body.start_date);
    const end_date = new Date(req.body.end_date);
    const dates = helper.getDates(start_date,end_date);
    const possibilities = [];

    dates.forEach((date)=>{
        const possibility_per_date = getShippingPossibilities(date);
        possibilities.push(possibility_per_date)
    });

    return res.json({
        "shipping_possibilities": possibilities
        //"shipping_possibilities":"hello"
    })
});

module.exports = { getPossibilities: router};