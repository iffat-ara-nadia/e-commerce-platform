const mongoose = require ("mongoose")
const Joi = require("joi")


const reviewSchema = mongoose.Schema({
    name: { type: String, required: true},
    rating: { type: Number, required: true},
    comment: { type: String, required: true},
    //Have a USER associated with the review.
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'     
    } 
 }, { timestams: true })

const productSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'     //wrong: User
    },

    name: {
        type: String,
        required: true
    },

    image: {
        type: String,
        required: true
    },

    //missed this field, so couldn't get brand name from frontend. Then manually add brand name to every product in database.
    //QUESTION: WHAT TO DO, IF I MISSED ANY FIELD LIKE THIS AND THE DATABASE IS QUITE LARGE,
    // NOT able to edit all document manually??????

    brand: {
        type: String,
        required: true
    },
    
    category: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true   
    },

    reviews: [reviewSchema], //reviews is an array of review object.

    rating: {
        type: Number,
        required: true,
        default: 0  
    },

    numReviews: {
        type: Number,
        //required: true,
        default: 0     
    },

    price: {
        type: Number,
        required: true,
        default: 0     
    },

    countInStock: {
        type: Number,
        required: true,
        default: 0     
    }
})

const Product = mongoose.model("Product", productSchema) //wrong: i wrote Model

/* function validateProduct(product) {
   /* WRONG: const schema = Joi.validateObject({
        name: Joi.string().required()

    })
    return Joi.validate(schema) 

    const schema = Joi.object({
        name: Joi.string().required(),
        user: Joi.objectId(),
        price: Joi.number(),
        image: Joi.string().required(),
        brand: Joi.string().required(),
        category: Joi.string().required(),
        countInStock: Joi.number().required(),
        numReviews: Joi.number(),
        description: Joi.string().required()
    })
    return schema.validate(product)
} */

exports.Product = Product
//exports.validate = validateProduct

/* 
I wrote:
 module.exports = Product,
 module.exports = validateProduct
  
 That's why, when I imported 'validate' function in productsRoute and send an empty JSON object
 in POSTMAN, I got: UnhandledPromiseRejectionWarning: TypeError: Cannot read property 'find' of undefined.
 UnhandledPromiseRejectionWarning: ReferenceError: validate is not defined

 */