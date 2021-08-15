const _ = require("lodash");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const validateObjectId = require("../middleware/validateObjectId");
const { User, validate } = require("../models/userModel");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

//routes order will be: more specific ->(to) more generic(zahid 23.02.2021)


//get all users by admin
router.get("/users", [auth, admin], async (req, res) => {
  const users = await User.find()
  console.log(users)
  res.send(users)

})

//get a user by id (by admin)
router.get("/users/:id", [auth, admin], async (req, res) => {
  const user = await User.findById(req.params.id).select("-password -__v")

  if (!user) return res.status(404).send("User with the given ID was not found");
  res.send(user)

})

// UPDATE ANY USER BY ADMIN
router.put("/users/:id", auth, async (req, res) => {
  //QUERY FIRST method:
  const user = await User.findById(req.params.id) //we dont't get the logged in user, we get the user id from URL.

  if (user) {
    user.name = req.body.name || user.name,
      user.email = req.body.email || user.email
    user.isAdmin = req.body.isAdmin      // || user.isAdmin

    const updatedUser = await user.save()
    return res.send(_.pick(updatedUser, ["_id", "name", "email", "isAdmin"]));
  }
  return res.status(404).send("User not found")

});

//Delete user by admin
router.delete('/users/:id', [auth, admin, validateObjectId], async (req, res) => {
  const user = await User.findByIdAndRemove(req.params.id);

  if (!user) return res.status(404).send("User with the given ID was not found.");

  res.send(user);
});

//getting the information about current authenticated user
//get("/me") used by mosh. I used /profile in this project
router.get("/", auth, async (req, res) => {
  const user = await User.findById(req.user._id).select("-password -__v")

  if (user) return res.send(user)

  return res.status(404).send("User not found")

});

//getting the information about current authenticated user and UPDATE USER PROFILE
router.put("/", auth, async (req, res) => {
  //QUERY FIRST method:
  const user = await User.findById(req.user._id)

  if (user) {
    user.name = req.body.name || user.name,
      user.email = req.body.email || user.email
    if (req.body.password)
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