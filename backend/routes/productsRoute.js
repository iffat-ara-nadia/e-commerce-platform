//const products = require("../data/products")
const validateObjectId = require("../middleware/validateObjectId");
const Product  = require("../models/productModel")
const express = require("express");
const router = express.Router();


router.get("/", async(req, res) => {
    const products = await Product.find().select("-__v")
    res.send(products);
})


router.get("/:id", validateObjectId,  async(req, res) => {
   // const product = products.find(p => p._id === req.params.id)
   const product = await Product.findById(req.params.id).select("-__v")

   if(!product) 
      return res.status(404).send("The product with the given ID was not found.");

   res.send(product);
})




module.exports = router