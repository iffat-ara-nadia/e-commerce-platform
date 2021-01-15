const _ = require("lodash");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const { User, validate } = require("../models/userModel");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();


//get all users by admin
router.get("/users", [auth, admin], async(req, res) => {
  const users = await User.find()

  res.send(users)

})

//getting the information about current authenticated user
//get("/me") used by mosh. I used /profile in this project
router.get("/", auth, async(req, res) => {
    const user = await User.findById(req.user._id).select("-password -__v")

     if(user) return res.send(user)     
  
     return res.status(404).send("User not found")
    
});

//getting the information about current authenticated user
router.put("/", auth, async(req, res) => {
  //QUERY FIRST method:
    const user = await User.findById(req.user._id)

    if(user) {
        user.name = req.body.name || user.name,
        user.email = req.body.email || user.email
        if(req.body.password)
            user.password = req.body.password  //MODIFIED PASSWORD NOT WORKING. (because,hashed value change every time, so doesn't work. How to solve it?)
        
        const updatedUser = await user.save()
        return res.send(_.pick(updatedUser, ["_id", "name", "email", "isAdmin"]));
    }
     return res.status(404).send("User not found")

     //Failed UPDATE FIRST method:
      /*  const user = await User.findByIdAndUpdate(
        req.user._id,
        {
            name: req.body.name || name,
            email: req.body.email || email,
            password: req.body.password || password,
        },
        { new: True }
    )

    if (!user)
      return res.status(404).send("The user with the given ID was not found...");
  
    await user.save();
    res.send(user); */

});


module.exports = router