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
        const categories = await User.findCategoriesById(req.user.id);
        res.status(200).send(categories)
    } catch (error) {
        res.status(500).send(error);
    }
});

/*
* Create a category
*/
router.post("/",  auth, async(req ,res) => {
    try {
        const {name, isPublic, cards} = req.body
        const category = await User.addCategory(req.user.id, req.body)
        res.status(200).send({message : "Add category successfully!", category})
    } catch (error) {        
        res.status(500).send({error})
    }
    
});

/*
* Change category
*/

/*
* Delete categories
*/
module.exports = router;