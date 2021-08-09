import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import queryString from "query-string"
import { Row, Col, Image, ListGroup, Button, Form, Cart } from "react-bootstrap"
import Message from '../components/Message'
import { addToCart, removeFromCart } from '../actions/cartActions';

const CartScreen = ({ match, location, history }) => {
  const productId = match.params.id //
  console.log(productId)


  const { qty } = queryString.parse(location.search)
  console.log(qty)

  const dispatch = useDispatch()

  //To grab the piece of state and show it on the screen useSelector is used
  const cart = useSelector(state => state.cart)
  const { cartItems } = cart
  console.log(cartItems)

  useEffect(() => {
      if(productId)
        dispatch(addToCart(productId, qty))

        // eslint-disable-next-line
  }, [dispatch, productId, qty])


  const removeFromCartHandler = (id) => {
      dispatch(removeFromCart(id))
  }

  const checkoutHandler = () => {
    //   console.log("checkout")
    //if the user is not logged in then should be login otherwise redirected to shipping.
    //redirect: Mosh(app.js)
    history.push("/shipping")
   // history.push("/login? redirect=shipping") THIS REDIRECT LINE DOES NOT WORK ???
   
  }

  return (
    <Row>
        <Col md={8}>
            <h1>Shopping Cart</h1>
            { cartItems.length === 0 ? <Message>Your cart is empty <Link to= "/">Go back</Link></Message> : 
                <ListGroup variant="flush">
                   {cartItems.map(item => (
                    <ListGroup.Item key={item._id}>
                        <Row>
                            <Col md={2}>
                                <Image src={item.image} alt={item.name} fluid rounded />
                            </Col>
                            <Col md={3}>
                                <Link to={`/product/${item._id}`}> {item.name} </Link>
                            </Col>
                            <Col md={2}>${item.price}</Col>
                            <Col md={2}>
                            <Form.Control 
                                as="select" 
                                value={item.qty}
                                onChange={(e) => //BUG TO FIX: this doesn't work properly TO CHANGE QTY.
                                    dispatch(
                                        addToCart(item._id, Number(e.target.value)))}
                                >
                                    {[...Array(item.countInStock).keys()].map(x => (
                                        <option key={x + 1} value={x + 1}>
                                            {x + 1}
                                        </option>
                                    ))}
            
                                </Form.Control>
                            </Col>
                            <Col md={2}>
                                <Button type="button" onClick={() => removeFromCartHandler(item._id)}><i className="fas fa-trash"></i></Button>
                            </Col>
                        </Row>

                    </ListGroup.Item>
                   ))}

                </ListGroup>
            }
        </Col>
        <Col md={4}>
            <ListGroup variant="flush">
                <ListGroup.Item>
                    <h3>Subtotal  ({cartItems.reduce((acc, item) => acc + Number(item.qty), 0)})  items</h3>
                    ${cartItems.reduce((acc, item) => acc + Number(item.qty * item.price), 0).toFixed(2)}
                </ListGroup.Item>
                <ListGroup.Item>
                    <Button type="button" className="btn-block" disabled={cartItems.length === 0}
                    onClick={checkoutHandler} >Procced to checkout</Button>
                </ListGroup.Item>

            </ListGroup>
        </Col>  
    </Row>
  )
}

export default CartScreen
