const helper= require('../utils/helpers.js');
const fs = require('fs');
const path = require('path')


// Importing data from the mocks files with the fs package
const carriers =  JSON.parse(fs.readFileSync(path.join(__dirname, '../mocks/carriers.json')));
const countries = JSON.parse(fs.readFileSync(path.join(__dirname, '../mocks/countries.json')));
const suppliers = JSON.parse(fs.readFileSync(path.join(__dirname, '../mocks/suppliers.json')));

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