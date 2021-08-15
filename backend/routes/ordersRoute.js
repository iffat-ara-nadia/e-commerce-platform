const _ = require("lodash")
const { Order } = require("../models/orderModel")
const { User } = require("../models/userModel")
const auth = require("../middleware/auth")
const admin = require("../middleware/admin")
const mongoose = require("mongoose")
const express = require("express");
const validateObjectId = require("../middleware/validateObjectId");
const router = express.Router();

/* ROUTER ORDER MATTERS. I wrote /myorders after /:id for GET request. Thats why, INVALID ID
was being shown. After I changing the order, I got the right output(myorders) */

//GET ORDER:
//GET Logged in user orders:
router.get("/myorders", auth, async (req, res) => {
  const orders = await Order.find({ user: req.user._id })

  res.send(orders)
})

//Get all orders by admin
router.get("/", [auth, admin], async (req, res) => {
  const orders = await Order.find().populate('user', '_id name')

  res.send(orders)
})

router.get("/:id", [auth, validateObjectId], async (req, res) => {
  const order = await Order.findById(req.params.id).populate('user', 'name email')

  if (!order) return res.status(404).send("The order with the given ID was not found.")

  res.send(order)
})


//POST ORDER by user:
router.post("/", auth, async (req, res) => {
  /* 
  const{ error } = validate(req.body);
  if(error) return res.status(400).send(error.details[0].message); */

  const { orderItems, shippingAddress, paymentMethod,
    itemsPrice, shippingPrice, taxPrice, totalPrice } = req.body

  const user = await User.findById(req.user._id)
  const userId = user._id

  if (orderItems && orderItems.length === 0)
    return res.status(400).send("No order items.")

  /* const order = new Order( _.pick(req.body, ["orderItems", userId, "shippingAddress",
  "paymentMethod", "itemsPrice", "shippingPrice", "taxPrice", "totalPrice"]))
  */

  const order = new Order({
    orderItems,
    user: userId, // How to embed multiple info about the user??
    shippingAddress,
    paymentMethod,
    itemsPrice,
    shippingPrice,
    taxPrice,
    totalPrice
  })

  await order.save()

  res.send(order)

})

//UPDATED ORDER by admin
router.put("/:id/deliver", [auth, validateObjectId], async (req, res) => {
  const order = await Order.findById(req.params.id)

  if (!order) return res.status(404).send("The order with the given ID was not found.")

  order.isDelivered = true,
    order.deliveredAt = Date.now(),


    await order.save()
  res.send(order)
})

//UPDATED ORDER by user
router.put("/:id/pay", [auth, validateObjectId], async (req, res) => {
  const order = await Order.findById(req.params.id)

  if (!order) return res.status(404).send("The order with the given ID was not found.")

  order.isPaid = true,
    order.paidAt = Date.now(),
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address
    }

  await order.save()
  res.send(order)
})


/* function validate(req) {
    const schema = Joi.object({
        shippingAddress: Joi.string().min(5).max(255).required(),
        password: Joi.string().min(5).max(255).required()
    })
    return schema.validate(req)
} */

module.exports = router

/* Got: Proxy error: Could not proxy request /api/orders from localhost:3000 to http://127.0.0.1:5000 (ECONNRESET). */