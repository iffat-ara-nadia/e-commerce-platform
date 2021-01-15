// import mongoose from "mongoose"
// import dotenv from "dotenv"
// import colors from "colors"
// import products from "products"

const mongoose = require ("mongoose")
const dotenv = require("dotenv")
const colors = require("colors")
const products = require("./data/products")
const users = require("./data/users")
const Product  = require("./models/productModel")
const User  = require("./models/userModel")
const Order = require("./models/orderModel")
const connectDB = require("./config/db")

dotenv.config()

connectDB()

async function importData() {
    try {
        await Product.deleteMany()
        await Order.deleteMany()
        await User.deleteMany()

        const createdUsers = await User.insertMany(users) //return an array of users
        
        const adminUser = createdUsers[0]._id

        const sampleProducts = products.map(product => {
           return {
               ...product, 
               user: adminUser
            }
        })

        await Product.insertMany(sampleProducts)

        console.log("Data imported!".green.inverse)
        process.exit()
        
    } catch (error) {
        console.log(`${error}`.red.inverse)
        process.exit(1)
    }
}


async function destroyData() {
    try {
        await Product.deleteMany()
        await Order.deleteMany()
        await User.deleteMany()

        console.log("Data destroyed!".red.inverse)
        process.exit()
        
    } catch (error) {
        console.log(`${error}`.red.inverse)
        process.exit(1)
    }
}


if(process.argv[2] === '-d') //what does this mean?
     destroyData()

importData()