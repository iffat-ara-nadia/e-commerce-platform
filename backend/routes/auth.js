const _ = require("lodash");
const Joi = require("joi");
const bcrypt = require("bcryptjs");
const auth = require("../middleware/auth")
const { User } = require("../models/userModel");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

//for creating / restering new users we use "post"
router.post("/", async(req, res) => {
    const{ error } = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({email: req.body.email})
    if(!user)  return res.status(400).send("Invalid email or password");

    //validate the password, so we need bcrypt
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if(!validPassword)  return res.status(400).send("Invalid email or password");

    const token = user.generateAuthToken();

   /*  res.send(token); */
   res
   .header("x-auth-token", token)
   .header("access-control-expose-headers", "x-auth-token") //to access the token from front end, this line is required.
   .send(_.pick(user, ["_id", "name", "email", "isAdmin"]))
})

function validate(req) {
    const schema = Joi.object({
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required()
    })
    return schema.validate(req)
}

module.exports = router