const express = require('express');
const router = express.Router();

const sql = require('../utils/sql');

// req = request, res = response
// req: you're saying 'give me everything that goes with this route'
// res: server says 'ok', packages the data up, and gives it back to the browser

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
        // controls 'people' var on home.hbs
        res.render('home', { person: result });
    })
})

module.exports = router;