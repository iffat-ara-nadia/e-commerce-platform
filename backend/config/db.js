const mongoose = require("mongoose")


async function connectDB () {

    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true 
          
        }) 
        console.log(`mongodb connected: ${conn.connection.host}`.cyan.underline)

    } catch(error) {
        console.error(`Error: ${error.message}`.red.underline.bold)
        process.exit(1)
    }

}

module.exports = connectDB