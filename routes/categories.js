var express = require('express');
const User = require("../models/User");
const auth = require("../middleware/auth")
var router = express.Router();

/*
* [/categories] Route.
*/

/*
* Get list of categories
*/
router.get("/", auth, async (req, res) => {
    console.log(req.user.categories);
    res.send(req.user.categories);
});

/*
* Create a category
*/
router.post("/",  auth, async(req ,res) => {
    try {
        const categories = req.body;
        const user = new User();
        var create = await user.createCategory(req._id, req.body);
        res.send(create);
    } catch (error) {
        console.log(error);
        
        res.status(500).send(error);
    }
    
});

/*
* Change category
*/

/*
* Delete categories
*/
module.exports = router;