const bcrypt = require("bcryptjs") //Udemy: Brad (prefers bcryptjs to bcrypt)
/* NOTE:  bcrypt is a native (C++) module, thus much faster than bcryptjs which is a pure js module. ... bcryptjs is plain js, 
hence works everywhere, even browsers. bcrypt runs only on NodeJS, Node-WebKit or Electron. */

const users = [
    {
        name: "Admin User",
        email: "admin@gmail.com",
        password: bcrypt.hashSync("123456", 10),
        isAdmin: true
    },

    {
        name: "Era Hasan",
        email: "era@gmail.com",
        password: bcrypt.hashSync("123456", 10)
    },

    {
        name: "Nadia",
        email: "nadia@gmail.com",
        password: bcrypt.hashSync("123456", 10)
    }

]

module.exports = users