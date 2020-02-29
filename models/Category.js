const mongoose = require('mongoose')
const validator = require('validator')

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


// const Category = mongoose.model("Category", categorySchema)

module.exports = categorySchema