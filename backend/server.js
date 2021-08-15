//const config = require("config")
const Joi = require("joi")
Joi.objectId = require("joi-objectid")(Joi)
const path = require("path")
const cors = require("cors")
const morgan = require("morgan")
const dotenv = require("dotenv")
const colors = require("colors")
const connectDB = require("./config/db")
const productsRoute = require("./routes/productsRoute")
const register = require("./routes/usersRoute")
const login = require("./routes/auth");
const profile = require("./routes/profileRoute")
const orders = require("./routes/ordersRoute")
const uploads = require("./routes/uploadsRoute")
const express = require("express")
const app = express()

// if(!config.get("jwtPrivateKey")) {
//     console.error("FATAL ERROR: jwtPrivateKey is not defined");
//     process.exit(1)
// }

// if (config.has('jwtPrivateKey')) {
//    console.error('FATAL ERROR: jwtPrivateKey is not defined.');
//     process.exit(1);
// }


dotenv.config()
connectDB();

if (app.get('env') === 'development') {
    app.use(morgan('dev'))
}

app.use(express.json())
app.use(cors());


app.use("/api/products", productsRoute)
app.use("/api/register", register)
app.use("/api/login", login)
app.use("/api/profile", profile)
app.use("/api/orders", orders)
app.use("/api/upload", uploads)

//to access uploads folder
//const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

const port = process.env.PORT || 5000
console.log("testing: ", port);
const server = app.listen(port, () => {
    console.log(`server is running on PORT ${port}...`.yellow.bold)
})


module.exports = server

//MONGO_URI = mongodb+srv://costco123:costco123@projects.hveiu.mongodb.net/proshop?retryWrites=true&w=majority