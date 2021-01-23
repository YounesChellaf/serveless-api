# Print.com serverless API
A serverless API that return a shipping possibilities in a range of dates, The project is developed in Node.js using the Lambda AWS function

## The project requirements
1. Use the serverless framework for lambda (AWS)
2. Return shipping possibilities for a range of days
3. Return the supplier per shipping possibilities
4. Only return a single possibility per delivery day per carrier

## Getting started

The project is deployed on AWS and you can check the results via this Postman link: https://www.getpostman.com/collections/0ca9ed8864e72b25b8dd
The get request accept start_date and end_date as params.

For code evaluation you can clone the repository using: 

    $ git clone https://github.com/YounesChellaf/serveless-api.git
    $ cd serveless-api
    $ npm install
    
You can change the credentials of the serverless by overiding the key id and secret and deploy it if needed for AWS monitoring visualization 

