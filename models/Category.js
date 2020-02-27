const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
var UserModel = require("./User");
var user = new UserModel
// var user = new UserModel();
// var User = mongoose.model("User", UserModel);

const cardSchema = mongoose.Schema({
    description: {
        type: String,
        require: false,
    },
    frontFace: {
        type:String,
        require: true,
    },
    backFace: {
        type: String,
        require: false,
    }
});

const categorySchema = mongoose.Schema({
    name: {
        type: String,
        require: false,
    },
    isPublic: {
        type: Boolean,
        require: true,
        validate: value => {
            if(!validate.isBoolean(value)){
                throw new Error({error: "isPublic must be Boolean."})
            }
        }
    },
    cards: [cardSchema],
});


categorySchema.statics.listCategory = async (token)=>{
    const user = await UserModel.findOne({'tokens.token': token});
    return user.categories;
}


const Category = mongoose.model("Category", categorySchema)

module.exports = Category