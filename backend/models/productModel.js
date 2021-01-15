const mongoose = require ("mongoose")

const reviewSchema = mongoose.Schema({
    name: { type: String, required: true},
    rating: { type: Number, required: true},
    comment: { type: String, required: true}
})

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
        required: true,
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

module.exports = Product