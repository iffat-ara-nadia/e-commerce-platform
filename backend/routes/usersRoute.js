const _ = require("lodash");
const bcrypt = require("bcryptjs");
const { User, userSchema, validate } = require("../models/userModel");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();



//for creating / REGISTERING new users we use "post"
router.post("/", async(req, res) => {
    const{ error } = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({email: req.body.email})

    if(user)  return res.status(400).send("User already registered");

    //registering new user
   /*  user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    }) */

    user = new User( _.pick(req.body, ["name", "email", "password"]))

    /* password Modified na hole ki hobe seta udemy backend registration thk nite hobe */

   /*  userSchema.pre("save", async(next)=> {
        if(!this.isModified("password"))
        next();

    }) */
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);



    await user.save();

    const token = user.generateAuthToken();
    res
    .header("x-auth-token", token)
    .header("access-control-expose-headers", "x-auth-token") //to access the token from front end, this line is required.
    .send(_.pick(user, ["_id", "name", "email", "isAdmin"]));
})


module.exports = router