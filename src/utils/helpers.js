// Get an array of dates between a range of start_date and end_date
const getDatesRange = (startDate, endDate) =>{
    var dates = [],
        currentDate = startDate,
        addDays = function(days) {
            var date = new Date(this.valueOf());
            date.setDate(date.getDate() + days);
            return date;
        };
    while (currentDate <= endDate) {
        dates.push(currentDate);
        currentDate = addDays.call(currentDate, 1);
    }
    return dates;
};

// Find model by id
const findById = (model,id) => {
    for (var i=0; i<model.length;i++){
        if (model[i].id == id){
            return model[i]
        }
    }
}

// convert array of strings to array of dates
const stringToDateArray = (array) => {
    for (let i=0;i<array.length;i++){
        array[i] = new Date(array[i]).getTime()
    }
    return array
}

// Verify if the shipment is possible in consideration of national/internation delivery with holiday dates
const isAvailableForShipment = (array,date,country) => {
    const BeNelux = ["nl","be","lu"];
    if (! array.includes(date.getTime())) {
        // If the country is out the BeNelux then we check if next day is holiday as international delivery takes 2 days
        if ( !BeNelux.includes(country) && array.includes(date.getTime()+(1000*60*60*24))) {
            return false
        }
        return true
    }
    return false
}
module.exports = {
    getDatesRange,
    findById,
    stringToDateArray,
    isAvailableForShipment
}