var express = require('express');
const User = require("../models/User");
const Category = require("../models/Category");
const auth = require("../middleware/auth")
var router = express.Router();

/*
* [/categories] Route.
*/

/*
* Get list of categories
*/
router.get("/", auth, async (req, res) => {
    try {
        const category = await Category.listCategory(req.token);
        res.status(200).send(category)
    } catch (error) {
        res.status(500).send(error);
    }
});

/*
* Create a category
*/
router.post("/",  auth, async(req ,res) => {
    try {

    } catch (error) {

    }
    
});

/*
* Change category
*/

/*
* Delete categories
*/
module.exports = router;