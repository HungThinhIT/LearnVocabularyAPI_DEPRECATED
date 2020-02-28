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
        type: Number,
        require: true,
        min: [0, "Only 0 or 1"],
        max: 1,
        // validate: value => {
        //     if(!validator.isNumeric(value)){
        //         throw new Error({error: "isPublic must be Numeric [0-1]."})
        //     }
        // }
    },
    cards: [cardSchema],
});



categorySchema.statics.listCategory = async (token)=>{
    const user = await UserModel.findOne({'tokens.token': token});
    return user.categories;
}

categorySchema.statics.createCategory = async(token, body) => {
    console.log("vo trong nay roi ne");
    
    // const user = await UserModel.findOne({'tokens.token':token})
    // var category user.categories = body;
    
    console.log("body:"+JSON.stringify(body));
    user.categories.push(body)
    // var subdoc = user.categories[1]
    // console.log(subdoc.isNew);
    
    Category.save(function (err) {
        if (err) return console.log(err);
        console.log('Success!');
        return user.categories;
      });
    return user.categories
}

// categorySchema.statics.pre("save" ,async function(next){
    
//     next()
// })

const Category = mongoose.model("Category", categorySchema)

module.exports = Category