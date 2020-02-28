const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

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

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate: value => {
            if (!validator.isEmail(value)) {
                throw new Error({error: 'Invalid Email address.'})
            }
        }
    },
    password: {
        type: String,
        required: true,
        minLength: 7
    },
    categories: [categorySchema],
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
})

userSchema.pre('save', async function (next) {
    // Hash the password before saving the user model
    const user = this
    
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }
    next()
})

userSchema.methods.generateAuthToken = async function() {    
    // Generate an auth token for the user
    const user = this
    const token = jwt.sign({_id: user._id}, process.env.JWT_KEY)
    user.tokens = user.tokens.concat({token})
    await user.save()
    return token
}

userSchema.statics.findByCredentials = async (email, password) => {
    // Search for a user by email and password.
    const user = await User.findOne({ email} )
    if (!user) {
        throw new Error({ error: 'Invalid login credentials' })
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password)
    if (!isPasswordMatch) {
        throw new Error({ error: 'Invalid login credentials' })
    }
    return user
}

const User = mongoose.model('User', userSchema)

module.exports = User