const mongoose = require ("mongoose")
const Joi = require("joi")
const jwt = require("jsonwebtoken")
//const config = require("config")

//JWTPRIVATEKEY IS A BIG ISSUE.

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },

    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        unique: true
    },

    password: {
        type: String,
        required: true, 
        minlength: 5,
        maxlength: 1024 //Because of hash password.
    },

    isAdmin: {
        type: Boolean,
        required: true,
        default: false
    }
})

userSchema.methods.generateAuthToken = function() {
   const token = jwt.sign({
       
       _id: this._id,
       name: this.name,
       email: this.email,
       isAdmin: this.isAdmin

    }, "jwtPrivateKey");

   return token;
}

const User = mongoose.model("User", userSchema) 

function validateUser(user) {
    const schema = Joi.object({
        name: Joi.string().min(5).max(50).required(),
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required()
    })
    return schema.validate(user)
}
/* REFERENCE:
For the new version of Joi:

const schema = Joi.object({ name: Joi.string() .min(6) .required(),
email: Joi.string() .min(6) .required() .email(),
password: Joi.string() .min(6) .required() });

const validation = schema.validate(req.body);
res.send(validation); */

exports.User = User
exports.userSchema = userSchema
exports.validate = validateUser

