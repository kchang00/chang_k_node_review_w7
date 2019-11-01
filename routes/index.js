const express = require('express');
const router = express.Router();

const sql = require('../utils/sql');

//.get = super global array
// req = request, res = response
// req: you're saying 'give me the data that goes with this route'
// res: server says 'ok', packages the data up, and gives it back to the browser

//THIS ROUTE IS THE HOME
router.get('/', (req, res) => {
    // should really get the user data here and then fetch it thru, but let's try this asynchronously
    console.log('at the main route');

    // data being pulled from database (using query) = result
    let query = "SELECT ID, avatar, Name, Logo, JobTitle FROM tbl_card";

    // if response = an err, do this. else, show the result in this way 
    sql.query(query, (err, result) => {
        if (err) { throw err; console.log(err); }

        console.log(result); // should see objects wrapped in an array

        // render the home view with dynamic data

        // can change the key (changeme: result) to whatever you want
        // controls 'person' var on home.hbs
        res.render('home', { person: result });
    })
})

//THIS IS THE OTHER PAGES
// can name id anything ('/:nameme') = parameter, what the user passes through
router.get('/:id', (req, res) => {
    console.log('at the user route');
    console.log(req.params.id); // look at the request, get the parameter, fetch whatever the id is

    // data being pulled from database (using query) = result
    // backticks = template string
    let query = `SELECT * FROM tbl_bio WHERE profID="${req.params.id}"`;

    // if response = an err, do this. else, show the result in this way 
    sql.query(query, (err, result) => {
        if (err) { throw err; console.log(err); }

        console.log(result);

        //convert the social property into an array before sending it through
        //map is an array method that lets you map one value to another (convert it)
        //grabbing commas and splitting them before and after to select 3 different values
        result[0].social = result[0].social.split(',').map(function(item){

             //removes any empty white space from text
            item = item.trim();

            return item;
        })

        console.log('after trim / conversion:', result[0]);

        // can change the key (changeme: result) to whatever you want
        // controls 'people' var on home.hbs
        res.json(result[0]);
    })
})

module.exports = router;