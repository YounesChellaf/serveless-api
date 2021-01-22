// Get an array of dates between a range of start_date and end_date
const getDates = (startDate, endDate) =>{
    let dates = [],
        currentDate = startDate,
        addDays = function(days) {
            let date = new Date(this.valueOf());
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
const findByID = (model,id) => {
    for (let i=0; i<model.length;i++){
        if (model[i].id === id){
            return model[i]
        }
    }
};

// A function to convert array of strings to array of Dates
const convertArrayDate = (array) => {
    for (let i=0;i<array.length;i++){
        array[i] = new Date(array[i]).getTime()
    }
    return array
};

module.exports =  {
    getDates,
    findByID,
    convertArrayDate
};