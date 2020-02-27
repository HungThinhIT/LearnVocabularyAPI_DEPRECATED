var express = require('express');
const User = require("../models/User");
const auth = require("../middleware/auth")
var router = express.Router();

/*
* [/user] Route.
*/



/*
* Create a new user.
*/
router.post("/register", async (req, res) => {
  try {
    const user = new User(req.body)
    await user.save()
    const token = await user.generateAuthToken()
    res.status(201).send({user, token})
  } catch (error) {
    res.status(400).send(error)
  }
});


/*
* Login a registered user.
*/
router.post("/login", async(req, res) => {
  try {
    const {email, password} = req.body
    const user = await User.findByCredentials(email, password)
    if(!user) return res.status(401).send({error:"Login failed! Check authentication credentials"})
    const token = await user.generateAuthToken()
    res.send({user, token})
  } catch (error) {
    res.status(400).send({error:"Failed", message:"Login failed, Wrong username or password."})
  }
}); 

/*
* Return information of user.
*/
router.get("/me", auth , async(req, res) => {
  res.send(req.user)
});

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

module.exports = router;
