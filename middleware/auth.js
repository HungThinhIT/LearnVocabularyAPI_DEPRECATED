const jwt = require("jsonwebtoken")
const User = require("../models/User")

const auth = async(req, res, next) => {
    // const data = jwt.verify(token, process.env.JWT_KEY)
    try {
        const token = req.get('Authorization').replace('Bearer ', '')
        const data = jwt.verify(token, process.env.JWT_KEY );    
        const user = await User.findOne({ _id: data._id, 'tokens.token': token }, {categories: 0})
        if (!user) {
            throw new Error()
        }
        req.user = user
        req.token = token
        next()
    } catch (error) {
        if(error.message == "Cannot read property 'replace' of undefined") return res.status(401).send({error: "Token is missing"})
        if(error.message == "invalid signature") return res.status(401).send({error: "Invalid signature"})
        if(error.message == "jwt malformed") return res.status(401).send({error: "JWT malformed"})
        else res.status(401).send({error: "Not authorized to access this resources"})
    }
}

module.exports = auth