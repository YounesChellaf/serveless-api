const expect = require('chai').expect;
const helper= require('./utils/helpers.js');
const fs = require('fs');
const path = require('path');

// initial test variables
const start_date = new Date("2020-06-10");
const end_date = new Date("2020-06-15");
const stringArray= [start_date,end_date];
const carriers =  JSON.parse(fs.readFileSync(path.join(__dirname, './mocks/carriers.json')));
const pnl_carrier ={
        "id": "PNL",
        "name": "Post NL",
        "price": 5,
        "countries": ["nl", "be"]
    };

// Test Code
describe('Helper functions isolated test', () => {
    // test a functionality
    // stringToDateArray(array)
    describe('stringToDateArray(array)', () => {
        let testedFunction = helper.stringToDateArray(stringArray);
        it('should return an array type', () => {
            expect(testedFunction).to.be.an('array')
        });
        it('should return a number mileseconds element type', () => {
            testedFunction.forEach(element => {
                expect(element).to.be.an('number')
            })
        })
    });
    // getDatesRange(startDate, endDate)
    describe('getDatesRange(startDate, endDate)', () => {
        let testedFunction = helper.getDatesRange(start_date,end_date)
        it('should return an array type', () => {
            expect(testedFunction).to.be.an('array')
        });
        it('should all array elements be a date type', () => {
            testedFunction.forEach(element => {
                expect(element).to.be.an('date')
            })
        });
        it('should include start and end date', () => {
            expect(testedFunction).to.include(start_date,end_date)
        })
    });
    // isAvailableForShipment(array,date,country)
    describe('isAvailableForShipment(array,date,country)', () => {
        let datesArray = helper.stringToDateArray(helper.getDatesRange(start_date,end_date))
        let testedFunction = helper.isAvailableForShipment(datesArray,start_date,"fr")
        it('should return an boolean', () => {
            expect(testedFunction).to.be.an('boolean')
        });
        it('should return an unavailability for "fr" test case', () => {
            expect(testedFunction).to.be.equal(false)
        })
    });
    // findById(model,id)
    describe('findById(model,id)', () => {
        let testedFunction = helper.findById(carriers,"PNL");
        it('should return an object', () => {
            expect(testedFunction).to.be.an('object')
        });
        it('should return the same carrier object for this test case', () => {
            expect(testedFunction).to.deep.equal(pnl_carrier)
        })
    })
});