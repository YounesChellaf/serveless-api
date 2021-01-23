const helper= require('../utils/helpers.js');

const carriers = [
    {
        "id": "PNL",
        "name": "Post NL",
        "price": 5,
        "countries": ["nl", "be"]
    },
    {
        "id": "DHP",
        "name": "DHL",
        "price": 5,
        "countries": ["nl", "be", "fr"]
    },
    {
        "id": "DHP_EXPRESS",
        "name": "DHL ochtend levering",
        "price": 7.5,
        "countries": ["nl", "be"]
    },
    {
        "id": "DPD",
        "name": "DPD",
        "price": 7,
        "countries": ["nl", "fr"]
    },
    {
        "id": "RTG",
        "name": "Koerier",
        "price": 25,
        "countries": ["nl", "be"]
    }
]
const countries = [
    {
        "id": "nl",
        "holidays": [
            "2021-05-05",
            "2021-05-13",
            "2021-05-23",
            "2021-05-24"
        ]
    },
    {
        "id": "be",
        "holidays": [
            "2021-05-05",
            "2021-05-13",
            "2021-05-23",
            "2021-05-24"
        ]
    },
    {
        "id": "fr",
        "holidays": [
            "2021-05-01",
            "2021-05-08",
            "2021-05-23",
            "2021-05-24"
        ]
    }
]
const suppliers = [
    {
        "id": "KN",
        "address": {
            "country": "nl"
        },
        "carriers": [
            "PNL",
            "RTG",
            "DHP",
            "DHP_EXPRESS"
        ]
    },
    {
        "id": "TMB",
        "address": {
            "country": "nl"
        },
        "holidays": [
            "2021-05-07",
            "2021-05-08"
        ],
        "carriers": [
            "PNL",
            "DPD",
            "DHP"
        ]
    },
    {
        "id": "FRS",
        "address": {
            "country": "fr"
        },
        "holidays": [
            "2021-05-09"
        ],
        "carriers": [
            "DHP"
        ]
    }
]

// A function to get the shipping possibilities for a specific date (one day)
const getShippingPossibilities = (date) => {
    const shippingPossibilitiesPerDay = [];
    // Get different delivery possibilities for each supplier
    suppliers.map(supplier => {
        var supplierHolidays = helper.stringToDateArray(helper.findById(countries,supplier.address.country).holidays)
        // Get an array of holiday dates per supplier (supplier holiday + country hiliday)
        if (supplier.holidays) supplierHolidays = supplierHolidays.concat(helper.stringToDateArray(supplier.holidays))
        // if the supplier is on holiday => invalid date for shipping
        if( helper.isAvailableForShipment(supplierHolidays,date,supplier.address.country)) {
            supplier.carriers.map(carrier_id => {
                const carrier = helper.findById(carriers,carrier_id);
                let i=0;
                let isShipped = false; // This boolean for returning only one shippement possiblity
                // A loop for returning only one delivery possibility per carrier
                while (i < carrier.countries.length && !isShipped){
                    const carrierHolidays = helper.stringToDateArray(helper.findById(countries,carrier.countries[i]).holidays)
                    //if (! carrierHolidays.includes(date.getTime()))  {
                    if (helper.isAvailableForShipment(carrierHolidays,date,carrier.countries[i])) {
                        // A single shipping possibility
                        const shippingPossibilty= {
                            supplier: supplier.id,
                            from: supplier.address.country,
                            carrier: carrier.id,
                            to: carrier.countries[i],
                            delivery_date: date.toDateString()
                        };
                        shippingPossibilitiesPerDay.push(shippingPossibilty);
                        isShipped= true
                    }
                    i++
                }
            })
        }
    });
    return shippingPossibilitiesPerDay
}




module.exports = getShippingPossibilities;