//const config = require("config")
const cors = require("cors")
const dotenv = require("dotenv")
const colors = require("colors")
const connectDB = require("./config/db")
const productsRoute = require("./routes/productsRoute") 
const register = require("./routes/usersRoute") 
const login = require("./routes/auth");
const profile = require("./routes/profileRoute")
const orders = require("./routes/ordersRoute")
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

app.use(express.json())
app.use(cors());


app.use("/api/products", productsRoute)
app.use("/api/register", register)
app.use("/api/login", login)
app.use("/api/profile", profile)
app.use("/api/orders", orders)


const port = process.env.PORT || 5000
const server = app.listen(port, () => {
    console.log(`server is running on PORT ${port}...`.yellow.bold)
})


module.exports = server