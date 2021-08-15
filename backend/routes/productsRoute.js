//const products = require("../data/products")
const auth = require("../middleware/auth")
const admin = require("../middleware/admin")
const validateObjectId = require("../middleware/validateObjectId");
const { Product, validate } = require("../models/productModel")
const express = require("express");
const router = express.Router();

//get all products
router.get("/", async (req, res) => {
   const pageSize = 4 // should we also get pageSize From query String?????????
   const pageNumber = Number(req.query.pageNumber) || 1 //If don't have any pageNumber, obviuosly will get page no. 1

   //work with query string
   const keyword = req.query.keyword ? {
      /* Want to match the keyword with name of the product */
      name: {
         $regex: req.query.keyword,
         $options: 'i'
      }
   } : {}    //if any keyword doesn't exist, then empty object

   const count = await Product.countDocuments({ ...keyword })//???spread operator 
   const pages = Math.ceil(count / pageSize)

   //why we have to count or find documents by ...keyword in both places??

   const products = await Product
      /*   .find({ ...keyword }) not returning any product,
       BUT if I omit keyword here, can't search product by keyword. Why is this happening?? */
      .find({ ...keyword }) //???spread the keyword if it's empty or match the name
      .limit(pageSize)
      .skip((pageNumber - 1) * pageSize) //??
      .select("-__v")
   console.log(products)
   res.send({ products, pageNumber, pages }); //??why returning pageNumber, coz we got it from queryString.
})

//GET top rated products
router.get("/top", async (req, res) => {
   const products = await Product.find().sort('-rating').limit(3)

   res.send(products)
})


//Get a specific product
router.get("/:id", validateObjectId, async (req, res) => {
   // const product = products.find(p => p._id === req.params.id)
   const product = await Product.findById(req.params.id).select("-__v")

   if (!product)
      return res.status(404).send("The product with the given ID was not found.");

   res.send(product);
})

router.post("/", [auth, admin], async (req, res) => {
   /* const { error } = validate(req.body)
   if(error) return res.status(400).send(error.details[0].message)
 */
   const product = new Product({
      name: 'sample name',
      price: 0,
      user: req.user._id,
      image: '/images/sample.jpg',
      brand: 'Sample brand',
      category: 'Sample category',
      countInStock: 0,
      numReviews: 0,
      description: 'Sample Description'
   })

   await product.save()

   res.send(product)
})


router.put("/:id", [auth, admin, validateObjectId], async (req, res) => {
   /*  const { error } = validate(req.body)
    if(error) return res.status(400).send(error.details[0].message)
  */

   const { name, price, user, image, brand, category,
      countInStock, numReviews, description } = req.body

   const product = await Product.findById(req.params.id)
   if (!product) return res.status(404).send("The product with the given ID was not found.")

   product.name = name,
      product.price = price,
      product.user = user,
      product.image = image,
      product.brand = brand,
      product.category = category,
      product.countInStock = countInStock, //I wrote: countInstock, So got: UnhandledPromiseRejectionWarning: ValidationError: Product validation failed: countInStock: Path `countInStock` is required.
      product.numReviews = numReviews,
      product.description = description

   await product.save()

   /*  //NOT WORKING PROPERLY. 
    const product = await Product.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        price: req.body.price,
        user: req.body.user, 
        image: req.body.image,
        brand: req.body.brand,
        category: req.body.category,
        countInStock: req.body.countInStock,
        numReviews: req.body.numReviews,
        description: req.body.description
     }, { new: true})  */

   res.send(product)
})

router.delete("/:id", [auth, admin, validateObjectId], async (req, res) => {

   const product = await Product.findByIdAndRemove(req.params.id);

   if (!product) return res.status.send("Product with the given ID was not found.")

   res.send(product)

})


//Post review

router.post("/:id/reviews", [auth, validateObjectId], async (req, res) => {
   const { rating, comment } = req.body

   const product = await Product.findById(req.params.id)
   if (!product) return res.status(404).send("The product with the given ID was not found.")

   const alreadyReviewed = product.reviews.find(r => r.user.toString() ===
      req.user._id.toString()) //why toString()?

   if (alreadyReviewed) return res.status(400).send("Product already reviewed")

   const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id
   }

   product.reviews.push(review)

   const totalReviews = product.reviews.length
   product.numReviews = totalReviews

   product.rating = product.reviews.reduce((acc, item) => acc + item.rating, 0) / totalReviews

   await product.save()

   res.send('Review added')
})


module.exports = router